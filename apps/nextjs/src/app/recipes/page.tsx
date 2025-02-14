import { HydrateClient } from "~/trpc/server";
import RecipeComponent from "../_components/recipe";


export default function RecipePage() {

  return (
    <HydrateClient>
      <main className="container h-screen py-16 px-4">
        <div className="flex flex-col items-center justify-center gap-4">
            <RecipeComponent />
        </div>
      </main>
    </HydrateClient>
  );
}