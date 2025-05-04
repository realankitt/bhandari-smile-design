import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { supabase } from '../lib/supabase';
import Input from './ui/Input';
import Textarea from './ui/Textarea';
import Button from './ui/Button';
import { Plus, Save, ImageIcon, Trash2 } from 'lucide-react';

interface BlogFormData {
  title: string;
  excerpt: string;
  content: string;
  slug: string;
  published: boolean;
  featured_image?: File | null;
}

interface BlogEditorProps {
  blogId?: string;
  onSuccess?: () => void;
}

const BlogEditor: React.FC<BlogEditorProps> = ({ blogId, onSuccess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [featuredImageUrl, setFeaturedImageUrl] = useState<string | null>(null);
  
  const { register, handleSubmit, control, setValue, watch, formState: { errors } } = useForm<BlogFormData>({
    defaultValues: {
      title: '',
      excerpt: '',
      content: '',
      slug: '',
      published: false,
      featured_image: null
    }
  });

  useEffect(() => {
    if (blogId) {
      setIsLoading(true);
      fetchBlog(blogId);
    }
  }, [blogId]);

  const fetchBlog = async (id: string) => {
    try {
      const { data, error } = await supabase
        .from('blogs')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      
      if (data) {
        setValue('title', data.title);
        setValue('excerpt', data.excerpt);
        setValue('content', data.content);
        setValue('slug', data.slug);
        setValue('published', data.published);
        
        if (data.featured_image) {
          setFeaturedImageUrl(data.featured_image);
        }
      }
    } catch (error) {
      console.error('Error fetching blog:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data: BlogFormData) => {
    setIsSaving(true);
    try {
      let featuredImagePath = featuredImageUrl;

      // Upload featured image if exists
      if (data.featured_image && data.featured_image instanceof File) {
        const file = data.featured_image;
        const fileExt = file.name.split('.').pop();
        const filePath = `blog-images/${Date.now()}.${fileExt}`;
        
        const { error: uploadError, data: uploadData } = await supabase.storage
          .from('blog-media')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        if (uploadData) {
          const { data: urlData } = supabase.storage
            .from('blog-media')
            .getPublicUrl(filePath);
            
          featuredImagePath = urlData.publicUrl;
        }
      }

      const blogData = {
        title: data.title,
        excerpt: data.excerpt,
        content: data.content,
        slug: data.slug,
        published: data.published,
        featured_image: featuredImagePath,
        updated_at: new Date().toISOString(),
        // We'll set author_id to a placeholder; in a real app this would come from auth user
        author_id: 'default-author-id'
      };

      if (blogId) {
        // Update existing blog
        const { error } = await supabase
          .from('blogs')
          .update(blogData)
          .eq('id', blogId);

        if (error) throw error;
      } else {
        // Create new blog
        const { error } = await supabase
          .from('blogs')
          .insert([{
            ...blogData,
            created_at: new Date().toISOString()
          }]);

        if (error) throw error;
      }

      if (onSuccess) onSuccess();
    } catch (error) {
      console.error('Error saving blog:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setValue('featured_image', file);
    
    // Show preview
    const previewUrl = URL.createObjectURL(file);
    setFeaturedImageUrl(previewUrl);
  };

  const removeFeaturedImage = () => {
    setValue('featured_image', null);
    setFeaturedImageUrl(null);
  };

  // Auto-generate slug from title
  const title = watch('title');
  useEffect(() => {
    if (title && !blogId) {
      const slug = title
        .toLowerCase()
        .replace(/[^\w\s]/gi, '')
        .replace(/\s+/g, '-');
      setValue('slug', slug);
    }
  }, [title, setValue, blogId]);

  if (isLoading) {
    return <div className="flex justify-center p-8">Loading blog data...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6">
        {blogId ? 'Edit Blog Post' : 'Create New Blog Post'}
      </h2>
      
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Title"
          id="title"
          placeholder="Blog post title"
          {...register('title', { required: 'Title is required' })}
          error={errors.title?.message}
        />
        
        <Input
          label="Slug"
          id="slug"
          placeholder="blog-post-url"
          {...register('slug', { required: 'Slug is required' })}
          error={errors.slug?.message}
          helpText="This will be used in the blog post URL"
        />
        
        <Textarea
          label="Excerpt"
          id="excerpt"
          placeholder="Brief summary of the blog post"
          rows={3}
          {...register('excerpt', { required: 'Excerpt is required' })}
          error={errors.excerpt?.message}
        />
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Featured Image
          </label>
          
          {featuredImageUrl ? (
            <div className="relative mb-2">
              <img 
                src={featuredImageUrl} 
                alt="Featured" 
                className="w-full max-h-64 object-cover rounded-md"
              />
              <button
                type="button"
                onClick={removeFeaturedImage}
                className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full hover:bg-red-700"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ) : (
            <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
              <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
              <div className="mt-2">
                <label htmlFor="file-upload" className="cursor-pointer rounded-md font-medium text-blue-600 hover:text-blue-500">
                  <span>Upload an image</span>
                  <input 
                    id="file-upload" 
                    name="file-upload" 
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    onChange={handleImageUpload}
                  />
                </label>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                PNG, JPG, GIF up to 10MB
              </p>
            </div>
          )}
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Blog Content
          </label>
          <Controller
            name="content"
            control={control}
            rules={{ required: 'Content is required' }}
            render={({ field }) => (
              <ReactQuill 
                theme="snow" 
                value={field.value} 
                onChange={field.onChange}
                className="bg-white min-h-[300px]"
                modules={{
                  toolbar: [
                    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                    ['bold', 'italic', 'underline', 'strike'],
                    [{ 'list': 'ordered'}, { 'list': 'bullet' }],
                    [{ 'align': [] }],
                    ['link', 'image', 'video'],
                    ['clean']
                  ],
                }}
              />
            )}
          />
          {errors.content && (
            <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>
          )}
        </div>
        
        <div className="flex items-center mb-6">
          <input
            type="checkbox"
            id="published"
            className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            {...register('published')}
          />
          <label htmlFor="published" className="ml-2 block text-sm text-gray-700">
            Publish blog post (make it visible to the public)
          </label>
        </div>
        
        <div className="flex justify-end space-x-4">
          <Button 
            variant="outline" 
            type="button" 
            onClick={() => window.history.back()}
          >
            Cancel
          </Button>
          <Button 
            variant="primary"
            type="submit"
            isLoading={isSaving}
            icon={<Save size={18} />}
          >
            {blogId ? 'Update Blog Post' : 'Create Blog Post'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default BlogEditor;