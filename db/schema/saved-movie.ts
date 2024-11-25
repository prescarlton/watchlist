import { sql } from 'drizzle-orm'
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

export const savedMovies = sqliteTable('saved_movies', {
  id: integer().primaryKey({ autoIncrement: true }),
  movieId: integer('movie_id').notNull(),
  title: text('title', { length: 255 }).notNull(),
  poster: text('poster', { length: 255 }).notNull(),
  backdrop: text('backdrop', { length: 255 }).notNull(),
  year: text('year', { length: 4 }).notNull(),
  category: text('category', { length: 255 }).notNull(),
  watched: integer('watched').notNull().default(0),
  created: text('created')
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
})

export type SavedMoviesTable = typeof savedMovies
