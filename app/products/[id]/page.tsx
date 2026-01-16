"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Star,
  ShoppingCart,
  Heart,
  Truck,
  Shield,
  Package,
  Check,
  ArrowLeft,
  Plus,
  Minus,
  ChevronRight,
  Share2,
  RefreshCw,
  Tag,
  Award,
} from "lucide-react";
import ProductCard from "@/components/Common/ProductCard/ProductCard";

const ProductDetailsPage = () => {
  // Dummy product data
  const product = {
    id: 1,
    name: "Fresh Organic Apples",
    description:
      "Premium quality organic apples imported from Australia. Perfect for snacks and cooking.",
    longDescription:
      "These organic apples are grown without any pesticides or chemical fertilizers. They are crisp, juicy, and rich in antioxidants. Perfect for eating fresh, making juices, or using in desserts.",
    images: [
      "https://delivisor.com/wp-content/uploads/2024/12/apple-harvest-in-the-garden-selective-focus-2023-11-27-04-53-15-utc-1200x755.jpg",
      "https://media.istockphoto.com/id/187420397/photo/red-apples.jpg?s=612x612&w=0&k=20&c=2gP5VblBy8wBB1aMuB9godHm_QYuKOdvb1U_f9h4Kjk=",
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHXDW9PFwYGQcHZs0rFYYKKF76un14axIhgw&s",
      "https://5.imimg.com/data5/NC/NP/MY-50125407/apple-500x500.jpg",
    ],
    price: 180,
    originalPrice: 220,
    category: "Fruits",
    stock: 45,
    unit: "kg",
    weight: "1 kg",
    rating: 4.5,
    reviewsCount: 128,
    isBestSeller: true,
    brand: "Organic Farms",
    expiryDate: "2024-12-30",
    tags: ["organic", "fresh", "imported", "premium"],
    nutritionalInfo: {
      calories: 52,
      protein: "0.3g",
      carbs: "14g",
      fat: "0.2g",
    },
  };

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [activeTab, setActiveTab] = useState<
    "description" | "reviews" | "nutrition"
  >("description");

  const formatPriceBDT = (amount: number) => {
    return `৳${amount.toLocaleString("en-BD")}`;
  };

  const calculateTotalPrice = () => {
    return product.price * quantity;
  };

  const handleQuantityChange = (type: "increase" | "decrease") => {
    if (type === "increase" && quantity < product.stock) {
      setQuantity(quantity + 1);
    } else if (type === "decrease" && quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const discountPercentage = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  // Dummy related products
  const relatedProducts = [
    {
      id: 2,
      name: "Fresh Bananas",
      price: 60,
      category: "Fruits",
      stock: 80,
      unit: "dozen",
      rating: 4.3,
    },
    {
      id: 3,
      name: "Sweet Oranges",
      price: 120,
      category: "Fruits",
      stock: 35,
      unit: "kg",
      rating: 4.6,
    },
    {
      id: 4,
      name: "Fresh Grapes",
      price: 250,
      category: "Fruits",
      stock: 20,
      unit: "kg",
      rating: 4.4,
    },
    {
      id: 5,
      name: "Ripe Mangoes",
      price: 150,
      category: "Fruits",
      stock: 15,
      unit: "kg",
      rating: 4.7,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb Navigation */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center space-x-2 text-sm text-gray-600">
            <Link href="/" className="hover:text-green-600 transition-colors">
              Home
            </Link>
            <ChevronRight className="w-4 h-4" />
            <Link
              href="/products"
              className="hover:text-green-600 transition-colors"
            >
              Products
            </Link>
            <ChevronRight className="w-4 h-4" />
            <span className="text-gray-900 font-medium truncate">
              {product.name}
            </span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Product Main Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          {/* Left Column - Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <div className="relative h-80 md:h-96 rounded-xl overflow-hidden">
                <Image
                  src={product.images[selectedImage]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                
                {/* Discount Badge */}
                {discountPercentage > 0 && (
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1.5 bg-gradient-to-r from-red-500 to-pink-600 text-white text-sm font-bold rounded-lg shadow-lg">
                      -{discountPercentage}% OFF
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Thumbnail Images */}
            <div className="flex space-x-4 overflow-x-auto pb-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    selectedImage === index
                      ? "border-green-500 ring-2 ring-green-500/20"
                      : "border-gray-200 hover:border-green-300"
                  }`}
                >
                  <Image
                    src={image}
                    alt={`${product.name} - ${index + 1}`}
                    fill
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Column - Product Info */}
          <div className="space-y-6">
            {/* Category & Title */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-3 py-1 bg-green-100 text-green-800 text-sm font-medium rounded-full">
                  {product.category}
                </span>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className={`p-2 rounded-full ${
                      isWishlisted
                        ? "bg-red-50 text-red-500"
                        : "bg-gray-100 text-gray-600 hover:bg-red-50 hover:text-red-500"
                    } transition-colors`}
                  >
                    <Heart
                      className={`w-5 h-5 ${
                        isWishlisted ? "fill-red-500" : ""
                      }`}
                    />
                  </button>
                  <button className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition-colors">
                    <Share2 className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <h1 className="text-3xl font-bold text-gray-900 mb-3">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center space-x-3 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? "text-amber-400 fill-amber-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-600">
                  {product.rating.toFixed(1)} • {product.reviewsCount} reviews
                </span>
                {product.isBestSeller && (
                  <span className="flex items-center gap-1 px-2 py-1 bg-amber-100 text-amber-800 text-xs font-medium rounded">
                    <Award className="w-3 h-3" />
                    Best Seller
                  </span>
                )}
              </div>
            </div>

            {/* Price Section */}
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center flex-wrap gap-3 mb-2">
                <span className="text-4xl font-bold text-gray-900">
                  {formatPriceBDT(product.price)}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-xl text-gray-400 line-through">
                      {formatPriceBDT(product.originalPrice)}
                    </span>
                    <span className="px-3 py-1 bg-red-100 text-red-800 font-bold rounded-full">
                      Save{" "}
                      {formatPriceBDT(product.originalPrice - product.price)}
                    </span>
                  </>
                )}
              </div>
              <p className="text-gray-500 text-sm">Per {product.unit}</p>

              {/* Stock Status */}
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="p-1.5 rounded-full bg-green-100">
                    <Package className="w-4 h-4 text-green-600" />
                  </div>
                  <span className="font-medium text-green-700">
                    In Stock • {product.stock} available
                  </span>
                </div>

                {/* Stock Progress Bar */}
                <div className="w-32 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-green-500"
                    style={{
                      width: `${Math.min((product.stock / 100) * 100, 100)}%`,
                    }}
                  />
                </div>
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="bg-white rounded-xl p-6 border border-gray-100 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <span className="font-medium text-gray-900">Quantity</span>
                <span className="text-sm text-gray-500">
                  Max: {product.stock} {product.unit}s
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center border border-gray-200 rounded-lg">
                    <button
                      onClick={() => handleQuantityChange("decrease")}
                      disabled={quantity <= 1}
                      className="p-3 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-6 py-3 text-lg font-medium w-16 text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange("increase")}
                      disabled={quantity >= product.stock}
                      className="p-3 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="text-sm text-gray-600">
                    {product.unit} × {quantity} ={" "}
                    <span className="font-bold text-gray-900">
                      {formatPriceBDT(calculateTotalPrice())}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-sm text-gray-500 mb-1">Total Price</div>
                  <div className="text-2xl font-bold text-gray-900">
                    {formatPriceBDT(calculateTotalPrice())}
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button className="flex items-center justify-center gap-3 py-4 rounded-xl font-bold text-lg bg-gradient-to-r from-green-500 to-emerald-600 text-white hover:shadow-lg hover:scale-[1.02] active:scale-95 transition-all">
                <ShoppingCart className="w-5 h-5" />
                Add to Cart
              </button>

              <button className="flex items-center justify-center gap-3 py-4 rounded-xl font-bold text-lg border-2 border-green-500 text-green-600 hover:bg-green-50 transition-colors">
                <Check className="w-5 h-5" />
                Buy Now
              </button>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Truck className="w-5 h-5 text-green-600" />
                <div>
                  <p className="font-medium text-gray-900 text-sm">
                    Free Delivery
                  </p>
                  <p className="text-xs text-gray-500">Order above ৳500</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <RefreshCw className="w-5 h-5 text-blue-600" />
                <div>
                  <p className="font-medium text-gray-900 text-sm">
                    Easy Returns
                  </p>
                  <p className="text-xs text-gray-500">7 Days Return</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Shield className="w-5 h-5 text-purple-600" />
                <div>
                  <p className="font-medium text-gray-900 text-sm">Quality</p>
                  <p className="text-xs text-gray-500">100% Guaranteed</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Tag className="w-5 h-5 text-amber-600" />
                <div>
                  <p className="font-medium text-gray-900 text-sm">
                    Best Price
                  </p>
                  <p className="text-xs text-gray-500">Price Match</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-12">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab("description")}
                className={`py-4 px-2 font-medium text-sm border-b-2 transition-colors ${
                  activeTab === "description"
                    ? "border-green-500 text-green-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                Description
              </button>
              <button
                onClick={() => setActiveTab("nutrition")}
                className={`py-4 px-2 font-medium text-sm border-b-2 transition-colors ${
                  activeTab === "nutrition"
                    ? "border-green-500 text-green-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                Nutritional Info
              </button>
              <button
                onClick={() => setActiveTab("reviews")}
                className={`py-4 px-2 font-medium text-sm border-b-2 transition-colors ${
                  activeTab === "reviews"
                    ? "border-green-500 text-green-600"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                Reviews ({product.reviewsCount})
              </button>
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === "description" && (
              <div className="space-y-4">
                <p className="text-gray-600">{product.longDescription}</p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="font-medium text-gray-900">Brand</p>
                    <p className="text-gray-600">{product.brand}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="font-medium text-gray-900">Weight</p>
                    <p className="text-gray-600">{product.weight}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="font-medium text-gray-900">Expiry Date</p>
                    <p className="text-gray-600">{product.expiryDate}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="font-medium text-gray-900">Tags</p>
                    <div className="flex flex-wrap gap-2">
                      {product.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "nutrition" && (
              <div className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="bg-green-50 rounded-xl p-4 text-center">
                    <p className="text-2xl font-bold text-green-700">
                      {product.nutritionalInfo.calories}
                    </p>
                    <p className="text-sm text-green-600">Calories</p>
                  </div>
                  <div className="bg-blue-50 rounded-xl p-4 text-center">
                    <p className="text-2xl font-bold text-blue-700">
                      {product.nutritionalInfo.protein}
                    </p>
                    <p className="text-sm text-blue-600">Protein</p>
                  </div>
                  <div className="bg-amber-50 rounded-xl p-4 text-center">
                    <p className="text-2xl font-bold text-amber-700">
                      {product.nutritionalInfo.carbs}
                    </p>
                    <p className="text-sm text-amber-600">Carbs</p>
                  </div>
                  <div className="bg-red-50 rounded-xl p-4 text-center">
                    <p className="text-2xl font-bold text-red-700">
                      {product.nutritionalInfo.fat}
                    </p>
                    <p className="text-sm text-red-600">Fat</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="text-center">
                    <p className="text-5xl font-bold text-gray-900">
                      {product.rating.toFixed(1)}
                    </p>
                    <div className="flex items-center justify-center my-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < Math.floor(product.rating)
                              ? "text-amber-400 fill-amber-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-gray-600">
                      {product.reviewsCount} reviews
                    </p>
                  </div>
                </div>

                {/* Review Placeholder */}
                <div className="border rounded-lg p-4">
                  <p className="text-gray-600 text-center">
                    Reviews will be displayed here. Customers can share their
                    experiences with this product.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Related Products
            </h2>
            <Link
              href={`/category/${product.category
                .toLowerCase()
                .replace(/\s+/g, "-")}`}
              className="flex items-center gap-2 text-green-600 hover:text-green-700 font-medium"
            >
              View All
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((relatedProduct) => (
              <div key={relatedProduct.id} className="group">
                <div className="bg-white rounded-xl p-4 border border-gray-100 shadow-sm hover:shadow-md transition-shadow cursor-pointer">
                  <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg mb-4 flex items-center justify-center">
                    <Package className="w-12 h-12 text-gray-300" />
                  </div>
                  <h3 className="font-medium text-gray-900 group-hover:text-green-600 transition-colors">
                    {relatedProduct.name}
                  </h3>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="font-bold text-green-600">
                      {formatPriceBDT(relatedProduct.price)}
                    </span>
                    <span className="text-sm text-gray-500">
                      per {relatedProduct.unit}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Cart Summary (Fixed on mobile) */}
        <div className="lg:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">Total</p>
              <p className="text-xl font-bold text-gray-900">
                {formatPriceBDT(calculateTotalPrice())}
              </p>
            </div>
            <button className="px-6 py-3 rounded-lg font-bold bg-green-600 text-white hover:bg-green-700">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;