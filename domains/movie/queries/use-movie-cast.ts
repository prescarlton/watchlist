import { useQuery } from '@tanstack/react-query'
import { movieKeys } from './keys'
import { movieService } from '@/services'

export const useMovieCast = (movieId: number) => {
  return useQuery({
    queryKey: movieKeys.cast(movieId),
    queryFn: () => movieService.getMovieCast(movieId),
  })
}
