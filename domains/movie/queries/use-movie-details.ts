import { useQuery } from '@tanstack/react-query'
import { movieKeys } from './keys'
import { movieService } from '@/services'

export const useMovieDetails = (id: string) => {
  return useQuery({
    queryKey: movieKeys.details(id),
    queryFn: () => movieService.getMovieById(id),
  })
}
