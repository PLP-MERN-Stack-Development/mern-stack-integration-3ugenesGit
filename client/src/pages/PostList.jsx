import React, { useEffect, useState } from 'react';
import { getPosts } from '../services/api';
import { Link } from 'react-router-dom';

function PostList() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await getPosts();
        setPosts(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  if (loading) return <div className="text-center text-slate-500">Loading posts...</div>;
  if (error) return <div className="text-center text-red-500">Error: {error.message}</div>;

  return (
    <>
      <h1 className="text-4xl font-bold text-slate-800 mb-8 text-center">Latest Posts</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <div key={post._id} className="bg-white border border-slate-200 rounded-lg shadow-lg flex flex-col hover:shadow-2xl transition-shadow duration-300">
            <div className="p-6 flex-grow">
              <div className="mb-4">
                <span className="text-xs font-semibold uppercase text-blue-600 bg-blue-100 py-1 px-3 rounded-full">
                  {post.category?.name || 'Uncategorized'}
                </span>
              </div>
              <h2 className="text-2xl font-bold text-slate-800 mb-2">
                <Link to={`/posts/${post._id}`} className="hover:text-blue-700 transition-colors">{post.title}</Link>
              </h2>
              <p className="text-slate-600 text-sm mb-4">
                By {post.author?.username || 'Anonymous'}
              </p>
              <p className="text-slate-700 mb-4 line-clamp-3">{post.content}</p>
            </div>
            <div className="p-6 bg-slate-50 rounded-b-lg">
              <Link to={`/posts/${post._id}`} className="font-semibold text-blue-600 hover:text-blue-800 transition-colors">
                Read More &rarr;
              </Link>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

export default PostList;
