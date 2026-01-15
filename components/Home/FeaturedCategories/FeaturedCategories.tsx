"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Carrot,
  Apple,
  Fish,
  Wheat,
  Milk,
  Coffee,
  ChefHat,
  ShoppingBag,
  ArrowRight,
  Droplets,
} from "lucide-react";
import Link from "next/link";

const FeaturedCategories = () => {
  const categories = [
    {
      id: 1,
      name: "Fresh Vegetables",
      icon: Carrot,
      itemCount: "80+ items",
      color: "from-emerald-500 to-green-600",
      bgColor: "bg-emerald-50",
      iconColor: "text-white", // Changed to white for better contrast
      popularItems: ["Potato", "Onion", "Tomato", "Cabbage"],
    },
    {
      id: 2,
      name: "Fresh Fruits",
      icon: Apple,
      itemCount: "120+ items",
      color: "from-red-500 to-rose-600",
      bgColor: "bg-red-50",
      iconColor: "text-white", // Changed to white
      popularItems: ["Apple", "Banana", "Orange", "Mango"],
    },
    {
      id: 3,
      name: "Dairy & Eggs",
      icon: Milk,
      itemCount: "45+ items",
      color: "from-blue-500 to-cyan-600",
      bgColor: "bg-blue-50",
      iconColor: "text-white", // Changed to white
      popularItems: ["Milk", "Eggs", "Butter", "Cheese"],
    },
    {
      id: 4,
      name: "Meat & Fish",
      icon: Fish,
      itemCount: "60+ items",
      color: "from-pink-500 to-rose-600",
      bgColor: "bg-pink-50",
      iconColor: "text-white", // Changed to white
      popularItems: ["Chicken", "Fish", "Mutton", "Beef"],
    },
    {
      id: 5,
      name: "Rice & Grains",
      icon: Wheat,
      itemCount: "35+ items",
      color: "from-amber-500 to-orange-600",
      bgColor: "bg-amber-50",
      iconColor: "text-white", // Changed to white
      popularItems: ["Rice", "Wheat", "Lentils", "Flour"],
    },
    {
      id: 6,
      name: "Cooking Oil",
      icon: Droplets, // Changed to more suitable icon
      itemCount: "25+ items",
      color: "from-purple-500 to-indigo-600",
      bgColor: "bg-purple-50",
      iconColor: "text-white", // Changed to white
      popularItems: ["Soybean", "Mustard", "Sunflower", "Olive"],
    },
    {
      id: 7,
      name: "Noodles & Pasta",
      icon: ChefHat,
      itemCount: "40+ items",
      color: "from-orange-500 to-red-600",
      bgColor: "bg-orange-50",
      iconColor: "text-white", // Changed to white
      popularItems: ["Instant", "Pasta", "Ramen", "Vermicelli"],
    },
    {
      id: 8,
      name: "Spices & Masala",
      icon: Coffee,
      itemCount: "55+ items",
      color: "from-red-500 to-amber-600",
      bgColor: "bg-red-50",
      iconColor: "text-white", // Changed to white
      popularItems: ["Turmeric", "Chili", "Cumin", "Coriander"],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  return (
    <section className="py-12 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-10">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 mb-4"
          >
            <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center">
              <ShoppingBag className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
              Shop by Category
            </h2>
          </motion.div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Browse through our wide range of fresh groceries and daily
            essentials
          </p>
        </div>

        {/* Categories Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {categories.map((category) => (
            <motion.div
              key={category.id}
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Link
                href={`/category/${category.name
                  .toLowerCase()
                  .replace(/ & /g, "-")
                  .replace(/ /g, "-")}`}
              >
                <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 cursor-pointer h-full">
                  {/* Icon Container */}
                  <div className="mb-5">
                    <div
                      className={`p-4 rounded-2xl ${category.bgColor} w-fit mb-4 group-hover:scale-105 transition-transform`}
                    >
                      {/* Gradient Icon Background */}
                      <div
                        className={`p-4 rounded-xl bg-gradient-to-r ${category.color} shadow-lg flex items-center justify-center`}
                      >
                        <category.icon
                          className={`w-8 h-8 ${category.iconColor}`}
                        />
                      </div>
                    </div>

                    {/* Category Name */}
                    <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors">
                      {category.name}
                    </h3>

                    {/* Item Count */}
                    <p className="text-sm text-gray-500 mb-4">
                      {category.itemCount}
                    </p>
                  </div>

                  {/* Popular Items */}
                  <div className="mt-4 pt-4 border-t border-gray-100">
                    <p className="text-xs text-gray-500 mb-2">Popular items:</p>
                    <div className="flex flex-wrap gap-2">
                      {category.popularItems.map((item, index) => (
                        <span
                          key={index}
                          className="text-xs px-3 py-1.5 rounded-full bg-gray-50 text-gray-700 hover:bg-green-50 hover:text-green-700 transition-colors"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* View Button */}
                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-sm font-medium text-green-600 group-hover:text-green-700">
                      Shop Now
                    </span>
                    <ArrowRight className="w-4 h-4 text-gray-400 group-hover:text-green-600 group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default FeaturedCategories;
