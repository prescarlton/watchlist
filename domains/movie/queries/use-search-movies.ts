import { movieService } from '@/services'
import { movieKeys } from './keys'
import { useQuery } from '@tanstack/react-query'

export const useSearchMovies = (query: string) => {
  return useQuery({
    queryKey: movieKeys.search(query),
    queryFn: () => movieService.searchMovies(query),
  })
}
