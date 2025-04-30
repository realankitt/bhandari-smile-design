import { supabase } from '../lib/supabase'

const oldBlogs = [
  {
    title: "The Benefits of Invisalign Over Traditional Braces",
    slug: "benefits-invisalign-over-traditional-braces",
    excerpt: "Exploring why Invisalign clear aligners are becoming the preferred choice for teeth straightening compared to metal braces.",
    content: `
      <h2>Why Choose Invisalign?</h2>
      <p>Content from your existing blog...</p>
    `,
    image: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99",
    category: "Invisalign",
    author: "Dr. Tanmay Bhandari",
    published_at: new Date("2024-04-10").toISOString()
  }
  // Add more blogs here in the same format
];

async function migrateBlogPosts() {
  for (const blog of oldBlogs) {
    const { data, error } = await supabase
      .from('blogs')
      .insert(blog)
      .single()

    if (error) {
      console.error(`Failed to migrate "${blog.title}":`, error)
    } else {
      console.log(`Successfully migrated "${blog.title}"`)
    }
  }
}

migrateBlogPosts()