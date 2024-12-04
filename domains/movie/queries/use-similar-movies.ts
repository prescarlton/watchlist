import { useQuery } from '@tanstack/react-query'

import { movieService } from '@/services'

import { movieKeys } from './keys'

export const useSimilarMovies = (movieId: number) => {
  return useQuery({
    queryKey: movieKeys.similar(movieId),
    queryFn: () => movieService.getSimilarMovies(movieId),
  })
}
