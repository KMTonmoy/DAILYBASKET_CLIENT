"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Clock, Users, Heart, BookOpen, Share2 } from "lucide-react";
import { RecipeCardProps } from "@/types/recipe";

const RecipeCard: React.FC<RecipeCardProps> = ({
  recipe,
  onSave,
  isSaved,
  onViewDetails,
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
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-xl transition-shadow duration-300"
    >
      {/* Recipe Image */}
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={recipe.strMealThumb || "/api/placeholder/400/300"}
          alt={recipe.strMeal}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        
        {/* Overlay Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Save Button */}
        <button
          onClick={() => onSave(recipe.idMeal)}
          className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full hover:bg-white transition-colors"
        >
          <Heart
            className={`w-5 h-5 ${
              isSaved ? "fill-red-500 text-red-500" : "text-gray-600"
            }`}
          />
        </button>
        
        {/* Cuisine Badge */}
        <div className="absolute top-3 left-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getAreaColor(recipe.strArea)}`}>
            <span className="mr-1">{getFlagIcon(recipe.strArea)}</span>
            {recipe.strArea}
          </span>
        </div>
        
        {/* Category Badge */}
        <div className="absolute bottom-3 left-3">
          <span className="px-2 py-1 bg-black/60 backdrop-blur-sm text-white text-xs font-medium rounded-full">
            {recipe.strCategory}
          </span>
        </div>
      </div>

      {/* Recipe Info */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-1">
          {recipe.strMeal}
        </h3>
        
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{getPreparationTime(recipe.strMeal)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            <span>4-6 servings</span>
          </div>
        </div>

        {/* Ingredients Preview */}
        <div className="mb-4">
          <p className="text-xs text-gray-500 mb-2">Key Ingredients:</p>
          <div className="flex flex-wrap gap-1">
            {recipe.ingredients.slice(0, 4).map((ing, idx) => (
              <span
                key={idx}
                className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full"
              >
                {ing.ingredient}
              </span>
            ))}
            {recipe.ingredients.length > 4 && (
              <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                +{recipe.ingredients.length - 4} more
              </span>
            )}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => onViewDetails(recipe)}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg hover:opacity-90 transition-opacity text-sm font-medium"
          >
            <BookOpen className="w-4 h-4" />
            View Recipe
          </button>
          <button className="p-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default RecipeCard;