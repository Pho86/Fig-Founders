import { authRouter } from "./router/auth";
import { postRouter } from "./router/post";
import { recipeRouter } from "./router/recipe";
import { createTRPCRouter } from "./trpc";

export const appRouter = createTRPCRouter({
  auth: authRouter,
  post: postRouter,
  recipe: recipeRouter
});

// export type definition of API
export type AppRouter = typeof appRouter;
