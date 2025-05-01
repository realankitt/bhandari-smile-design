import axios from 'axios'
import { load } from 'cheerio'
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config()

const SUPABASE_URL = process.env.VITE_SUPABASE_URL
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error('❌ Missing Supabase credentials in env')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
const BASE_URL = 'https://www.bhandaridentalclinic.com'

async function fetchPostLinks() {
  const res = await axios.get(`${BASE_URL}/blog`)
  const $ = load(res.data)
  const links = new Set()

  $('a[href^="/blog/post/"]').each((_, el) => {
    const href = $(el).attr('href').split('?')[0]
    links.add(`${BASE_URL}${href}`)
  })

  return [...links]
}

async function scrapePost(url) {
  const res = await axios.get(url)
  const $ = load(res.data)

  const title     = $('h1.post-title').text().trim()
  const slug      = url.split('/').pop()
  const excerpt   = $('article p').first().text().trim()
  const content   = $('article').html().trim()
  const heroImage = $('article img').first().attr('src') || null
  const category  = $('a.category-link').first().text().trim() || null
  const author    = $('span.author-name').first().text().trim() || null
  const dateStr   = $('time').first().attr('datetime') || null
  const published = dateStr ? new Date(dateStr).toISOString() : null

  return { title, slug, excerpt, content, heroImage, category, author, published }
}

async function migrate() {
  console.log('🔍 Fetching post links…')
  const postUrls = await fetchPostLinks()
  console.log(`Found ${postUrls.length} posts`)

  for (const url of postUrls) {
    try {
      console.log(`➡️ Scraping ${url}`)
      const post = await scrapePost(url)

      const { error } = await supabase
        .from('blogs')
        .upsert(post, { onConflict: 'slug' })

      if (error) throw error
      console.log(`✅ Upserted ${post.slug}`)
    } catch (err) {
      console.error(`❌ Error processing ${url}:`, err.message)
    }
  }

  console.log('🎉 Migration complete!')
}

migrate().catch(err => {
  console.error('Fatal error:', err)
  process.exit(1)
})
