import { supabase } from '../lib/supabase';
import { Database } from '../types/supabase';

export type Blog = Database['public']['Tables']['blogs']['Row'];
export type BlogInsert = Database['public']['Tables']['blogs']['Insert'];
export type BlogUpdate = Database['public']['Tables']['blogs']['Update'];

export type BlogMedia = Database['public']['Tables']['blog_media']['Row'];
export type Category = Database['public']['Tables']['categories']['Row'];

export async function getBlogs(page = 1, limit = 10) {
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  const { data, error, count } = await supabase
    .from('blogs')
    .select('*, category:categories!blogs_category_id_fkey(*)', { count: 'exact' })
    .order('created_at', { ascending: false })
    .range(from, to);

  if (error) {
    throw error;
  }

  return { data, count };
}

export async function getBlogBySlug(slug: string) {
  const { data, error } = await supabase
    .from('blogs')
    .select('*, category:categories!blogs_category_id_fkey(*)')
    .eq('slug', slug)
    .single();

  if (error) {
    throw error;
  }

  // Get related media for this blog
  const { data: media, error: mediaError } = await supabase
    .from('blog_media')
    .select('*')
    .eq('blog_id', data.id);

  if (mediaError) {
    throw mediaError;
  }

  return { blog: data, media };
}

export async function createBlog(blog: BlogInsert) {
  const { data, error } = await supabase
    .from('blogs')
    .insert(blog)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function updateBlog(id: string, updates: BlogUpdate) {
  const { data, error } = await supabase
    .from('blogs')
    .update({ ...updates, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data;
}

export async function deleteBlog(id: string) {
  // First delete related media
  const { error: mediaError } = await supabase
    .from('blog_media')
    .delete()
    .eq('blog_id', id);

  if (mediaError) {
    throw mediaError;
  }

  // Then delete the blog
  const { error } = await supabase
    .from('blogs')
    .delete()
    .eq('id', id);

  if (error) {
    throw error;
  }

  return true;
}

export async function getCategories() {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name');

  if (error) {
    throw error;
  }

  return data;
}

export async function uploadBlogMedia(file: File, blogId: string, caption?: string, altText?: string) {
  // First upload the file to storage
  const fileExt = file.name.split('.').pop();
  const fileName = `${Math.random().toString(36).substring(2, 15)}.${fileExt}`;
  const filePath = `blog-media/${blogId}/${fileName}`;

  const { error: uploadError, data } = await supabase.storage
    .from('blog-assets')
    .upload(filePath, file);

  if (uploadError) {
    throw uploadError;
  }

  // Get the public URL for the file
  const { data: { publicUrl } } = supabase.storage
    .from('blog-assets')
    .getPublicUrl(filePath);

  // Now insert a record in the blog_media table
  const mediaType = file.type.startsWith('image/') ? 'image' : 'video';
  
  const { data: media, error: mediaError } = await supabase
    .from('blog_media')
    .insert({
      blog_id: blogId,
      media_url: publicUrl,
      media_type: mediaType,
      caption: caption || null,
      alt_text: altText || null
    })
    .select()
    .single();

  if (mediaError) {
    throw mediaError;
  }

  return media;
}