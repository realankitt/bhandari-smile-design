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

  // — 1) Title & slug —
  const title = $('h1').last().text().trim()
  const slug  = url.split('/').pop()

  // — 2) Metadata list under the title —
  const metaList     = $('h1').last().next('ul')
  const metaItems    = metaList.find('li').toArray().map(li => $(li).text().trim())
  // [ '', 'Dr. Sameer Bhandari', 'Sep 24, 2023', '7 min read' ]
  const authorRaw    = metaItems[1] || null
  const publishedRaw = metaItems[2] || null

  const author       = authorRaw
  const published_at = publishedRaw
    ? new Date(publishedRaw).toISOString()
    : new Date().toISOString()  // never null

  // — 3) Content slice: everything after the <ul> until the “Related Posts” <h2> :contentReference[oaicite:0]{index=0}
  const contentElems = metaList.nextUntil('h2:contains("Related Posts")')
  const content = contentElems
    .map((i, el) => $.html(el))
    .get()
    .join('\n')
    .trim()

  // — 4) Excerpt: the very first <p> inside that slice —
  const excerpt = contentElems
    .filter('p')
    .first()
    .text()
    .trim()

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
