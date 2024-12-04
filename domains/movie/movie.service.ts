import axios from 'axios'
import _, { groupBy } from 'lodash'

import { getFullImageUrl } from '@/util'

import {
  CastMember,
  GetWatchProvidersApiResponse,
  Movie,
  MovieDetails,
  WatchProvider,
} from './movie.model'
import { MovieRepository } from './movie.repository'
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
        saved: false,
      }))
    },
    async getMovieById(id: number): Promise<MovieDetails> {
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
    async searchMovies(query: string): Promise<Movie[]> {
      const movies = await api
        .get('/search/movie', {
          params: {
            query,
          },
        })
        .then((res) => res.data.results)
      return movies.map((mov) => ({
        ...mov,
        movieId: mov.id,
        poster: getFullImageUrl(mov.poster_path),
      }))
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
        saved: true,
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
    async getMovieCast(movieId: number): Promise<CastMember[]> {
      const res = await api
        .get<{ cast: CastMember[] }>(`/movie/${movieId}/credits`)
        .then((res) => res.data.cast)
      return res.map((member) => ({
        ...member,
        profile_path: getFullImageUrl(member.profile_path),
      }))
    },
    async getMovieWatchProviders(movieId: number): Promise<WatchProvider[]> {
      const res = await api
        .get<GetWatchProvidersApiResponse>(`/movie/${movieId}/watch/providers`)
        .then((res) => res.data.results.US)
      if (!res) return []
      const providers = [] as WatchProvider[]
      if (res.ads)
        providers.push(...res.ads.map((p) => ({ ...p, watchtype: 'Ads' })))
      if (res.buy)
        providers.push(...res.buy.map((p) => ({ ...p, watchtype: 'Buy' })))
      if (res.flatrate)
        providers.push(
          ...res.flatrate.map((p) => ({ ...p, watchtype: 'Stream' })),
        )
      if (res.rent)
        providers.push(...res.rent.map((p) => ({ ...p, watchtype: 'Rent' })))

      // Sort by display priority, then group by provider
      const sorted = providers.sort(
        (a, b) => a.display_priority - b.display_priority,
      )
      return _(sorted)
        .groupBy('provider_id')
        .map((group) => ({
          provider_id: group[0].provider_id,
          provider_name: group[0].provider_name,
          watchtype: _.uniq(group.map((item) => item.watchtype)).join(' / '),
          logo_path: group[0].logo_path,
          display_priority: group[0].display_priority,
        }))
        .value()
    },
    async getMovieVideos(movieId: number) {
      return api.get(`/movie/${movieId}/videos`).then((res) => res.data.results)
    },
    async getSimilarMovies(movieId: number): Promise<Movie[]> {
      const res = await api
        .get(`/movie/${movieId}/similar`)
        .then((res) => res.data.results)
      return res.map((movie) => ({
        ...movie,
        movieId: movie.id,
        poster: getFullImageUrl(movie.poster_path),
      }))
    },
    async getMoviesPlayingNow(): Promise<Movie[]> {
      const movies = await api.get('/movie/now_playing').then((res) => res.data)
      return movies.results.map((movie) => ({
        id: movie.id,
        movieId: movie.id,
        title: movie.title,
        backdrop: movie.backdrop_path,
        poster: getFullImageUrl(movie.poster_path),
        year: movie.release_date.split('-')[0],
      }))
    },
  }
}
