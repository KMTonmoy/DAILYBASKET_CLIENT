"use client";

import React, { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  ChefHat,
  Filter,
  X,
  Loader2,
  Utensils,
  Globe,
  AlertCircle,
} from "lucide-react";
import { Recipe } from "@/types/recipe";
import RecipeCard from "@/components/Recipes/RecipeCard/RecipeCard";
import RecipeDetailsModal from "@/components/Recipes/RecipeDetailsModal/RecipeDetailsModal";

const Recipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [filteredRecipes, setFilteredRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedArea, setSelectedArea] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [savedRecipes, setSavedRecipes] = useState<string[]>([]);
  const [showDetails, setShowDetails] = useState<Recipe | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [areas, setAreas] = useState<string[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [allAreas, setAllAreas] = useState<string[]>([]);
  const [allCategories, setAllCategories] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch ALL areas and categories from TheMealDB API
  useEffect(() => {
    const fetchData = async () => {
      try {
        setError(null);
        // Fetch all areas (cuisines)
        const areasRes = await fetch(
          "https://www.themealdb.com/api/json/v1/1/list.php?a=list"
        );
        const areasData = await areasRes.json();

        // Fetch all categories
        const categoriesRes = await fetch(
          "https://www.themealdb.com/api/json/v1/1/list.php?c=list"
        );
        const categoriesData = await categoriesRes.json();

        if (areasData.meals) {
          const allAreasList = areasData.meals.map((area: any) => area.strArea);
          setAllAreas(allAreasList);
          setAreas(["all", ...allAreasList]);
        }

        if (categoriesData.meals) {
          const allCategoriesList = categoriesData.meals.map(
            (cat: any) => cat.strCategory
          );
          setAllCategories(allCategoriesList);
          setCategories(["all", ...allCategoriesList]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load recipe data. Using fallback data.");
        const fallbackAreas = [
          "American",
          "British",
          "Canadian",
          "Chinese",
          "Croatian",
          "Dutch",
          "Egyptian",
          "French",
          "Greek",
          "Indian",
          "Irish",
          "Italian",
          "Jamaican",
          "Japanese",
          "Kenyan",
          "Malaysian",
          "Mexican",
          "Moroccan",
          "Polish",
          "Portuguese",
          "Russian",
          "Spanish",
          "Thai",
          "Tunisian",
          "Turkish",
          "Unknown",
          "Vietnamese",
        ];

        const fallbackCategories = [
          "Beef",
          "Breakfast",
          "Chicken",
          "Dessert",
          "Goat",
          "Lamb",
          "Miscellaneous",
          "Pasta",
          "Pork",
          "Seafood",
          "Side",
          "Starter",
          "Vegan",
          "Vegetarian",
        ];

        setAllAreas(fallbackAreas);
        setAreas(["all", ...fallbackAreas]);
        setAllCategories(fallbackCategories);
        setCategories(["all", ...fallbackCategories]);
      }
    };

    fetchData();
  }, []);

  // Parse recipe from API response
  const parseRecipe = (recipe: any): Recipe => {
    const ingredients: Array<{ ingredient: string; measure: string }> = [];
    for (let i = 1; i <= 20; i++) {
      const ingredient = recipe[`strIngredient${i}`];
      const measure = recipe[`strMeasure${i}`];

      if (ingredient && ingredient.trim() !== "") {
        ingredients.push({
          ingredient,
          measure: measure || "",
        });
      }
    }

    return {
      idMeal: recipe.idMeal,
      strMeal: recipe.strMeal,
      strMealThumb: recipe.strMealThumb,
      strCategory: recipe.strCategory,
      strArea: recipe.strArea || "Unknown",
      strInstructions: recipe.strInstructions || "No instructions available.",
      strYoutube: recipe.strYoutube,
      strTags: recipe.strTags,
      ingredients,
    };
  };

  // Fetch recipes by category
  const fetchRecipesByCategory = async (
    category: string
  ): Promise<Recipe[]> => {
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
      );
      const data = await response.json();

      if (data.meals && data.meals.length > 0) {
        const sampleRecipes = data.meals.slice(0, 2);
        const detailPromises = sampleRecipes.map(async (meal: any) => {
          try {
            const detailRes = await fetch(
              `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`
            );
            const detailData = await detailRes.json();

            if (detailData.meals && detailData.meals[0]) {
              return parseRecipe(detailData.meals[0]);
            }
          } catch (error) {
            console.error(`Error fetching details for ${meal.idMeal}:`, error);
            return null;
          }
          return null;
        });

        const recipes = await Promise.all(detailPromises);
        return recipes.filter(Boolean) as Recipe[];
      }
      return [];
    } catch (error) {
      console.error(`Error fetching ${category} recipes:`, error);
      return [];
    }
  };

  // Search recipes by name
  const searchRecipesByName = async (query: string): Promise<Recipe[]> => {
    try {
      const response = await fetch(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
      );
      const data = await response.json();

      if (data.meals && data.meals.length > 0) {
        const detailPromises = data.meals
          .slice(0, 12)
          .map(async (meal: any) => {
            try {
              const detailRes = await fetch(
                `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`
              );
              const detailData = await detailRes.json();

              if (detailData.meals && detailData.meals[0]) {
                return parseRecipe(detailData.meals[0]);
              }
            } catch (error) {
              console.error(
                `Error fetching details for ${meal.idMeal}:`,
                error
              );
              return null;
            }
            return null;
          });

        const recipes = await Promise.all(detailPromises);
        return recipes.filter(Boolean) as Recipe[];
      }
      return [];
    } catch (error) {
      console.error("Error searching recipes:", error);
      return [];
    }
  };

  // Fetch initial recipes
  const fetchInitialRecipes = async (): Promise<Recipe[]> => {
    const categoriesToFetch = ["Chicken", "Beef", "Seafood", "Vegetarian"];
    const recipePromises = categoriesToFetch.map((category) =>
      fetchRecipesByCategory(category)
    );
    const allRecipes = await Promise.all(recipePromises);
    const flattenedRecipes = allRecipes.flat();

    // Remove duplicates
    const uniqueRecipes = Array.from(
      new Map(
        flattenedRecipes.map((recipe) => [recipe.idMeal, recipe])
      ).values()
    );

    return uniqueRecipes;
  };

  // Load initial recipes
  useEffect(() => {
    const loadInitialRecipes = async () => {
      try {
        setLoading(true);
        const initialRecipes = await fetchInitialRecipes();
        setRecipes(initialRecipes);
        setFilteredRecipes(initialRecipes);
        setHasMore(true);
      } catch (error) {
        console.error("Error loading initial recipes:", error);
        setError("Failed to load recipes. Please try again.");
        setRecipes([]);
        setFilteredRecipes([]);
      } finally {
        setLoading(false);
      }
    };

    loadInitialRecipes();
  }, []);

  // Search functionality
  const handleSearch = useCallback(async () => {
    if (!searchQuery.trim()) {
      // If search is empty, show all recipes
      setFilteredRecipes(recipes);
      return;
    }

    try {
      setLoadingSearch(true);
      const searchResults = await searchRecipesByName(searchQuery);

      if (searchResults.length > 0) {
        // Combine with existing recipes and remove duplicates
        const allRecipes = [...recipes, ...searchResults];
        const uniqueRecipes = Array.from(
          new Map(allRecipes.map((recipe) => [recipe.idMeal, recipe])).values()
        );

        setRecipes(uniqueRecipes);
        setFilteredRecipes(searchResults);
      } else {
        setFilteredRecipes([]);
      }
    } catch (error) {
      console.error("Error searching:", error);
      setError("Failed to search recipes. Please try again.");
    } finally {
      setLoadingSearch(false);
    }
  }, [searchQuery, recipes]);

  // Load more recipes
  const loadMoreRecipes = async () => {
    if (loadingMore || !hasMore) return;

    try {
      setLoadingMore(true);
      const nextCategories = ["Dessert", "Pasta", "Breakfast", "Pork"];
      const startIndex = (page - 1) * 2;
      const categoriesToFetch = nextCategories.slice(
        startIndex,
        startIndex + 2
      );

      if (categoriesToFetch.length === 0) {
        setHasMore(false);
        return;
      }

      const recipePromises = categoriesToFetch.map((category) =>
        fetchRecipesByCategory(category)
      );
      const newRecipes = await Promise.all(recipePromises);
      const flattenedRecipes = newRecipes.flat();

      if (flattenedRecipes.length > 0) {
        // Filter out duplicates
        const existingIds = new Set(recipes.map((r) => r.idMeal));
        const uniqueNewRecipes = flattenedRecipes.filter(
          (recipe) => !existingIds.has(recipe.idMeal)
        );

        if (uniqueNewRecipes.length > 0) {
          setRecipes((prev) => [...prev, ...uniqueNewRecipes]);
          setFilteredRecipes((prev) => [...prev, ...uniqueNewRecipes]);
          setPage((prev) => prev + 1);
        } else {
          setHasMore(false);
        }
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error("Error loading more recipes:", error);
      setHasMore(false);
    } finally {
      setLoadingMore(false);
    }
  };

  // Apply filters
  useEffect(() => {
    let result = [...recipes];

    // Apply area filter
    if (selectedArea !== "all") {
      result = result.filter(
        (recipe) => recipe.strArea.toLowerCase() === selectedArea.toLowerCase()
      );
    }

    // Apply category filter
    if (selectedCategory !== "all") {
      result = result.filter(
        (recipe) =>
          recipe.strCategory.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Apply search filter locally if we have data
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (recipe) =>
          recipe.strMeal.toLowerCase().includes(query) ||
          recipe.strCategory.toLowerCase().includes(query) ||
          (recipe.strTags && recipe.strTags.toLowerCase().includes(query)) ||
          recipe.ingredients.some((ing) =>
            ing.ingredient.toLowerCase().includes(query)
          )
      );
    }

    setFilteredRecipes(result);
  }, [searchQuery, selectedArea, selectedCategory, recipes]);

  // Handle save recipe
  const handleSaveRecipe = (id: string) => {
    if (savedRecipes.includes(id)) {
      setSavedRecipes(savedRecipes.filter((recipeId) => recipeId !== id));
    } else {
      setSavedRecipes([...savedRecipes, id]);
    }
  };

  // Reset filters
  const resetFilters = () => {
    setSearchQuery("");
    setSelectedArea("all");
    setSelectedCategory("all");
    setShowFilters(false);
    setFilteredRecipes(recipes);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-white">
        <div className="text-center">
          <Loader2 className="w-12 h-12 text-green-500 animate-spin mx-auto" />
          <p className="mt-4 text-gray-600">Loading global recipes...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-500 via-emerald-600 to-green-700 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white/20 backdrop-blur-sm rounded-2xl">
                <ChefHat className="w-16 h-16" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Global Recipes
            </h1>
            <p className="text-xl text-green-100 max-w-3xl mx-auto">
              Discover authentic recipes from {allAreas.length}+ cuisines
              worldwide
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold">{allAreas.length}+</div>
                <div className="text-sm text-green-200">Cuisines</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">
                  {allCategories.length}+
                </div>
                <div className="text-sm text-green-200">Categories</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold">{recipes.length}+</div>
                <div className="text-sm text-green-200">Recipes</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
            <AlertCircle className="w-5 h-5 text-red-500" />
            <p className="text-red-700">{error}</p>
          </div>
        )}

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
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                  placeholder="Search recipes from around the world..."
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

            <div className="flex items-center gap-3">
              <button
                onClick={handleSearch}
                disabled={loadingSearch}
                className="flex items-center gap-2 px-4 py-3 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors disabled:opacity-50"
              >
                {loadingSearch ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Search className="w-5 h-5" />
                )}
                Search
              </button>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
              >
                <Filter className="w-5 h-5" />
                Filters
              </button>
            </div>
          </div>

          {/* Advanced Filters */}
          <AnimatePresence>
            {showFilters && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="overflow-hidden"
              >
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Cuisine Filter */}
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-3">
                        <span className="flex items-center gap-2">
                          <Globe className="w-4 h-4" />
                          Cuisine / Country
                        </span>
                      </label>
                      <div className="max-h-60 overflow-y-auto space-y-2">
                        <button
                          onClick={() => setSelectedArea("all")}
                          className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                            selectedArea === "all"
                              ? "bg-green-100 text-green-700"
                              : "hover:bg-gray-100 text-gray-700"
                          }`}
                        >
                          All Cuisines ({allAreas.length})
                        </button>
                        {areas.slice(1).map((area) => (
                          <button
                            key={area}
                            onClick={() => setSelectedArea(area)}
                            className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                              selectedArea === area
                                ? "bg-green-100 text-green-700"
                                : "hover:bg-gray-100 text-gray-700"
                            }`}
                          >
                            <span className="text-lg">🌍</span>
                            <span>{area}</span>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Category Filter */}
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-3">
                        <span className="flex items-center gap-2">
                          <Utensils className="w-4 h-4" />
                          Category
                        </span>
                      </label>
                      <div className="max-h-60 overflow-y-auto space-y-2">
                        <button
                          onClick={() => setSelectedCategory("all")}
                          className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                            selectedCategory === "all"
                              ? "bg-green-100 text-green-700"
                              : "hover:bg-gray-100 text-gray-700"
                          }`}
                        >
                          All Categories ({allCategories.length})
                        </button>
                        {categories.slice(1).map((category) => (
                          <button
                            key={category}
                            onClick={() => setSelectedCategory(category)}
                            className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg transition-colors ${
                              selectedCategory === category
                                ? "bg-green-100 text-green-700"
                                : "hover:bg-gray-100 text-gray-700"
                            }`}
                          >
                            <span className="text-lg">🍴</span>
                            <span>{category}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Filter Actions */}
                  <div className="mt-6 flex justify-end gap-3">
                    <button
                      onClick={resetFilters}
                      className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                    >
                      Reset Filters
                    </button>
                    <button
                      onClick={() => setShowFilters(false)}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Apply Filters
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Recipe Count */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {searchQuery || selectedArea !== "all" || selectedCategory !== "all"
              ? "Filtered Recipes"
              : "Popular Recipes"}
          </h2>
          <span className="text-gray-600">
            {filteredRecipes.length}{" "}
            {filteredRecipes.length === 1 ? "recipe" : "recipes"} found
          </span>
        </div>

        {/* Recipes Grid */}
        {filteredRecipes.length > 0 ? (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <AnimatePresence>
                {filteredRecipes.map((recipe) => (
                  <RecipeCard
                    key={recipe.idMeal}
                    recipe={recipe}
                    onSave={handleSaveRecipe}
                    isSaved={savedRecipes.includes(recipe.idMeal)}
                    onViewDetails={setShowDetails}
                  />
                ))}
              </AnimatePresence>
            </div>

            {/* Load More Button */}
            {hasMore &&
              !searchQuery &&
              selectedArea === "all" &&
              selectedCategory === "all" && (
                <div className="text-center mb-12">
                  <button
                    onClick={loadMoreRecipes}
                    disabled={loadingMore}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50"
                  >
                    {loadingMore ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Loading...
                      </>
                    ) : (
                      "Load More Recipes"
                    )}
                  </button>
                </div>
              )}
          </>
        ) : (
          <div className="text-center py-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 rounded-full mb-4">
              <ChefHat className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No recipes found
            </h3>
            <p className="text-gray-500">
              {searchQuery
                ? `No recipes found for "${searchQuery}"`
                : "Try adjusting your filters"}
            </p>
            <button
              onClick={resetFilters}
              className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </div>

      {/* Recipe Details Modal */}
      <AnimatePresence>
        {showDetails && (
          <RecipeDetailsModal
            recipe={showDetails}
            isSaved={savedRecipes.includes(showDetails.idMeal)}
            onSave={handleSaveRecipe}
            onClose={() => setShowDetails(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default Recipes;
