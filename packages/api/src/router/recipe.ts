import { publicProcedure } from '../trpc';
import { searchRecipes } from '../spoonacular';
import { z } from 'zod';
import type { TRPCRouterRecord } from '@trpc/server';
import type { RecipeSchema } from '@mooked/db/schema';

export const recipeRouter = {
    search: publicProcedure
        .input(z.object({ query: z.string() })) // Define input schema
        .query(async ({ input }) => {
            const { query } = input;

            try {
                // Fetch recipes from Spoonacular
                const recipes: typeof RecipeSchema[] = await searchRecipes(query);

                return recipes;
            } catch (error) {
                // Handle errors more safely
                const message = error instanceof Error ? error.message : 'Failed to search recipes';
                throw new Error(message);
            }
        }),
} satisfies TRPCRouterRecord;