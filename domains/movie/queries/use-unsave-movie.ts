import { useMutation } from '@tanstack/react-query'
import { movieService } from '@/services'

export const useUnsaveMovie = () => {
  return useMutation({
    mutationFn: movieService.unsaveMovie,
  })
}
