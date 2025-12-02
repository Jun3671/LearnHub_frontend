import axios from 'axios';

const API_BASE_URL = 'http://localhost:8080/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add token
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

// Auth API
export const authAPI = {
  login: (email, password) => api.post('/auth/login', { email, password }),
  register: (email, password, role) => api.post('/auth/register', { email, password, role }),
};

// Bookmark API
export const bookmarkAPI = {
  getAll: () => api.get('/bookmarks'),
  getById: (id) => api.get(`/bookmarks/${id}`),
  create: (data) => api.post('/bookmarks', data),
  update: (id, data) => api.put(`/bookmarks/${id}`, data),
  delete: (id) => api.delete(`/bookmarks/${id}`),
  search: (keyword) => api.get(`/bookmarks/search?keyword=${keyword}`),
};

// Category API
export const categoryAPI = {
  getAll: () => api.get('/categories'),
  getById: (id) => api.get(`/categories/${id}`),
  create: (name) => api.post('/categories', { name }),
  update: (id, name) => api.put(`/categories/${id}`, { name }),
  delete: (id) => api.delete(`/categories/${id}`),
};

// Tag API
export const tagAPI = {
  getAll: () => api.get('/tags'),
  getPopular: () => api.get('/tags/popular'),
};

export default api;
