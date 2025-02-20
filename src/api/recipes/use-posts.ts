import type { AxiosError } from 'axios';
import { createQuery } from 'react-query-kit';

import { client } from '../common';
import type { Recipe } from './types';

type Response = Recipe[]; // Update to match the API response
type Variables = void; // No variables needed for now

export const usePosts = createQuery<Response, Variables, AxiosError>({
  queryKey: ['recipes'],
  fetcher: () => {
    return client.get('/api/recipes').then((response) => response.data.results); // Extract `results` from the API response
  },
});
