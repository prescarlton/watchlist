import { useQuery } from '@tanstack/react-query'

import { movieService } from '@/services'

import { movieKeys } from './keys'

export const useSearchMovies = (query: string) => {
  return useQuery({
    queryKey: movieKeys.search(query),
    queryFn: () => movieService.searchMovies(query),
  })
}
