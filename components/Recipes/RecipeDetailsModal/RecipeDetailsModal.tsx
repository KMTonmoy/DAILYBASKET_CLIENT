"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Clock, Flame, Users, ShoppingCart, BookOpen, Heart, X } from "lucide-react";
import { Recipe } from "@/types/recipe";

interface RecipeDetailsModalProps {
  recipe: Recipe;
  isSaved: boolean;
  onSave: (id: string) => void;
  onClose: () => void;
}

const RecipeDetailsModal: React.FC<RecipeDetailsModalProps> = ({
  recipe,
  isSaved,
  onSave,
  onClose,
}) => {
  const getFlagIcon = (area: string) => {
    const flagMap: Record<string, string> = {
      "American": "🇺🇸",
      "British": "🇬🇧",
      "Canadian": "🇨🇦",
      "Chinese": "🇨🇳",
      "French": "🇫🇷",
      "Greek": "🇬🇷",
      "Indian": "🇮🇳",
      "Irish": "🇮🇪",
      "Italian": "🇮🇹",
      "Jamaican": "🇯🇲",
      "Japanese": "🇯🇵",
      "Mexican": "🇲🇽",
      "Polish": "🇵🇱",
      "Portuguese": "🇵🇹",
      "Russian": "🇷🇺",
      "Spanish": "🇪🇸",
      "Thai": "🇹🇭",
      "Turkish": "🇹🇷",
      "Vietnamese": "🇻🇳",
    };
    return flagMap[area] || "🌍";
  };

  const getAreaColor = (area: string) => {
    const colorMap: Record<string, string> = {
      "American": "bg-blue-100 text-blue-800",
      "British": "bg-red-100 text-red-800",
      "Indian": "bg-orange-100 text-orange-800",
      "Italian": "bg-green-100 text-green-800",
      "Mexican": "bg-red-100 text-red-800",
      "Chinese": "bg-red-100 text-red-800",
      "Japanese": "bg-red-100 text-red-800",
      "French": "bg-blue-100 text-blue-800",
    };
    return colorMap[area] || "bg-gray-100 text-gray-800";
  };

  const getPreparationTime = (recipeName: string) => {
    if (recipeName.toLowerCase().includes("cake") || recipeName.toLowerCase().includes("bake")) {
      return "60-90 min";
    } else if (recipeName.toLowerCase().includes("stew") || recipeName.toLowerCase().includes("roast")) {
      return "90-120 min";
    } else if (recipeName.toLowerCase().includes("pasta") || recipeName.toLowerCase().includes("rice")) {
      return "30-45 min";
    }
    return "20-40 min";
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/50 z-50"
      />
      
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl max-h-[90vh] bg-white rounded-2xl shadow-2xl z-50 overflow-hidden"
      >
        <div className="overflow-y-auto max-h-[90vh]">
          {/* Modal Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 z-10">
            <div className="flex items-center justify-between p-6">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-full ${getAreaColor(recipe.strArea)}`}>
                  <span className="text-lg">{getFlagIcon(recipe.strArea)}</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{recipe.strMeal}</h2>
                  <p className="text-gray-600">{recipe.strCategory} • {recipe.strArea} Cuisine</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="p-2 hover:bg-gray-100 rounded-full"
              >
                <X className="w-6 h-6 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Modal Content */}
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column - Image & Quick Info */}
              <div>
                <div className="relative h-64 lg:h-80 rounded-xl overflow-hidden mb-6">
                  <Image
                    src={recipe.strMealThumb || "/api/placeholder/400/300"}
                    alt={recipe.strMeal}
                    fill
                    className="object-cover"
                  />
                </div>
                
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 bg-green-50 rounded-xl">
                    <Clock className="w-6 h-6 text-green-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Prep Time</p>
                    <p className="font-bold text-gray-900">{getPreparationTime(recipe.strMeal)}</p>
                  </div>
                  <div className="text-center p-4 bg-blue-50 rounded-xl">
                    <Flame className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Difficulty</p>
                    <p className="font-bold text-gray-900">Medium</p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-xl">
                    <Users className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">Servings</p>
                    <p className="font-bold text-gray-900">4-6</p>
                  </div>
                </div>

                {recipe.strYoutube && (
                  <a
                    href={recipe.strYoutube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-3 bg-red-600 text-white rounded-xl hover:bg-red-700 transition-colors"
                  >
                    <span className="text-lg">▶️</span>
                    Watch Video Tutorial
                  </a>
                )}
              </div>

              {/* Right Column - Ingredients & Instructions */}
              <div>
                {/* Ingredients */}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <ShoppingCart className="w-5 h-5" />
                    Ingredients ({recipe.ingredients.length})
                  </h3>
                  <div className="space-y-2">
                    {recipe.ingredients.map((ing, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                      >
                        <span className="text-gray-700">{ing.ingredient}</span>
                        <span className="text-gray-900 font-medium">{ing.measure}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Instructions */}
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <BookOpen className="w-5 h-5" />
                    Instructions
                  </h3>
                  <div className="prose max-w-none">
                    <p className="text-gray-700 whitespace-pre-line">
                      {recipe.strInstructions}
                    </p>
                  </div>
                </div>
              </div>
            </div>
 
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default RecipeDetailsModal;