import React, { useEffect, useRef, useState, ChangeEvent } from 'react';
import EditorJS, { OutputData } from '@editorjs/editorjs';
import Header from '@editorjs/header';
import ListTool from '@editorjs/list';
import Embed from '@editorjs/embed';
import TableTool from '@editorjs/table';
import ImageToolJS from '@editorjs/image';
import { supabase } from '@/lib/supabase';
import { Type, List, Image, Video, Table, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Category {
  category_name: string;
  url_slug: string;
}

export default function NewBlog() {
  const [editorData, setEditorData] = useState<OutputData>({ blocks: [] });
  const [title, setTitle] = useState('');
  const [categories, setCategories] = useState<Category[]>([]);
  const [categorySlug, setCategorySlug] = useState('');
  const [coverURL, setCoverURL] = useState('');
  const [loading, setLoading] = useState(false);
  const ejInstance = useRef<EditorJS | null>(null);

    // load categories
  useEffect(() => {
    async function fetchCategories() {
      const { data, error, status } = await supabase
        .from('categories')
        .select('category_name, url_slug')
      if (error) {
        if (status === 404) {
          console.error('Categories table not found. Check your table name in Supabase.')
        } else {
          console.error('Error loading categories:', error)
        }
        return
      }
      setCategories(data)
    }
    fetchCategories()

    if (!ejInstance.current) {
      const editor = new EditorJS({
        holder: 'editorjs',
        placeholder: 'Start writing your post...',
        tools: {
          header: Header,
          list: { class: ListTool, inlineToolbar: true },
          embed: { class: Embed, inlineToolbar: true },
          table: { class: TableTool, inlineToolbar: true },
          image: {
            class: ImageToolJS,
            config: {
              uploader: {
                async uploadByFile(file: File) {
                  const ext = file.name.split('.').pop();
                  const fileName = `post-images/${Date.now()}.${ext}`;
                  const { error } = await supabase
                    .storage
                    .from('blog-images')
                    .upload(fileName, file);
                  if (error) throw error;
                  const { publicURL } = supabase
                    .storage
                    .from('blog-images')
                    .getPublicUrl(fileName);
                  return { success: 1, file: { url: publicURL! } };
                }
              }
            }
          }
        },
        onChange: async () => {
          const data = await editor.save();
          setEditorData(data);
        }
      });
      ejInstance.current = editor;
    }

    return () => {
      ejInstance.current?.destroy();
        ejInstance.current = null;
    };
  }, []);
) => data && setCategories(data));

    if (!ejInstance.current) {
      const editor = new EditorJS({
        holder: 'editorjs',
        placeholder: 'Start writing your post...',
        tools: {
          header: Header,
          list: { class: ListTool, inlineToolbar: true },
          embed: { class: Embed, inlineToolbar: true },
          table: { class: TableTool, inlineToolbar: true },
          image: {
            class: ImageToolJS,
            config: {
              uploader: {
                async uploadByFile(file: File) {
                  const ext = file.name.split('.').pop();
                  const fileName = `post-images/${Date.now()}.${ext}`;
                  const { error } = await supabase
                    .storage
                    .from('blog-images')
                    .upload(fileName, file);
                  if (error) throw error;
                  const { publicURL } = supabase
                    .storage
                    .from('blog-images')
                    .getPublicUrl(fileName);
                  return { success: 1, file: { url: publicURL! } };
                }
              }
            }
          }
        },
        onChange: async () => {
          const data = await editor.save();
          setEditorData(data);
        }
      });
      ejInstance.current = editor;
    }

    return () => {
      ejInstance.current?.destroy();
      ejInstance.current = null;
    };
  }, []);

  const insertBlock = (tool: string) => {
    ejInstance.current?.blocks.insert(tool, {}, {}, ejInstance.current.blocks.getBlocksCount(), true);
  };

  const handleCoverChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const ext = file.name.split('.').pop();
    const fileName = `cover-${Date.now()}.${ext}`;
    setLoading(true);
    const { error } = await supabase
      .storage
      .from('blog-covers')
      .upload(fileName, file);
    if (!error) {
      const { publicURL } = supabase
        .storage
        .from('blog-covers')
        .getPublicUrl(fileName);
      setCoverURL(publicURL);
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) return setLoading(false);

    // store editor JSON or convert to HTML as needed
    const payload = {
      title,
      content: JSON.stringify(editorData),
      category_slug: categorySlug,
      cover_image: coverURL
    };
    const { error } = await supabase.from('blog_posts').insert([payload]);
    setLoading(false);
    if (error) console.error(error);
    else alert('Published successfully!');
  };

  return (
    <div className="grid grid-cols-4 h-screen overflow-hidden">
      {/* Sidebar Blocks */}
      <aside className="col-span-1 p-4 bg-gray-100 space-y-4">
        <button onClick={() => insertBlock('header')} className="p-2 bg-white rounded hover:bg-gray-200">
          <Type />
        </button>
        <button onClick={() => insertBlock('list')} className="p-2 bg-white rounded hover:bg-gray-200">
          <List />
        </button>
        <button onClick={() => insertBlock('image')} className="p-2 bg-white rounded hover:bg-gray-200">
          <Image />
        </button>
        <button onClick={() => insertBlock('embed')} className="p-2 bg-white rounded hover:bg-gray-200">
          <Video />
        </button>
        <button onClick={() => insertBlock('table')} className="p-2 bg-white rounded hover:bg-gray-200">
          <Table />
        </button>
      </aside>

      {/* Editor Area */}
      <main className="col-span-3 flex flex-col">
        {/* Top toolbar */}
        <header className="flex justify-between items-center p-4 border-b bg-white">
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Unpublished Changes</span>
            <ChevronLeft className="cursor-pointer" />
            <ChevronRight className="cursor-pointer" />
          </div>
          <div className="space-x-2">
            <Button onClick={() => alert('Saved!')}>Save</Button>
            <Button onClick={() => alert(JSON.stringify(editorData, null, 2))}>Preview</Button>
            <Button onClick={handleSubmit} disabled={loading} variant="primary">
              {loading ? 'Publishing...' : 'Publish'}
            </Button>
          </div>
        </header>

        <div className="p-6 overflow-auto flex-1 bg-white space-y-6">
          {/* Title, Category, Cover */}
          <input
            className="w-full text-3xl font-bold border-b pb-2 focus:outline-none"
            placeholder="Title..."
            value={title}
            onChange={e => setTitle(e.target.value)}
          />

          <div className="flex space-x-4">
            <select
              className="flex-1 p-2 border rounded"
              value={categorySlug}
              onChange={e => setCategorySlug(e.target.value)}
            >
              <option value="">Select category</option>
              {categories.map(c => (
                <option key={c.url_slug} value={c.url_slug}>
                  {c.category_name}
                </option>
              ))}
            </select>
            <input
              type="file"
              accept="image/*"
              onChange={handleCoverChange}
              className="p-2 border rounded"
            />
          </div>

          {coverURL && (
            <img src={coverURL} alt="Cover" className="w-full h-64 object-cover rounded" />
          )}

          {/* Block Editor */}
          <div id="editorjs" className="flex-1 border rounded" />
        </div>
      </main>
    </div>
  );
}
