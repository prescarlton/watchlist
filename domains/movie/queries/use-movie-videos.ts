import { useQuery } from '@tanstack/react-query'

import { movieService } from '@/services'

import { movieKeys } from './keys'

export const useMovieVideos = (movieId: number) => {
  return useQuery({
    queryKey: movieKeys.videos(movieId),
    queryFn: () => movieService.getMovieVideos(movieId),
  })
}
