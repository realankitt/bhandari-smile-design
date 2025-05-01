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

  // grab any <a> whose href contains "/post/"
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

  // — Title & slug —
  const title = $('h1').first().text().trim()
  const slug  = url.split('/').pop()

  // — Metadata list (<ul><li>) right after the <h1> —
  const metaList = $('h1').next('ul')
  const items    = metaList.find('li').toArray().map(li => $(li).text().trim())
  // items ≈ [ '', 'Dr. Sameer Bhandari', 'Sep 24, 2023', '7 min read' ]
  const authorRaw    = items[1] || null
  const publishedRaw = items[2] || null
  const author    = authorRaw
  const published = publishedRaw
    ? new Date(publishedRaw).toISOString()
    : null

  // — Excerpt: first <p> after the metadata list —
  const excerpt = metaList.nextAll('p').first().text().trim()

  // — Content: everything from that first <p> onward,
  //    up until the “Related Posts” section —
  const contentParts = []
  metaList.nextAll().each((i, el) => {
    const txt = $(el).text().trim()
    // stop once we hit “Related Posts”
    if (/^Related Posts/.test(txt)) return false
    contentParts.push($.html(el))
  })
  const content = contentParts.join('\n').trim()

  return { title, slug, excerpt, content, author, published }
}

async function migrate() {
  console.log('🔍 Fetching post links…')
  const postUrls = await fetchPostLinks()
  console.log(`Found ${postUrls.length} posts`)

  for (const url of postUrls) {
    try {
      console.log(`➡️  Scraping ${url}`)
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
  console.error('Fatal error:', err.message)
  process.exit(1)
})
