/*
  # Blog System Schema

  1. Tables
    - authors: Stores blog authors
    - blogs: Main blog posts table
    - tags: Blog post tags
    - blog_tags: Junction table for blog-tag relationships

  2. Security
    - RLS enabled on all tables
    - Public read access for published blogs
    - Authenticated users can manage all content
*/

-- Create authors table
CREATE TABLE IF NOT EXISTS authors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  bio text,
  avatar_url text
);

-- Create blogs table
CREATE TABLE IF NOT EXISTS blogs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  title text NOT NULL,
  content text NOT NULL,
  excerpt text NOT NULL,
  slug text UNIQUE NOT NULL,
  published_at timestamptz,
  featured_image text,
  author_id uuid REFERENCES authors(id) NOT NULL
);

-- Create tags table
CREATE TABLE IF NOT EXISTS tags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text UNIQUE NOT NULL,
  slug text UNIQUE NOT NULL
);

-- Create blog_tags junction table
CREATE TABLE IF NOT EXISTS blog_tags (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  blog_id uuid REFERENCES blogs(id) ON DELETE CASCADE NOT NULL,
  tag_id uuid REFERENCES tags(id) ON DELETE CASCADE NOT NULL,
  UNIQUE(blog_id, tag_id)
);

-- Enable Row Level Security
ALTER TABLE authors ENABLE ROW LEVEL SECURITY;
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_tags ENABLE ROW LEVEL SECURITY;

-- Create default author for testing
INSERT INTO authors (id, name, bio, avatar_url)
VALUES (
  '00000000-0000-4000-a000-000000000000',
  'Dr. Bhandari',
  'Dentist and founder of Bhandari Smile Design',
  NULL
) ON CONFLICT DO NOTHING;

-- Create RLS Policies

-- Authors policies
CREATE POLICY "Anyone can read authors"
  ON authors FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert authors"
  ON authors FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update authors"
  ON authors FOR UPDATE
  TO authenticated
  USING (true);

-- Blogs policies
CREATE POLICY "Anyone can read published blogs"
  ON blogs FOR SELECT
  USING (published_at IS NOT NULL);

CREATE POLICY "Authenticated users can read all blogs"
  ON blogs FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert blogs"
  ON blogs FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update blogs"
  ON blogs FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can delete blogs"
  ON blogs FOR DELETE
  TO authenticated
  USING (true);

-- Tags policies
CREATE POLICY "Anyone can read tags"
  ON tags FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert tags"
  ON tags FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update tags"
  ON tags FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can delete tags"
  ON tags FOR DELETE
  TO authenticated
  USING (true);

-- Blog tags policies
CREATE POLICY "Anyone can read blog_tags"
  ON blog_tags FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can insert blog_tags"
  ON blog_tags FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete blog_tags"
  ON blog_tags FOR DELETE
  TO authenticated
  USING (true);

-- Create storage bucket for blog media
CREATE POLICY "Public read access for blog media"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'blog-media');

CREATE POLICY "Authenticated users can upload blog media"
  ON storage.objects FOR INSERT
  TO authenticated
  WITH CHECK (bucket_id = 'blog-media');

CREATE POLICY "Authenticated users can update blog media"
  ON storage.objects FOR UPDATE
  TO authenticated
  USING (bucket_id = 'blog-media');

CREATE POLICY "Authenticated users can delete blog media"
  ON storage.objects FOR DELETE
  TO authenticated
  USING (bucket_id = 'blog-media');