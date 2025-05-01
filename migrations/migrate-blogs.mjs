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

  // Find the metadata <ul><li> right after the <h1>
  const metaItems = $('h1')
    .next('ul')
    .find('li')
    .toArray()
    .map(li => $(li).text().trim())

  // metaItems ≈ [ '', 'Dr. Sameer Bhandari', 'Sep 24, 2023', '7 min read' ]
  const authorRaw    = metaItems[1] || null
  const publishedRaw = metaItems[2] || null

  const author = authorRaw
  const published_at = publishedRaw
    ? new Date(publishedRaw).toISOString()
    : null

  // Excerpt: first <p> after that metadata list
  const excerpt = $('h1').nextAll('p').first().text().trim()

  // Content: everything from that first <p> until “Related Posts”
  const contentParts = []
  $('h1')
    .nextAll()
    .each((i, el) => {
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
  console.log(`Found ${postUrls.length} posts`)

  for (const url of postUrls) {
    try {
      console.log(`➡️  Scraping ${url}`)
      const record = await scrapePost(url)

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

migrate().catch(err => {
  console.error('Fatal error:', err.message)
  process.exit(1)
})
