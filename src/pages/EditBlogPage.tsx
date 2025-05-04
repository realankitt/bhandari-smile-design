import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ArrowLeft, Save, Image, X, Upload, Trash2 } from 'lucide-react';
import { getBlogBySlug, updateBlog, getCategories, uploadBlogMedia } from '../api/blogs';
import TextareaAutosize from 'react-textarea-autosize';

interface FormValues {
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  category_id: string;
  published: boolean;
}

const EditBlogPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [coverImagePreview, setCoverImagePreview] = useState<string | null>(null);
  const [currentCoverImage, setCurrentCoverImage] = useState<string | null>(null);
  const [categories, setCategories] = useState<any[]>([]);
  const [blog, setBlog] = useState<any | null>(null);
  
  const { register, handleSubmit, setValue, formState: { errors } } = useForm<FormValues>();
  
  useEffect(() => {
    if (!id) return;
    
    async function fetchBlog() {
      try {
        setLoading(true);
        // We'll need to modify this to get by ID instead of slug
        const response = await fetch(`/api/blogs/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch blog');
        }
        const data = await response.json();
        setBlog(data);
        
        // Set form values
        setValue('title', data.title);
        setValue('slug', data.slug);
        setValue('content', data.content);
        setValue('excerpt', data.excerpt || '');
        setValue('category_id', data.category_id || '');
        setValue('published', data.published);
        
        if (data.cover_image) {
          setCurrentCoverImage(data.cover_image);
        }
      } catch (err) {
        console.error('Failed to load blog:', err);
        setError('Failed to load blog post');
      } finally {
        setLoading(false);
      }
    }
    
    async function fetchCategories() {
      try {
        const data = await getCategories();
        setCategories(data);
      } catch (err) {
        console.error('Failed to load categories:', err);
      }
    }
    
    fetchBlog();
    fetchCategories();
  }, [id, setValue]);
  
  const handleCoverImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    setCoverImage(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setCoverImagePreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };
  
  const removeCoverImage = () => {
    setCoverImage(null);
    setCoverImagePreview(null);
    setCurrentCoverImage(null);
  };
  
  const onSubmit = async (data: FormValues) => {
    if (!id) return;
    
    try {
      setLoading(true);
      setError(null);
      
      // Update the blog post
      const updatedBlog = await updateBlog(id, {
        title: data.title,
        slug: data.slug,
        content: data.content,
        excerpt: data.excerpt || null,
        category_id: data.category_id === '' ? null : data.category_id,
        published: data.published,
        cover_image: currentCoverImage,
      });
      
      // Upload cover image if provided
      if (coverImage) {
        const uploadedMedia = await uploadBlogMedia(coverImage, id);
        
        // Update the blog post with the cover image
        await updateBlog(id, { cover_image: uploadedMedia.media_url });
      }
      
      navigate('/admin');
    } catch (err) {
      console.error('Failed to update blog:', err);
      setError('Failed to update blog post');
    } finally {
      setLoading(false);
    }
  };
  
  if (loading && !blog) {
    return (
      <div className="container mx-auto px-4 py-16 flex justify-center">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }
  
  if (error && !blog) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          <p>{error}</p>
        </div>
        <div className="mt-4">
          <button
            onClick={() => navigate('/admin')}
            className="inline-flex items-center text-blue-600 hover:text-blue-800"
          >
            <ArrowLeft size={18} className="mr-2" />
            Back to Admin
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-16 max-w-4xl">
      <div className="mb-8 flex items-center">
        <button 
          onClick={() => navigate('/admin')}
          className="mr-4 text-blue-600 hover:text-blue-800"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-3xl font-bold text-gray-800">Edit Blog Post</h1>
      </div>
      
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          <p>{error}</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
            Title *
          </label>
          <input
            id="title"
            type="text"
            {...register('title', { required: 'Title is required' })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="slug" className="block text-sm font-medium text-gray-700 mb-1">
            Slug *
          </label>
          <input
            id="slug"
            type="text"
            {...register('slug', { required: 'Slug is required' })}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          />
          {errors.slug && (
            <p className="mt-1 text-sm text-red-600">{errors.slug.message}</p>
          )}
        </div>
        
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            id="category"
            {...register('category_id')}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select Category</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        
        <div>
          <label htmlFor="coverImage" className="block text-sm font-medium text-gray-700 mb-1">
            Cover Image
          </label>
          
          {(coverImagePreview || currentCoverImage) ? (
            <div className="relative mb-4">
              <img 
                src={coverImagePreview || currentCoverImage || ''} 
                alt="Cover preview" 
                className="w-full h-48 object-cover rounded-md"
              />
              <button
                type="button"
                onClick={removeCoverImage}
                className="absolute top-2 right-2 bg-red-600 text-white p-1 rounded-full hover:bg-red-700"
              >
                <X size={16} />
              </button>
            </div>
          ) : (
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <Image className="mx-auto h-12 w-12 text-gray-400" />
                <div className="flex text-sm text-gray-600">
                  <label
                    htmlFor="cover-image-upload"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none"
                  >
                    <span>Upload a file</span>
                    <input
                      id="cover-image-upload"
                      type="file"
                      className="sr-only"
                      accept="image/*"
                      onChange={handleCoverImageChange}
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-gray-500">
                  PNG, JPG, GIF up to 10MB
                </p>
              </div>
            </div>
          )}
        </div>
        
        <div>
          <label htmlFor="excerpt" className="block text-sm font-medium text-gray-700 mb-1">
            Excerpt
          </label>
          <TextareaAutosize
            id="excerpt"
            {...register('excerpt')}
            minRows={2}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
            placeholder="Brief summary of the blog post"
          />
        </div>
        
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
            Content *
          </label>
          <TextareaAutosize
            id="content"
            {...register('content', { required: 'Content is required' })}
            minRows={10}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 font-mono"
          />
          {errors.content && (
            <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>
          )}
        </div>
        
        <div className="flex items-center">
          <input
            id="published"
            type="checkbox"
            {...register('published')}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
          />
          <label htmlFor="published" className="ml-2 block text-sm text-gray-700">
            Published
          </label>
        </div>
        
        <div className="flex justify-end pt-5">
          <button
            type="button"
            onClick={() => navigate('/admin')}
            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 mr-3"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400"
          >
            {loading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </span>
            ) : (
              <span className="flex items-center">
                <Save size={16} className="mr-2" />
                Save Changes
              </span>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditBlogPage;