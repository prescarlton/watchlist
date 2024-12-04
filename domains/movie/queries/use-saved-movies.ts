import { useQuery } from '@tanstack/react-query'

import { movieService } from '@/services'

import { movieKeys } from './keys'

export const useSavedMovies = () => {
  return useQuery({
    queryKey: movieKeys.saved,
    queryFn: movieService.getSavedMovies,
  })
}
