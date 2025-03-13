import type { AxiosError } from 'axios';
import { createMutation } from 'react-query-kit';

import { client } from '../common';
import type { Ingredient } from './types';

type Variables = { name: string; quantity: number };
type Response = Ingredient;

export const useAddIngredient = createMutation<Response, Variables, AxiosError>(
  {
    mutationFn: async (variables) =>
      client({
        url: 'ingredients/add',
        method: 'POST',
        data: variables,
      }).then((response) => response.data),
  }
);
