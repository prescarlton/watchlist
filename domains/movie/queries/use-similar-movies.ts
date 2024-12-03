import { useQuery } from '@tanstack/react-query'
import { movieKeys } from './keys'
import { movieService } from '@/services'

export const useSimilarMovies = (movieId: number) => {
  return useQuery({
    queryKey: movieKeys.similar(movieId),
    queryFn: () => movieService.getSimilarMovies(movieId),
  })
}
