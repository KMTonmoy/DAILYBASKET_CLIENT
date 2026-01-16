"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check, Package, TrendingUp } from "lucide-react";
import Image from "next/image";
import { ProductCardProps } from "@/types/product";

const ProductCard: React.FC<ProductCardProps> = ({
  id,
  name,
  description,
  image,
  price,
  category,
  stock,
  unit = "piece",
  isInStock = true,
  rating = 4.5,
  isTrending = false,
  discountPrice,
}) => {
  const stockPercentage = Math.min((stock / 100) * 100, 100);
  const isLowStock = stock <= 10;
  const isOutOfStock = stock === 0;

  // Stock status color
  const getStockColor = () => {
    if (isOutOfStock) return "text-red-500";
    if (isLowStock) return "text-amber-500";
    return "text-green-500";
  };

  // Stock status text
  const getStockText = () => {
    if (isOutOfStock) return "Out of Stock";
    if (isLowStock) return `Low Stock (${stock} left)`;
    if (stock > 100) return "In Stock";
    return `${stock} in stock`;
  };

  // Format price in BDT with ৳ symbol
  const formatPriceBDT = (amount: number) => {
    return `৳${amount.toLocaleString("en-BD")}`;
  };

  // Calculate discount if discountPrice is provided
  const discount = discountPrice 
    ? Math.round(((discountPrice - price) / discountPrice) * 100)
    : 0;

  // Get background color class for stock indicator
  const getStockBgColor = () => {
    const colorClass = getStockColor();
    return colorClass.replace('text-', 'bg-') + '/10';
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02 }}
      className="group relative"
    >
      {/* Glassmorphism Card Container */}
      <div className="relative bg-white/20 backdrop-blur-xl rounded-2xl border border-white/30 shadow-lg shadow-black/5 overflow-hidden">
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 via-transparent to-purple-50/20" />
        
        {/* Content Container */}
        <div className="relative z-10 p-6">
          {/* Image Container */}
          <div className="relative mb-4">
            <div className="relative w-full h-48 rounded-xl overflow-hidden">
              {/* Product Image */}
              <Image
                src={image || "/api/placeholder/400/300"}
                alt={name}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                priority={id <= 3} // Prioritize first 3 images for LCP
              />
              
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
              
              {/* Category Badge */}
              <div className="absolute top-3 left-3">
                <span className="px-3 py-1 bg-black/60 backdrop-blur-sm text-white text-xs font-medium rounded-full">
                  {category}
                </span>
              </div>
              
              {/* Trending Badge */}
              {isTrending && (
                <div className="absolute top-3 right-3">
                  <span className="px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 backdrop-blur-sm text-white text-xs font-medium rounded-full flex items-center gap-1">
                    <TrendingUp size={12} />
                    Trending
                  </span>
                </div>
              )}
              
              {/* Discount Badge */}
              {discount > 0 && (
                <div className="absolute bottom-3 right-3">
                  <span className="px-3 py-1.5 bg-gradient-to-r from-red-500 to-pink-600 text-white text-sm font-bold rounded-lg shadow-lg">
                    -{discount}%
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-3">
            {/* Product Name */}
            <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
              {name}
            </h3>
            
            {/* Description */}
            <p className="text-sm text-gray-600 line-clamp-2 min-h-[40px]">
              {description}
            </p>
            
            {/* Price Section */}
            <div className="space-y-1">
              {discount > 0 && discountPrice ? (
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xl font-bold text-gray-900">
                    {formatPriceBDT(price)}
                  </span>
                  <span className="text-sm text-gray-400 line-through">
                    {formatPriceBDT(discountPrice)}
                  </span>
                  <span className="text-xs font-medium text-red-600">
                    Save {formatPriceBDT(discountPrice - price)}
                  </span>
                </div>
              ) : (
                <span className="text-xl font-bold text-gray-900">
                  {formatPriceBDT(price)}
                </span>
              )}
              <div className="text-xs text-gray-500">
                per {unit}
              </div>
            </div>
            
            {/* Stock Status */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`p-1 rounded-full ${getStockBgColor()}`}>
                    <Package size={14} className={getStockColor()} />
                  </div>
                  <span className={`text-sm font-medium ${getStockColor()}`}>
                    {getStockText()}
                </span>
                </div>
                
                {/* Stock Indicator */}
                {!isOutOfStock && (
                  <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${stockPercentage}%` }}
                      transition={{ duration: 1, delay: 0.2 }}
                      className={`h-full rounded-full ${
                        isLowStock ? 'bg-amber-500' : 'bg-green-500'
                      }`}
                    />
                  </div>
                )}
              </div>
              
              {/* Quick Info */}
              <div className="flex items-center gap-4 pt-2 border-t border-gray-100">
                <div className="flex items-center gap-1.5">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <svg
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(rating)
                            ? 'text-amber-400 fill-amber-400'
                            : 'text-gray-300'
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-xs text-gray-500">
                    {rating.toFixed(1)}
                  </span>
                </div>
                
                {/* Unit Info */}
                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                  <Check size={12} className="text-green-500" />
                  <span>1 {unit} available</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;