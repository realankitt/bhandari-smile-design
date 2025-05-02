#!/usr/bin/env python3
import csv
import datetime
import requests
import os
from bs4 import BeautifulSoup, Tag
from urllib.parse import urljoin, urlparse
from dateutil import parser    # only parser comes from dateutil
from supabase import create_client, Client
from dotenv import load_dotenv
import urllib3
urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

# Load environment variables
load_dotenv()

# Initialize Supabase client
SUPABASE_URL = os.getenv("VITE_SUPABASE_URL")
SUPABASE_KEY = os.getenv("VITE_SUPABASE_ANON_KEY")

if not SUPABASE_URL or not SUPABASE_KEY:
    raise ValueError("Missing Supabase credentials in environment variables")

supabase: Client = create_client(SUPABASE_URL, SUPABASE_KEY)

BASE_URL = "https://www.bhandaridentalclinic.com"
INDEX_URL = urljoin(BASE_URL, "/blog")

def fetch_post_links():
    """Return sorted list of all /post/... URLs (absolute)."""
    resp = requests.get(INDEX_URL)
    resp.raise_for_status()
    soup = BeautifulSoup(resp.text, "html.parser")
    links = set()
    for a in soup.find_all("a", href=True):
        href = a["href"].split("?", 1)[0]
        if "/post/" in href:
            url = href if href.startswith("http") else urljoin(BASE_URL, href)
            links.add(url)
    return sorted(links)

def best_image_src(img):
    """Pick the highest-res URL from srcset/data-src/src."""
    if img.has_attr("srcset"):
        # take last (largest) candidate
        candidates = [p.strip().split()[0] for p in img["srcset"].split(",")]
        return urljoin(BASE_URL, candidates[-1])
    if img.has_attr("data-src"):
        return urljoin(BASE_URL, img["data-src"])
    return urljoin(BASE_URL, img.get("src", ""))

def scrape_post(url):
    resp = requests.get(url)
    resp.raise_for_status()
    soup = BeautifulSoup(resp.text, "html.parser")

    # Find the blog content container
    article = soup.find("article") or soup.find("div", class_="blog-post")
    if not article:
        raise ValueError(f"Could not find article content in {url}")

    # Get title
    title = article.find("h1").get_text(strip=True)
    slug = urlparse(url).path.rstrip("/").split("/")[-1]

    # Get metadata
    meta_div = article.find("div", class_="post-meta") or article.find("div", class_="metadata")
    author = "Dr. Tanmay Bhandari"  # Default author
    if meta_div:
        author_elem = meta_div.find("span", class_="author") or meta_div.find("div", class_="author")
        if author_elem:
            author = author_elem.get_text(strip=True)
    
    # Get publish date
    published_at = datetime.datetime.utcnow().isoformat()
    if meta_div:
        date_elem = meta_div.find("time") or meta_div.find("span", class_="date")
        if date_elem:
            try:
                date_text = date_elem.get_text(strip=True)
                published_at = parser.parse(date_text).isoformat()
            except Exception:
                pass

    # Get hero image
    hero_img = article.find("img")
    image = ""
    if hero_img:
        image = best_image_src(hero_img)
        if not image.startswith('http'):
            image = urljoin(BASE_URL, image)

    # Get excerpt
    excerpt = ""
    first_p = article.find("p")
    if first_p:
        excerpt = first_p.get_text(strip=True)

    # Get full content
    # Remove unwanted elements
    for unwanted in article.find_all(["script", "style", "nav", "footer"]):
        unwanted.decompose()

    # Process content
    content_elements = []
    for element in article.find_all(['p', 'h2', 'h3', 'h4', 'ul', 'ol', 'img']):
        if element.name == 'img':
            img_src = best_image_src(element)
            if not img_src.startswith('http'):
                img_src = urljoin(BASE_URL, img_src)
            element['src'] = img_src
            # Remove problematic attributes
            for attr in ['srcset', 'data-src', 'data-lazy-src']:
                if attr in element.attrs:
                    del element.attrs[attr]
        content_elements.append(str(element))

    content = '\n'.join(content_elements).strip()

    # Determine category based on content
    category = "Dental Care"
    if any(keyword in content.lower() for keyword in ["invisalign", "aligner"]):
        category = "Invisalign"
    elif any(keyword in content.lower() for keyword in ["implant"]):
        category = "Dental Implants"
    elif any(keyword in content.lower() for keyword in ["smile makeover", "cosmetic"]):
        category = "Smile Design"

    return {
        "title": title,
        "slug": slug,
        "excerpt": excerpt,
        "content": content,
        "image": image,
        "category": category,
        "author": author,
        "published_at": published_at
    }

async def upload_image_to_storage(image_url: str, slug: str) -> str:
    """Download image and upload to Supabase storage"""
    try:
        # Download image
        response = requests.get(image_url, verify=False)
        response.raise_for_status()
        
        # Get file extension from content type or URL
        content_type = response.headers.get('content-type', '')
        ext = {
            'image/jpeg': '.jpg',
            'image/png': '.png',
            'image/gif': '.gif',
            'image/webp': '.webp'
        }.get(content_type, '')
        
        if not ext:
            ext = os.path.splitext(urlparse(image_url).path)[1] or '.jpg'
            
        # Generate unique filename
        filename = f"blog/{slug}/{datetime.datetime.now().timestamp()}{ext}"
        
        # Upload to Supabase storage
        result = supabase.storage.from_('blog-images').upload(
            path=filename,
            file=response.content,
            file_options={"content-type": content_type or "image/jpeg"}
        )
        
        # Get public URL
        public_url = supabase.storage.from_('blog-images').get_public_url(filename)
        print(f"✓ Uploaded image: {filename}")
        return public_url
        
    except Exception as e:
        print(f"✗ Failed to upload image for {slug}: {str(e)}")
        return image_url

async def migrate_post(post_data: dict) -> None:
    try:
        # Upload hero image if exists and is a valid URL
        if post_data.get('image') and post_data['image'].startswith('http'):
            post_data['image'] = await upload_image_to_storage(
                post_data['image'], 
                post_data['slug']
            )
            
        # Process inline images in content
        soup = BeautifulSoup(post_data['content'], 'html.parser')
        for img in soup.find_all('img'):
            if img.get('src') and img['src'].startswith('http'):
                new_src = await upload_image_to_storage(
                    img['src'],
                    f"{post_data['slug']}"  # Simplified path
                )
                img['src'] = new_src
        post_data['content'] = str(soup)

        # Insert into Supabase
        result = supabase.table('blogs').upsert(
            post_data,
            on_conflict='slug'
        ).execute()
        
        print(f"✓ Migrated {post_data['slug']}")
        
    except Exception as e:
        print(f"✗ Failed to migrate {post_data['slug']}: {str(e)}")

async def main():
    links = fetch_post_links()
    print(f"Found {len(links)} posts to migrate")
    
    for link in links:
        try:
            post_data = scrape_post(link)
            await migrate_post(post_data)
        except Exception as e:
            print(f"✗ Failed to process {link}: {str(e)}")
    
    print("Migration complete!")

if __name__ == "__main__":
    import asyncio
    asyncio.run(main())
