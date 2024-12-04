import { useMutation } from '@tanstack/react-query'

import { movieService } from '@/services'

export const useSaveMovie = () => {
  return useMutation({
    mutationFn: movieService.saveMovie,
  })
}
