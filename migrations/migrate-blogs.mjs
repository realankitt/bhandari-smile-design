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

  // pick the *last* H1 on the page (the post’s title), not the header’s  
  const title = $('h1').last().text().trim()  // :contentReference[oaicite:0]{index=0}
  const slug  = url.split('/').pop()

  // metadata list under the title
  const metaItems = $('h1')
    .last()
    .next('ul')
    .find('li')
    .toArray()
    .map(li => $(li).text().trim())

  const authorRaw    = metaItems[1] || null
  const publishedRaw = metaItems[2] || null

  const author       = authorRaw
  let published_at   = publishedRaw ? new Date(publishedRaw).toISOString() : null
  if (!published_at) published_at = new Date().toISOString()

  // excerpt: first <p> after that metadata list
  const excerpt = $('h1').last().nextAll('p').first().text().trim()

  // content: everything from after the title until “Related Posts”
  const contentParts = []
  $('h1')
    .last()
    .nextAll()
    .each((_, el) => {
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
