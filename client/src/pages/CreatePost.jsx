import React, { useState, useEffect } from 'react';
import { createPost, getCategories } from '../services/api';
import { useNavigate } from 'react-router-dom';

function CreatePost() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        setCategories(response.data.data); // Adjusted to access the nested data array
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Placeholder for author ID - will be replaced with actual user ID from auth context
      const authorId = '60d5ec49f8c7b00015f8e3b1'; // Example ID, replace with dynamic value
      await createPost({ title, content, category, author: authorId });
      navigate('/posts');
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create post');
    }
  };

  return (
    <>
      <h1 className="text-4xl font-bold text-slate-800 mb-8 text-center">Create New Post</h1>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-slate-600 text-sm font-bold mb-2">Title:</label>
          <input
            type="text"
            id="title"
            className="border border-slate-300 rounded w-full py-2 px-4 text-slate-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="content" className="block text-slate-600 text-sm font-bold mb-2">Content:</label>
          <textarea
            id="content"
            className="border border-slate-300 rounded w-full py-2 px-4 text-slate-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow h-40"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="category" className="block text-slate-600 text-sm font-bold mb-2">Category:</label>
          <select
            id="category"
            className="border border-slate-300 rounded w-full py-2 px-4 text-slate-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          Create Post
        </button>
      </form>
    </>
  );
}

export default CreatePost;
