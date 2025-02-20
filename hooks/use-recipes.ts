// hooks/useRecipes.ts
import { useEffect, useState } from 'react';

interface Recipe {
  title: string;
  image: string;
}

export function useRecipes() {
  const [data, setData] = useState<Recipe[]>([]);
  const [isPending, setIsPending] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5002/api/recipes'); // Your backend endpoint
        const result = await response.json();
        setData(result.results); // Adjust based on your API response structure
        setIsPending(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setIsError(true);
        setIsPending(false);
      }
    };

    fetchData();
  }, []);

  return { data, isPending, isError };
}
