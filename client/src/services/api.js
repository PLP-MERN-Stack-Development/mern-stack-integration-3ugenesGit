import axios from 'axios';

// ===================================
// SLUG GENERATION UTILITY
// ===================================

/**
 * Converts a string (like a post title) into a URL-friendly slug.
 * @param {string} title The input string, typically the post title.
 * @returns {string} The generated slug.
 */
function createSlug(title) {
  if (!title) return ''; // Handle case where title is null/empty
  
  return String(title)
    .toLowerCase()         // 1. Convert to lowercase
    .trim()                // 2. Remove leading/trailing whitespace
    .replace(/[^\w\s-]/g, '') // 3. Remove non-word characters (e.g., punctuation)
    .replace(/[\s_-]+/g, '-')  // 4. Replace spaces, underscores, and multiple hyphens with a single hyphen
    .replace(/^-+|-+$/g, ''); // 5. Remove leading/trailing hyphens
}

// ===================================
// AXIOS INSTANCE SETUP
// ===================================

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding the auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// ===================================
// POSTS API FUNCTIONS
// ===================================

export const getPosts = async () => {
  const response = await api.get('/api/posts');
  return response.data;
};

export const getPost = async (id) => {
  const response = await api.get(`/api/posts/${id}`);
  return response.data;
};

/**
 * Creates a new post. Automatically generates the 'slug' field from 'postData.title'.
 * @param {object} postData Object containing post details, must include 'title'.
 */
export const createPost = async (postData) => {
  if (!postData.title) {
    throw new Error("Post title is required to create a slug and a new post.");
  }
  
  // 1. Generate the slug
  const slug = createSlug(postData.title);
  
  // 2. Create the final payload including the required slug
  const payload = {
    ...postData,
    slug: slug, // <-- Adds the generated slug to the request
  };
  
  const response = await api.post('/api/posts', payload);
  return response.data;
};

export const updatePost = async (id, postData) => {
  const response = await api.put(`/api/posts/${id}`, postData);
  return response.data;
};

export const deletePost = async (id) => {
  const response = await api.delete(`/api/posts/${id}`);
  return response.data;
};



export const getCategories = async () => {
  const response = await api.get('/api/categories');
  return response.data;
};

export const createCategory = async (categoryData) => {
  const response = await api.post('/api/categories', categoryData);
  return response.data;
};

export const registerUser = async (userData) => {
  const response = await api.post('/api/auth/register', userData);
  return response.data;
};

export const loginUser = async (credentials) => {
  const response = await api.post('/api/auth/login', credentials);
  return response.data;
};

export default api;