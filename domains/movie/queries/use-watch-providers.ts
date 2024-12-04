import { useQuery } from '@tanstack/react-query'

import { movieService } from '@/services'

import { movieKeys } from './keys'

export const useWatchProviders = (movieId: number) => {
  return useQuery({
    queryKey: movieKeys.watchProviders(movieId),
    queryFn: () => movieService.getMovieWatchProviders(movieId),
  })
}
