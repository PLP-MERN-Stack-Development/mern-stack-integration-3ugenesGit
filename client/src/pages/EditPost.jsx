import React, { useState, useEffect } from 'react';
import { getPost, updatePost, getCategories } from '../services/api';
import { useNavigate, useParams } from 'react-router-dom';

function EditPost() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const postResponse = await getPost(id);
        setTitle(postResponse.data.title);
        setContent(postResponse.data.content);
        setCategory(postResponse.data.category._id);

        const categoriesResponse = await getCategories();
        setCategories(categoriesResponse.data);
      } catch (err) {
        setError(err.response?.data?.error || 'Failed to fetch post or categories');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updatePost(id, { title, content, category });
      navigate(`/posts/${id}`);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to update post');
    }
  };

  if (loading) return <div className="text-center text-gray-600">Loading post for editing...</div>;
  if (error) return <div className="text-red-500 text-center mb-4">Error: {error}</div>;

  return (
    <div className="p-4 max-w-lg mx-auto bg-white shadow-md rounded-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Edit Post</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-gray-700 text-sm font-bold mb-2">Title:</label>
          <input
            type="text"
            id="title"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="content" className="block text-gray-700 text-sm font-bold mb-2">Content:</label>
          <textarea
            id="content"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-32"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>
        <div>
          <label htmlFor="category" className="block text-gray-700 text-sm font-bold mb-2">Category:</label>
          <select
            id="category"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full"
        >
          Update Post
        </button>
      </form>
    </div>
  );
}

export default EditPost;
