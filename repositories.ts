import { db } from './db'
import { savedMovies } from './db/schema/saved-movie'
import { createMovieRepository } from './domains/movie/movie.repository'
export const movieRepository = createMovieRepository({
  db,
  savedMovies,
})
