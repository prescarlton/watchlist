import axios from 'axios'
import { MovieDetails, ListMoviesResponse } from './movie.model'
export const createMovieService = () => {
  const baseURL = 'https://api.themoviedb.org/3'
  const API_KEY = 'c29b33ce36f302b4588dd1dfc3ba0cba'
  const api = axios.create({
    baseURL,
    params: {
      api_key: API_KEY,
    },
  })

  return {
    getTrendingMovies() {
      return api.get('/trending/movie/week')
    },
    async getPopularMovies(): Promise<ListMoviesResponse> {
      return api.get('/movie/popular').then((res) => res.data)
    },
    async getMovieById(id: string): Promise<MovieDetails> {
      return api.get(`/movie/${id}`).then((res) => res.data)
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
  }
}
