#!/usr/bin/env node
import 'dotenv/config'              // loads .env into process.env
import Parser from 'rss-parser'
import fetch from 'node-fetch'
import cheerio from 'cheerio'
import slugify from 'slugify'
import { createClient } from '@supabase/supabase-js'

// pull your creds from env (no "!" here)
const SUPABASE_URL      = process.env.SUPABASE_URL
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.error('⚠️  Missing SUPABASE_URL or SUPABASE_ANON_KEY in environment')
  process.exit(1)
}

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY)

async function scrapeFullPost(url) {
  const res = await fetch(url)
  const html = await res.text()
  const $ = cheerio.load(html)
  // adjust this selector to match your Wix post content container
  return $('.blog-post-content').html() || ''
}

async function run() {
  const parser = new Parser()
  const feed   = await parser.parseURL('https://www.bhandaridentalclinic.com/blog-feed.xml')

  for (let item of feed.items) {
    const title         = item.title.trim()
    const slug          = slugify(title, { lower: true })
    const date          = item.isoDate || new Date().toISOString()
    const fullContent   = await scrapeFullPost(item.link)
    const categories    = (item.categories || ['misc']).map(c => c.trim())
    const category_slug = slugify(categories[0], { lower: true })

    const { error } = await supabase
      .from('blog_posts')
      .insert([{
        title,
        slug,
        created_at: date,
        // wrap your HTML in one block so your front‐end can render it:
        content: JSON.stringify({ blocks: [{ type: 'html', data: { html: fullContent } }] }),
        category_slug,
        cover_image: item.enclosure?.url || ''
      }])

    if (error) console.error('❌ ', slug, error.message)
    else        console.log('✅', slug)
  }
}

run().catch(console.error)
