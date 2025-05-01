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

async function fetchPostsMeta() {
  const res = await axios.get(`${BASE_URL}/blog`)
  const $   = load(res.data)
  const posts = []

  // Each post card on the index page has a link, writer image, author name,
  // and a line like "Sep 24, 2023 7 min read" :contentReference[oaicite:1]{index=1}
  $('.post-card, .widget-item, .post-list-item').each((_, el) => {
    const linkEl = $(el).find('a[href*="/post/"]').first()
    if (!linkEl.length) return

    const href = linkEl.attr('href').split('?')[0]
    const url  = href.startsWith('http') ? href : `${BASE_URL}${href}`
    const title= linkEl.text().trim()
    const slug = url.split('/').pop()

    // Author comes from the alt of the first image that starts with "Writer:"
    let author = null
    const writerImg = $(el).find('img[alt^="Writer:"]').first()
    if (writerImg.length) {
      author = writerImg.attr('alt').replace(/^Writer:\s*/, '').trim()
    }

    // The same block contains a text node like "Sep 24, 2023 7 min read"
    // We grab that, split on whitespace and take the first three tokens
    let published = null
    const metaText = $(el)
      .find('img[alt^="Writer:"]')
      .parent()            // assuming the parent also holds the date text
      .text()              // this will include "Dr. Sameer BhandariSep 24, 2023 7 min read"
      .replace(/\s+/g, ' ') // normalize whitespace
    const dateMatch = metaText.match(/([A-Za-z]+\s+\d{1,2},\s*\d{4})/)
    if (dateMatch) {
      published = new Date(dateMatch[1]).toISOString()
    }

    posts.push({ url, title, slug, author, published })
  })

  return posts
}

async function migrate() {
  console.log('🔍 Fetching blog metadata from index…')
  const metas = await fetchPostsMeta()
  console.log(`Found ${metas.length} posts on index`)

  // Fetch existing slugs so we can avoid duplicates
  const { data: existing, error: e1 } = await supabase
    .from('blogs')
    .select('slug')
  if (e1) throw e1
  const existingSlugs = new Set(existing.map(r => r.slug))

  for (const meta of metas) {
    try {
      console.log(`➡️  Processing ${meta.slug}`)

      // Fetch full post content
      const postRes = await axios.get(meta.url)
      const $2 = load(postRes.data)
      const content = $2('article').html()?.trim() || ''

      const record = {
        title:     meta.title,
        slug:      meta.slug,
        excerpt:   $2('article p').first().text().trim(),
        content,
        author:    meta.author,
        published: meta.published,
      }

      let upsertError
      if (existingSlugs.has(meta.slug)) {
        const { error } = await supabase
          .from('blogs')
          .update(record)
          .eq('slug', meta.slug)
        upsertError = error
        console.log(`🔄 Updated ${meta.slug}`)
      } else {
        const { error } = await supabase
          .from('blogs')
          .insert(record)
        upsertError = error
        console.log(`✅ Inserted ${meta.slug}`)
      }

      if (upsertError) {
        console.error(`❌ Supabase error for ${meta.slug}:`, upsertError.message)
      }
    } catch (err) {
      console.error(`❌ Failed ${meta.slug}:`, err.message)
    }
  }

  console.log('🎉 Migration complete!')
}

migrate().catch(err => {
  console.error('Fatal error:', err.message)
  process.exit(1)
})
