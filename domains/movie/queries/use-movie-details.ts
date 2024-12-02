import { useQuery } from '@tanstack/react-query'
import { movieKeys } from './keys'
import { movieService } from '@/services'

export const useMovieDetails = (movieId: number) => {
  return useQuery({
    queryKey: movieKeys.details(movieId),
    queryFn: () => movieService.getMovieById(movieId),
  })
}
