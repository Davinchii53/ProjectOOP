export interface Video {
  title: string;
  url: string;
}

export interface Recipe {
  name: string;
  difficulty: string;
  diet: string;
  kind_of_food: string;
  prep_time: string;
  cook_time: string;
  ingredients: string[];
  steps: string[];
  tips?: string[];
  video_data: Video[];
}

export interface RecipeResponse {
  data: Recipe;
}
