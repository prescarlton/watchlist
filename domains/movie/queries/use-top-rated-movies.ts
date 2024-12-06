import { useQuery } from '@tanstack/react-query'

import { movieService } from '@/services'

import { movieKeys } from './keys'

export const useTopRatedMovies = () => {
  return useQuery({
    queryKey: movieKeys.topRated(),
    queryFn: movieService.getTopRatedMovies,
  })
}
