import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import PostList from './pages/PostList';
import PostDetail from './pages/PostDetail';
import CreatePost from './pages/CreatePost';
import EditPost from './pages/EditPost';
import Login from './pages/Login';
import Register from './pages/Register';
import CreateCategory from './pages/CreateCategory'; // Import CreateCategory
// import './App.css'; // Removed as we are using Tailwind CSS

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-slate-50 font-sans">
        <nav className="bg-white p-4 border-b shadow-sm">
          <div className="container mx-auto flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold text-slate-800">Blog</Link>
            <ul className="flex items-center space-x-6">
              <li>
                <Link to="/" className="text-slate-700 hover:text-blue-600 transition-colors">Home</Link>
              </li>
              <li>
                <Link to="/posts" className="text-slate-700 hover:text-blue-600 transition-colors">Posts</Link>
              </li>
              <li>
                <Link to="/create-post" className="text-slate-700 hover:text-blue-600 transition-colors">Create Post</Link>
              </li>
              <li>
                <Link to="/create-category" className="text-slate-700 hover:text-blue-600 transition-colors">Create Category</Link>
              </li>
              <li>
                <Link to="/login" className="text-slate-700 hover:text-blue-600 transition-colors">Login</Link>
              </li>
              <li>
                <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors">Register</Link>
              </li>
            </ul>
          </div>
        </nav>
        <main className="container mx-auto p-8 mt-8">
          <div className="bg-white p-8 rounded-xl shadow-xl">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/posts" element={<PostList />} />
              <Route path="/posts/:id" element={<PostDetail />} />
              <Route path="/create-post" element={<CreatePost />} />
              <Route path="/create-category" element={<CreateCategory />} />
              <Route path="/edit-post/:id" element={<EditPost />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </div>
        </main>
      </div>
    </Router>
  );
}

export default App;
