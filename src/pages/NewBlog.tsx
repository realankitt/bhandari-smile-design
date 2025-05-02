import { Helmet } from 'react-helmet'
import { BlogHeader } from '@/components/blog/BlogHeader'
import { BlogEditor } from '@/components/blog/BlogEditor'
import { Footer } from '@/components/layout/Footer'

export default function NewBlog() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Helmet>
        <title>New Blog Post | Bhandari Dental Clinic</title>
      </Helmet>
      
      <BlogHeader />
      
      <main className="flex-grow pt-28 pb-16">
        <div className="container mx-auto px-4">
          <h1 className="heading-lg text-center mb-8">Create New Blog Post</h1>
          <BlogEditor />
        </div>
      </main>
      
      <Footer />
    </div>
  )
}