// types/recipe.ts
export interface RecipeIngredient {
  ingredient: string;
  measure: string;
}

export interface Recipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strYoutube?: string;
  strTags?: string;
  ingredients: RecipeIngredient[];
}

export interface RecipeCardProps {
  recipe: Recipe;
  onSave: (id: string) => void;
  isSaved: boolean;
  onViewDetails: (recipe: Recipe) => void;
}