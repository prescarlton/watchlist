import { useQuery } from '@tanstack/react-query'

import { movieService } from '@/services'

import { movieKeys } from './keys'

export const useGetPopularMovies = () => {
  return useQuery({
    queryKey: movieKeys.popular,
    queryFn: movieService.getPopularMovies,
  })
}
