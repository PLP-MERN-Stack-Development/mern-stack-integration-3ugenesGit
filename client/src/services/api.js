import axios from 'axios';

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

export const getPosts = async () => {
  const response = await api.get('/api/posts');
  return response.data;
};

export const getPost = async (id) => {
  const response = await api.get(`/api/posts/${id}`);
  return response.data;
};

export const createPost = async (postData) => {
  const response = await api.post('/api/posts', postData);
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
