import { useQuery } from '@tanstack/react-query'

import { movieService } from '@/services'

import { movieKeys } from './keys'

export const useTrendingMovies = () => {
  return useQuery({
    queryKey: movieKeys.trending(),
    queryFn: movieService.getTrendingMovies,
  })
}
