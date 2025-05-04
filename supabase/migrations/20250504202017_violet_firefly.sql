/*
  # Create blog tables schema

  1. New Tables
    - `blogs` - Stores blog posts
      - `id` (uuid, primary key)
      - `created_at` (timestamp with timezone)
      - `updated_at` (timestamp with timezone)
      - `title` (text)
      - `content` (text)
      - `excerpt` (text, nullable)
      - `author_id` (uuid, nullable)
      - `published` (boolean)
      - `slug` (text, unique)
      - `cover_image` (text, nullable)
      - `category_id` (uuid, nullable, references categories.id)

    - `categories` - Stores blog categories
      - `id` (uuid, primary key)
      - `name` (text)
      - `slug` (text, unique)
      - `created_at` (timestamp with timezone)

    - `blog_media` - Stores media related to blogs
      - `id` (uuid, primary key)
      - `blog_id` (uuid, references blogs.id)
      - `media_url` (text)
      - `media_type` (text)
      - `created_at` (timestamp with timezone)
      - `caption` (text, nullable)
      - `alt_text` (text, nullable)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage blogs, categories, and media
*/

-- Create categories table
CREATE TABLE IF NOT EXISTS categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text NOT NULL UNIQUE,
  created_at timestamptz DEFAULT now()
);

-- Create blogs table
CREATE TABLE IF NOT EXISTS blogs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  title text NOT NULL,
  content text NOT NULL,
  excerpt text,
  author_id uuid,
  published boolean DEFAULT false,
  slug text NOT NULL UNIQUE,
  cover_image text,
  category_id uuid REFERENCES categories(id) ON DELETE SET NULL
);

-- Create blog_media table
CREATE TABLE IF NOT EXISTS blog_media (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  blog_id uuid NOT NULL REFERENCES blogs(id) ON DELETE CASCADE,
  media_url text NOT NULL,
  media_type text NOT NULL,
  created_at timestamptz DEFAULT now(),
  caption text,
  alt_text text
);

-- Enable Row Level Security
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_media ENABLE ROW LEVEL SECURITY;

-- Policies for categories
CREATE POLICY "Anyone can read categories"
  ON categories
  FOR SELECT
  USING (true);

CREATE POLICY "Authenticated users can create categories"
  ON categories
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update categories"
  ON categories
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can delete categories"
  ON categories
  FOR DELETE
  TO authenticated
  USING (true);

-- Policies for blogs
CREATE POLICY "Anyone can read published blogs"
  ON blogs
  FOR SELECT
  USING (published = true);

CREATE POLICY "Authenticated users can read all blogs"
  ON blogs
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can create blogs"
  ON blogs
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update blogs"
  ON blogs
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can delete blogs"
  ON blogs
  FOR DELETE
  TO authenticated
  USING (true);

-- Policies for blog_media
CREATE POLICY "Anyone can read blog media"
  ON blog_media
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM blogs
      WHERE blogs.id = blog_media.blog_id
      AND blogs.published = true
    )
  );

CREATE POLICY "Authenticated users can read all blog media"
  ON blog_media
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can create blog media"
  ON blog_media
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update blog media"
  ON blog_media
  FOR UPDATE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can delete blog media"
  ON blog_media
  FOR DELETE
  TO authenticated
  USING (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS blogs_slug_idx ON blogs (slug);
CREATE INDEX IF NOT EXISTS blogs_category_id_idx ON blogs (category_id);
CREATE INDEX IF NOT EXISTS blog_media_blog_id_idx ON blog_media (blog_id);