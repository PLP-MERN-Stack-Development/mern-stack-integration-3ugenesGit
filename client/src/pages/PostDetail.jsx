import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getPost } from '../services/api';

function PostDetail() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await getPost(id);
        setPost(response.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  if (loading) return <div className="text-center text-slate-500">Loading post...</div>;
  if (error) return <div className="text-center text-red-500">Error: {error.message}</div>;
  if (!post) return <div className="text-center text-slate-500">Post not found</div>;

  return (
    <article className="max-w-4xl mx-auto">
      <header className="mb-8 text-center">
        <div className="mb-4">
          <span className="text-sm font-semibold uppercase text-blue-600 bg-blue-100 py-1 px-3 rounded-full">
            {post.category?.name || 'Uncategorized'}
          </span>
        </div>
        <h1 className="text-5xl font-extrabold text-slate-900 mb-4">{post.title}</h1>
        <div className="text-slate-500 text-lg">
          <span>By {post.author?.username || 'Anonymous'}</span>
          <span className="mx-2">&bull;</span>
          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
        </div>
      </header>
      
      <div className="text-lg text-slate-800 leading-relaxed space-y-6 whitespace-pre-wrap">
        {post.content}
      </div>
      
      {/* Add comments section here */}
    </article>
  );
}

export default PostDetail;
