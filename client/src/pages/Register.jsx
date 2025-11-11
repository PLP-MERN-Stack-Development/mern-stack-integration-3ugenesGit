import React, { useState } from 'react';
import { registerUser } from '../services/api';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await registerUser({ username, email, password });
      navigate('/login'); // Redirect to login page after successful registration
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed');
    }
  };

  return (
    <>
      <h1 className="text-4xl font-bold text-slate-800 mb-8 text-center">Register</h1>
      {error && <p className="text-red-500 text-center mb-4">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-6 max-w-lg mx-auto">
        <div>
          <label htmlFor="username" className="block text-slate-600 text-sm font-bold mb-2">Username:</label>
          <input
            type="text"
            id="username"
            className="border border-slate-300 rounded w-full py-2 px-4 text-slate-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-slate-600 text-sm font-bold mb-2">Email:</label>
          <input
            type="email"
            id="email"
            className="border border-slate-300 rounded w-full py-2 px-4 text-slate-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-slate-600 text-sm font-bold mb-2">Password:</label>
          <input
            type="password"
            id="password"
            className="border border-slate-300 rounded w-full py-2 px-4 text-slate-700 leading-tight focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          Register
        </button>
      </form>
    </>
  );
}

export default Register;
