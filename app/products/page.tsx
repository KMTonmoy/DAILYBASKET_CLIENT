"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ProductCard from "@/components/Common/ProductCard/ProductCard";
import {
  Search,
  Filter,
  X,
  ChevronDown,
  Star,
  Tag,
  Truck,
  RefreshCw,
  TrendingUp,
  Package,
  Grid,
  List,
  Sliders,
  DollarSign,
  Clock,
  Award,
} from "lucide-react";
import { productApi } from "@/lib/api";
import { Product } from "@/types/product";

const Products = () => {
  // State management
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  
  // Filter states
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedSort, setSelectedSort] = useState<string>("popular");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 5000]);
  const [selectedRating, setSelectedRating] = useState<number>(0);
  const [showFilters, setShowFilters] = useState(false);
  
  // Categories
  const [categories, setCategories] = useState<string[]>([]);
  
  // Refs
  const observer = useRef<IntersectionObserver | null>(null);
  const lastProductRef = useRef<HTMLDivElement>(null);

  // Fetch initial data
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const allProducts = await productApi.getAllProducts();
        setProducts(allProducts);
        setFilteredProducts(allProducts);
        
        // Extract unique categories
        const uniqueCategories = Array.from(
          new Set(allProducts.map((p) => p.category))
        );
        setCategories(["all", ...uniqueCategories]);
        
        // Calculate max price
        const maxPrice = Math.max(...allProducts.map((p) => p.price));
        setPriceRange([0, maxPrice]);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Infinite scroll observer
  useEffect(() => {
    if (loading || !hasMore) return;

    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore) {
          loadMoreProducts();
        }
      },
      { threshold: 0.1 }
    );

    if (lastProductRef.current) {
      observer.current.observe(lastProductRef.current);
    }

    return () => {
      if (observer.current) observer.current.disconnect();
    };
  }, [loading, hasMore, filteredProducts]);

  const loadMoreProducts = async () => {
    try {
      setLoadingMore(true);
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));
      
      // In a real app, you would fetch next page from API
      const nextPageProducts = products.slice(
        page * 12,
        (page + 1) * 12
      );
      
      if (nextPageProducts.length > 0) {
        setFilteredProducts((prev) => [...prev, ...nextPageProducts]);
        setPage((prev) => prev + 1);
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error loading more products:", error);
    } finally {
      setLoadingMore(false);
    }
  };

  // Apply filters
  const applyFilters = useCallback(() => {
    let result = [...products];

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    // Apply category filter
    if (selectedCategory !== "all") {
      result = result.filter(
        (product) => product.category === selectedCategory
      );
    }

    // Apply price filter
    result = result.filter(
      (product) => product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Apply rating filter
    if (selectedRating > 0) {
      result = result.filter((product) => product.rating >= selectedRating);
    }

    // Apply sorting
    switch (selectedSort) {
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        result.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case "popular":
        result.sort((a, b) => b.reviewsCount - a.reviewsCount);
        break;
      default:
        break;
    }

    setFilteredProducts(result);
    setPage(1);
    setHasMore(true);
  }, [products, searchQuery, selectedCategory, priceRange, selectedRating, selectedSort]);

  // Apply filters when dependencies change
  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  // Reset filters
  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedSort("popular");
    setPriceRange([0, Math.max(...products.map((p) => p.price))]);
    setSelectedRating(0);
    setShowFilters(false);
  };

  // Get product statistics
  const getStats = () => {
    const totalProducts = filteredProducts.length;
    const totalPrice = filteredProducts.reduce((sum, p) => sum + p.price, 0);
    const avgRating = totalProducts > 0 
      ? filteredProducts.reduce((sum, p) => sum + p.rating, 0) / totalProducts 
      : 0;
    const inStockCount = filteredProducts.filter(p => p.stock > 0).length;
    
    return { totalProducts, totalPrice, avgRating, inStockCount };
  };

  const stats = getStats();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
  
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
   
        {/* Search and Filter Bar */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Search Bar */}
            <div className="flex-1">
              <div className="relative">
                 <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search products by name, description, or tags..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery("")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded-lg ${
                  viewMode === "grid"
                    ? "bg-green-100 text-green-600"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <Grid className="w-5 h-5" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded-lg ${
                  viewMode === "list"
                    ? "bg-green-100 text-green-600"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <List className="w-5 h-5" />
              </button>
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                <Filter className="w-5 h-5" />
                Filters
              </button>
            </div>
          </div>

          {/* Advanced Filters (Collapsible) */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    {/* Category Filter */}
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">
                        Category
                      </label>
                      <div className="space-y-2 max-h-60 overflow-y-auto">
                        {categories.map((category) => (
                          <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                              selectedCategory === category
                                ? "bg-green-100 text-green-700"
                                : "hover:bg-gray-100 text-gray-700"
                            }`}
                          >
                            <div className="flex items-center justify-between">
                              <span className="capitalize">{category}</span>
                              {selectedCategory === category && (
                                <Check className="w-4 h-4" />
                              )}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Price Range */}
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">
                        Price Range: ৳{priceRange[0]} - ৳{priceRange[1]}
                      </label>
                      <div className="space-y-4">
                        <input
                          type="range"
                          min="0"
                          max={Math.max(...products.map((p) => p.price))}
                          value={priceRange[0]}
                          onChange={(e) =>
                            setPriceRange([parseInt(e.target.value), priceRange[1]])
                          }
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                        <input
                          type="range"
                          min="0"
                          max={Math.max(...products.map((p) => p.price))}
                          value={priceRange[1]}
                          onChange={(e) =>
                            setPriceRange([priceRange[0], parseInt(e.target.value)])
                          }
                          className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                        />
                        <div className="flex justify-between text-sm text-gray-600">
                          <span>Min: ৳{priceRange[0]}</span>
                          <span>Max: ৳{priceRange[1]}</span>
                        </div>
                      </div>
                    </div>

                    {/* Rating Filter */}
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">
                        Minimum Rating
                      </label>
                      <div className="space-y-2">
                        {[4, 3, 2, 1].map((rating) => (
                          <button
                            key={rating}
                            onClick={() => setSelectedRating(selectedRating === rating ? 0 : rating)}
                            className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                              selectedRating >= rating
                                ? "bg-amber-100 text-amber-700"
                                : "hover:bg-gray-100 text-gray-700"
                            }`}
                          >
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-4 h-4 ${
                                    i < rating
                                      ? selectedRating >= rating
                                        ? "text-amber-400 fill-amber-400"
                                        : "text-gray-300"
                                      : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <span>& above</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Sort Options */}
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">
                        Sort By
                      </label>
                      <div className="space-y-2">
                        {[
                          { id: "popular", label: "Most Popular", icon: TrendingUp },
                          { id: "rating", label: "Highest Rated", icon: Star },
                          { id: "price-low", label: "Price: Low to High", icon: DollarSign },
                          { id: "price-high", label: "Price: High to Low", icon: DollarSign },
                          { id: "newest", label: "Newest First", icon: Clock },
                        ].map((option) => (
                          <button
                            key={option.id}
                            onClick={() => setSelectedSort(option.id)}
                            className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                              selectedSort === option.id
                                ? "bg-blue-100 text-blue-700"
                                : "hover:bg-gray-100 text-gray-700"
                            }`}
                          >
                            <option.icon className="w-4 h-4" />
                            <span>{option.label}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Filter Actions */}
                  <div className="mt-6 flex justify-between">
                    <button
                      onClick={resetFilters}
                      className="flex items-center gap-2 px-4 py-2 text-gray-600 hover:text-gray-900"
                    >
                      <RefreshCw className="w-4 h-4" />
                      Reset All Filters
                    </button>
                    <button
                      onClick={() => setShowFilters(false)}
                      className="px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800"
                    >
                      Apply Filters
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Active Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {selectedCategory !== "all" && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
              Category: {selectedCategory}
              <button onClick={() => setSelectedCategory("all")}>
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {searchQuery && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
              Search: {searchQuery}
              <button onClick={() => setSearchQuery("")}>
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {selectedRating > 0 && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-amber-100 text-amber-800 rounded-full text-sm">
              Rating: {selectedRating}+
              <button onClick={() => setSelectedRating(0)}>
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
          {(priceRange[0] > 0 || priceRange[1] < Math.max(...products.map((p) => p.price))) && (
            <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm">
              Price: ৳{priceRange[0]} - ৳{priceRange[1]}
              <button onClick={() => setPriceRange([0, Math.max(...products.map((p) => p.price))])}>
                <X className="w-3 h-3" />
              </button>
            </span>
          )}
        </div>

        {/* Products Grid/List */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No products found
            </h3>
            <p className="text-gray-600 mb-6">
              Try adjusting your filters or search term
            </p>
            <button
              onClick={resetFilters}
              className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <>
            {/* Grid View */}
            {viewMode === "grid" ? (
              <motion.div
                layout
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    ref={index === filteredProducts.length - 1 ? lastProductRef : null}
                  >
                    <ProductCard
                      id={product.id}
                      name={product.name}
                      description={product.description}
                      image={product.images[0]}
                      price={product.price}
                      discountPrice={product.originalPrice}
                      category={product.category}
                      stock={product.stock}
                      unit={product.unit}
                      rating={product.rating}
                      isTrending={product.isBestSeller}
                    />
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              /* List View */
              <div className="space-y-4">
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    ref={index === filteredProducts.length - 1 ? lastProductRef : null}
                  >
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="md:w-48">
                          <div className="relative h-48 w-full rounded-xl overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                              <Package className="w-12 h-12 text-gray-300" />
                            </div>
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full mb-2">
                                {product.category}
                              </span>
                              <h3 className="text-xl font-bold text-gray-900 mb-2">
                                {product.name}
                              </h3>
                              <p className="text-gray-600 mb-4 line-clamp-2">
                                {product.description}
                              </p>
                            </div>
                            <div className="text-right">
                              <div className="text-2xl font-bold text-gray-900">
                                ৳{product.price.toLocaleString()}
                              </div>
                              {product.originalPrice && (
                                <div className="text-sm text-gray-400 line-through">
                                  ৳{product.originalPrice.toLocaleString()}
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center justify-between mt-4">
                            <div className="flex items-center gap-4">
                              <div className="flex items-center gap-1">
                                <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                                <span className="text-sm text-gray-600">
                                  {product.rating.toFixed(1)}
                                </span>
                              </div>
                              <div className="flex items-center gap-1">
                                <Package className="w-4 h-4 text-green-600" />
                                <span className="text-sm text-gray-600">
                                  {product.stock} in stock
                                </span>
                              </div>
                            </div>
                            <button className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                              View Details
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {/* Loading More Indicator */}
            {loadingMore && (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-500 mx-auto"></div>
                <p className="mt-2 text-gray-600">Loading more products...</p>
              </div>
            )}

            {/* No More Products */}
            {!hasMore && filteredProducts.length > 0 && (
              <div className="text-center py-8">
                <p className="text-gray-600">
                  You've reached the end! No more products to show.
                </p>
              </div>
            )}
          </>
        )}
      </div>

      {/* Quick Stats Bar */}
      <div className="fixed bottom-4 right-4 z-50">
        <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-200">
          <div className="flex items-center gap-4">
            <div className="text-center">
              <div className="text-lg font-bold text-gray-900">{filteredProducts.length}</div>
              <div className="text-xs text-gray-600">Showing</div>
            </div>
            <div className="h-8 w-px bg-gray-200"></div>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="px-3 py-1 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 text-sm"
            >
              Top ↑
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Helper components
const Check = ({ className }: { className?: string }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 20 20">
    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
  </svg>
);

export default Products;