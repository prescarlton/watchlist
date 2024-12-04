import { useQuery } from '@tanstack/react-query'

import { movieService } from '@/services'

import { movieKeys } from './keys'

export const useMovieDetails = (movieId: number) => {
  return useQuery({
    queryKey: movieKeys.details(movieId),
    queryFn: () => movieService.getMovieById(movieId),
  })
}
