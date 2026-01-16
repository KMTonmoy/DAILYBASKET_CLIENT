// types/product.ts
export interface NutritionalInfo {
  calories?: number;
  protein?: string;
  carbs?: string;
  fat?: string;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  description: string;
  longDescription?: string;
  images: string[];
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  category: string;
  subCategory?: string;
  brand?: string;
  stock: number;
  unit: string;
  weight?: string;
  rating: number;
  reviewsCount: number;
  isFeatured: boolean;
  isBestSeller: boolean;
  isNew: boolean;
  tags: string[];
  nutritionalInfo?: NutritionalInfo;
  expiryDate?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ProductCardProps {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  category: string;
  stock: number;
  unit?: string;
  isInStock?: boolean;
  rating?: number;
  isTrending?: boolean;
  discountPrice?: number;
  slug?: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  icon: string;
  productCount: number;
  image?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface WishlistItem extends Product {
  addedAt: Date;
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}