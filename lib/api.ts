// lib/api.ts
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

export const productApi = {
  // Get all products
  getAllProducts: async () => {
    const response = await api.get('/data/products.json');
    return response.data.products;
  },

  // Get single product by ID
  getProductById: async (id: number) => {
    const response = await api.get('/data/products.json');
    const products = response.data.products;
    return products.find((product: any) => product.id === id);
  },

  // Get product by slug
  getProductBySlug: async (slug: string) => {
    const response = await api.get('/data/products.json');
    const products = response.data.products;
    return products.find((product: any) => product.slug === slug);
  },

  // Get featured products
  getFeaturedProducts: async () => {
    const response = await api.get('/data/products.json');
    const products = response.data.products;
    return products.filter((product: any) => product.isFeatured);
  },

  // Get best sellers
  getBestSellers: async () => {
    const response = await api.get('/data/products.json');
    const products = response.data.products;
    return products.filter((product: any) => product.isBestSeller);
  },

  // Get products by category
  getProductsByCategory: async (category: string) => {
    const response = await api.get('/data/products.json');
    const products = response.data.products;
    return products.filter((product: any) => 
      product.category.toLowerCase() === category.toLowerCase()
    );
  },
};

export default api;