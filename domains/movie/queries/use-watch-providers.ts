import { useQuery } from '@tanstack/react-query'
import { movieKeys } from './keys'
import { movieService } from '@/services'

export const useWatchProviders = (movieId: number) => {
  return useQuery({
    queryKey: movieKeys.watchProviders(movieId),
    queryFn: () => movieService.getMovieWatchProviders(movieId),
  })
}
