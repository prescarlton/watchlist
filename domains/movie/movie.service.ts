import axios from 'axios'
import { MovieDetails, ListMoviesResponse, Movie } from './movie.model'
import { MovieRepository } from './movie.repository'
import { getFullImageUrl } from '@/util'
export const createMovieService = ({
  movieRepository,
}: {
  movieRepository: MovieRepository
}) => {
  const baseURL = 'https://api.themoviedb.org/3'
  const API_KEY = 'c29b33ce36f302b4588dd1dfc3ba0cba'
  const api = axios.create({
    baseURL,
    params: {
      api_key: API_KEY,
    },
  })

  return {
    async getPopularMovies(): Promise<Movie[]> {
      const movies = await api.get('/movie/popular').then((res) => res.data)
      return movies.results.map((movie) => ({
        id: movie.id,
        movieId: movie.id,
        title: movie.title,
        backdrop: movie.backdrop_path,
        poster: movie.poster_path,
        year: movie.release_date.split('-')[0],
      }))
    },
    async getMovieById(id: string): Promise<MovieDetails> {
      const movieData = await api.get(`/movie/${id}`).then((res) => res.data)
      const savedMovie = await this.getSavedMovie(id)
      return {
        ...movieData,
        backdrop: movieData.backdrop_path,
        poster: movieData.poster_path,
        movieId: movieData.id,
        saved: !!savedMovie,
        year: movieData.release_date.split('-')[0],
        watched: savedMovie?.watched || false,
      }
    },
    async searchMovies(query: string): Promise<ListMoviesResponse> {
      return api
        .get('/search/movie', {
          params: {
            query,
          },
        })
        .then((res) => res.data)
    },
    async saveMovie({
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
    }) {
      return movieRepository.saveMovie({
        movieId,
        title,
        poster,
        backdrop,
        year,
        category,
      })
    },
    async getSavedMovies() {
      const movies = await movieRepository.getSavedMovies()
      return movies.map((movie) => ({
        ...movie,
        backdrop: getFullImageUrl(movie.backdrop),
        poster: getFullImageUrl(movie.poster),
        watched: movie.watched === 1,
      }))
    },
    async unsaveMovie(movieId: number) {
      return movieRepository.unsaveMovie(movieId)
    },
    async setMovieWatched(movieId: number) {
      return movieRepository.setMovieWatched(movieId)
    },
    async getSavedMovie(movieId: number) {
      return movieRepository.getSavedMovie(movieId)
    },
  }
}
