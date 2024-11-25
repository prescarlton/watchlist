import { useQuery } from '@tanstack/react-query'
import { movieKeys } from './keys'
import { movieService } from '@/services'

export const useSavedMovies = () => {
  return useQuery({
    queryKey: movieKeys.saved,
    queryFn: movieService.getSavedMovies,
  })
}
