import { eq } from 'drizzle-orm'

import { Db } from '@/db'
import { SavedMoviesTable } from '@/db/schema/saved-movie'
import { takeUnique } from '@/db/util'

export const createMovieRepository = ({
  db,
  savedMovies,
}: {
  db: Db
  savedMovies: SavedMoviesTable
}) => {
  return {
    saveMovie: ({
      movieId,
      title,
      poster,
      backdrop,
      year,
      category,
    }: {
      movieId: number
      title: string
      poster: string
      backdrop: string
      year: string
      category: string
    }) => {
      return db.insert(savedMovies).values({
        movieId,
        title,
        poster,
        backdrop,
        year,
        category,
      })
    },
    getSavedMovies: () => {
      return db.select().from(savedMovies)
    },
    unsaveMovie: (movieId: number) => {
      return db.delete(savedMovies).where(eq(savedMovies.movieId, movieId))
    },
    setMovieWatched: (movieId: number) => {
      return db
        .update(savedMovies)
        .set({ watched: 1 })
        .where(eq(savedMovies.movieId, movieId))
    },
    getSavedMovie: (movieId: number) => {
      return db
        .select()
        .from(savedMovies)
        .where(eq(savedMovies.movieId, movieId))
        .then(takeUnique)
    },
  }
}

export type MovieRepository = ReturnType<typeof createMovieRepository>
