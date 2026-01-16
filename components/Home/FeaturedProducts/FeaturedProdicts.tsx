"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ProductCard from "@/components/Common/ProductCard/ProductCard";
import Link from "next/link";
import { productApi } from "@/lib/api";
import { Product } from "@/types/product";
import { Loader2 } from "lucide-react";

const FeaturedProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        setLoading(true);
        const featuredProducts = await productApi.getFeaturedProducts();
        setProducts(featuredProducts);
        setError(null);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please try again.");
        // Fallback to static data if API fails
        const fallbackProducts = [
          {
            id: 1,
            name: "Fresh Red Apples",
            slug: "fresh-red-apples",
            description: "Fresh, juicy red apples imported from Australia. Perfect for snacks and cooking.",
            images: ["/products/apples.jpg"],
            price: 180,
            originalPrice: 220,
            discountPercentage: 18,
            category: "Fruits",
            stock: 45,
            unit: "kg",
            rating: 4.5,
            reviewsCount: 128,
            isFeatured: true,
            isBestSeller: true,
            isNew: false,
            tags: ["fresh", "imported", "premium"],
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          },
          // Add more fallback products if needed
        ];
        setProducts(fallbackProducts as Product[]);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  if (loading) {
    return (
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center items-center h-64">
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="w-8 h-8 text-green-500 animate-spin" />
              <p className="text-gray-600">Loading featured products...</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error && products.length === 0) {
    return (
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-red-500 p-8">
            <p>{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured Products
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Discover our handpicked selection of premium quality groceries at competitive prices
          </p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <Link 
              key={product.id} 
              href={`/products/${product.id}`}
              className="block hover:no-underline"
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
                slug={product.slug}
              />
            </Link>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link href="/products">
            <button className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white font-medium rounded-full hover:shadow-lg transition-all duration-300 hover:scale-105">
              View All Products
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;