import { useQuery } from '@tanstack/react-query'

import { movieService } from '@/services'

import { movieKeys } from './keys'

export const useMovieCast = (movieId: number) => {
  return useQuery({
    queryKey: movieKeys.cast(movieId),
    queryFn: () => movieService.getMovieCast(movieId),
  })
}
