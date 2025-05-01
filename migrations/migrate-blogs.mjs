// migrations/migrate-blogs.mjs
import axios from 'axios'
import { load } from 'cheerio'
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config()

const SUPABASE_URL      = process.env.VITE_SUPABASE_URL
const SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY
const BASE_URL          = 'https://www.bhandaridentalclinic.com'

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error('❌ Missing Supabase credentials')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

async function fetchPostLinks() {
  const res = await axios.get(`${BASE_URL}/blog`)
  const $   = load(res.data)
  const links = new Set()

  // grabs every <a> whose href contains “/post/…”
  $('a[href*="/post/"]').each((_, el) => {
    const href = $(el).attr('href').split('?')[0]
    const url  = href.startsWith('http') ? href : `${BASE_URL}${href}`
    links.add(url)
  })

  return [...links]
}

async function scrapePost(url) {
  const res = await axios.get(url)
  const $   = load(res.data)

  const title = $('h1').first().text().trim()
  const slug  = url.split('/').pop()

  // all <p> tags after the <h1>
  const paras = $('h1').nextAll().filter((_, el) => el.tagName === 'p')

  // author: from the “Writer: …” alt text
  let author = null
  const writerImg = $('img[alt^="Writer:"]').first()
  if (writerImg.length) {
    author = writerImg.attr('alt').replace(/^Writer:\s*/, '').trim()
  }

  // published_at: look for a paragraph like “Sep 24, 2023”
  let published_at = null
  paras.each((_, el) => {
    const txt = $(el).text().trim()
    if (/^[A-Za-z]{3}\s+\d{1,2},\s*\d{4}$/.test(txt) && !published_at) {
      published_at = new Date(txt).toISOString()
    }
  })
  // fallback so we never insert null into NOT NULL column
  if (!published_at) {
    published_at = new Date().toISOString()
  }

  // excerpt: the paragraph immediately after the date paragraph
  let excerpt = ''
  const dateIndex = paras.toArray().findIndex(el => {
    const txt = $(el).text().trim()
    return /^[A-Za-z]{3}\s+\d{1,2},\s*\d{4}$/.test(txt)
  })
  if (dateIndex >= 0) {
    excerpt = paras.eq(dateIndex + 1).text().trim()
  }
  // as a last-ditch
  if (!excerpt) {
    excerpt = $('p').first().text().trim()
  }

  // content: everything from after <h1> until “Related Posts”
  const contentParts = []
  $('h1').nextAll().each((_, el) => {
    const txt = $(el).text().trim()
    if (/^Related Posts/.test(txt)) return false
    contentParts.push($.html(el))
  })
  const content = contentParts.join('\n').trim()

  return { title, slug, excerpt, content, author, published_at }
}

async function migrate() {
  console.log('🔍 Fetching post links…')
  const postUrls = await fetchPostLinks()
  console.log(`Found ${postUrls.length} posts`)  // :contentReference[oaicite:0]{index=0}

  for (const url of postUrls) {
    try {
      console.log(`➡️  Scraping ${url}`)
      const record = await scrapePost(url)         // :contentReference[oaicite:1]{index=1}

      const { error } = await supabase
        .from('blogs')
        .upsert(record, { onConflict: 'slug' })

      if (error) throw error
      console.log(`✅ Upserted ${record.slug}`)
    } catch (err) {
      console.error(`❌ Error processing ${url}:`, err.message)
    }
  }

  console.log('🎉 Migration complete!')
}

migrate()
