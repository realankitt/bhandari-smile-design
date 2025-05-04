/*
  # Add foreign key relationship between blogs and categories

  1. Changes
    - Add foreign key constraint from blogs.category_id to categories.id
    - Add index on blogs.category_id for better query performance

  2. Security
    - No changes to RLS policies
*/

-- Add foreign key constraint
ALTER TABLE blogs
ADD CONSTRAINT fk_blogs_category
FOREIGN KEY (category_id) REFERENCES categories(id)
ON DELETE SET NULL;

-- Add index for better performance
CREATE INDEX idx_blogs_category_id ON blogs(category_id);