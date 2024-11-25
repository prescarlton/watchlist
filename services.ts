import { createMovieService } from './domains/movie/movie.service'
import { movieRepository } from './repositories'

export const movieService = createMovieService({ movieRepository })
