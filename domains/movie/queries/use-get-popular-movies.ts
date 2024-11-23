import { movieService } from '@/services'
import { useQuery } from '@tanstack/react-query'
import { movieKeys } from './keys'

export const useGetPopularMovies = () => {
  return useQuery({
    queryKey: movieKeys.popular,
    queryFn: movieService.getPopularMovies,
  })
}
