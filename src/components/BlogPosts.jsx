import React, { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient'; // Adjust path as needed

export default function BlogPosts() {
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch blog posts from Supabase
  async function fetchPosts() {
    setLoading(true);
    let { data, error } = await supabase
      .from('blogs')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) {
      setError('Error fetching posts');
      setPosts([]);
    } else {
      setError(null);
      setPosts(data);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!title.trim() || !content.trim()) {
      setError('Title and content cannot be empty');
      setLoading(false);
      return;
    }

    const { data, error } = await supabase.from('blogs').insert([
      { title: title.trim(), content: content.trim() },
    ]);

    if (error) {
      setError('Error submitting blog post');
    } else {
      setTitle('');
      setContent('');
      fetchPosts();
    }
    setLoading(false);
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Create a New Blog Post</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          maxLength={100}
          onChange={e => setTitle(e.target.value)}
          style={styles.input}
        />
        <textarea
          placeholder="Write your blog content here..."
          value={content}
          onChange={e => setContent(e.target.value)}
          rows={8}
          style={styles.textarea}
        />
        {error && <div style={styles.error}>{error}</div>}
        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? 'Submitting...' : 'Submit Blog'}
        </button>
      </form>

      <h3 style={styles.heading}>Preview</h3>
      <div style={styles.previewBox}>
        <h4>{title || 'Title will appear here'}</h4>
        <p style={styles.previewContent}>
          {content || 'Blog content preview will appear here as you type...'}
        </p>
      </div>

      <h3 style={styles.heading}>Blog Posts</h3>
      {loading && posts.length === 0 ? (
        <p>Loading posts...</p>
      ) : posts.length === 0 ? (
        <p>No blog posts yet.</p>
      ) : (
        posts.map(post => (
          <div key={post.id} style={styles.post}>
            <h4 style={styles.postTitle}>{post.title}</h4>
            <p style={styles.postContent}>{post.content}</p>
            <small style={styles.postDate}>
              {new Date(post.created_at).toLocaleString()}
            </small>
          </div>
        ))
      )}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '350px',
    maxHeight: '600px',
    padding: '1rem',
    margin: 'auto',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    overflowY: 'auto',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
    borderRadius: '8px',
    backgroundColor: '#fff',
  },
  heading: {
    margin: '1rem 0 0.5rem',
    fontWeight: '600',
    color: '#222',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    padding: '0.5rem',
    fontSize: '1rem',
    borderRadius: '6px',
    border: '1px solid #ccc',
    marginBottom: '0.75rem',
    outlineColor: '#0070f3',
  },
  textarea: {
    padding: '0.5rem',
    fontSize: '1rem',
    borderRadius: '6px',
    border: '1px solid #ccc',
    resize: 'vertical',
    marginBottom: '0.75rem',
    outlineColor: '#0070f3',
    fontFamily: 'inherit',
  },
  button: {
    padding: '0.6rem',
    fontSize: '1.1rem',
    backgroundColor: '#0070f3',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600',
    transition: 'background-color 0.3s ease',
  },
  error: {
    color: 'red',
    marginBottom: '0.75rem',
  },
  previewBox: {
    minHeight: '150px',
    padding: '0.75rem',
    borderRadius: '6px',
    border: '1px solid #ddd',
    backgroundColor: '#f9f9f9',
    marginBottom: '1rem',
    whiteSpace: 'pre-wrap',
    color: '#333',
  },
  previewContent: {
    whiteSpace: 'pre-wrap',
  },
  post: {
    marginBottom: '1rem',
    paddingBottom: '0.5rem',
    borderBottom: '1px solid #eee',
  },
  postTitle: {
    margin: '0 0 0.2rem',
    color: '#0070f3',
  },
  postContent: {
    margin: '0 0 0.3rem',
    whiteSpace: 'pre-wrap',
  },
  postDate: {
    fontSize: '0.75rem',
    color: '#777',
  },
};
</content>
</create_file>
