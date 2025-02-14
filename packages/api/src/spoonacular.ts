// services/spoonacular.ts
import axios from 'axios';
import type { RecipeSchema } from '@mooked/db/schema';

const SPOONACULAR_API_KEY = process.env.SPOONACULAR_API_KEY;

export const searchRecipes = async (query: string): Promise<typeof RecipeSchema[]> => {
    try {
        const response = await axios.get<{ results: typeof RecipeSchema[] }>('https://api.spoonacular.com/recipes/complexSearch', {
            params: {
                apiKey: SPOONACULAR_API_KEY,
                query,
                addRecipeInformation: true,
                addRecipeInstructions: true,
            },
        });

        return response.data.results;
    } catch {
        throw new Error('Failed to fetch recipes from Spoonacular');
    }
};