import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createCategory } from '../services/api';

function CreateCategory() {
  const [name, setName] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess('');
    try {
      await createCategory({ name });
      setSuccess(`Category "${name}" created successfully!`);
      setName(''); // Clear input after successful creation
      // Optional: navigate away or refresh list
      // navigate('/posts'); 
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to create category');
    }
  };

  return (
    <>
      <h1 className="text-4xl font-bold text-slate-800 mb-8 text-center">Create Category</h1>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      {success && <p className="text-green-500 text-center mb-4">{success}</p>}
      <form onSubmit={handleSubmit} className="space-y-6 max-w-lg mx-auto">
        <div>
          <label htmlFor="name" className="block text-slate-600 text-sm font-bold mb-2">Category Name:</label>
          <input
            type="text"
            id="name"
            className="border border-slate-300 rounded w-full py-2 px-4 text-slate-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          Create Category
        </button>
      </form>
    </>
  );
}

export default CreateCategory;
