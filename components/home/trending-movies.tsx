import { useTrendingMovies } from '@/domains/movie/queries'

import MovieList from '../common/movie-list'

export default function TrendingMovies() {
  const { data } = useTrendingMovies()
  const limit = 5
  return (
    <MovieList title="Trending Today" movies={data?.slice(0, limit) || []} />
  )
}
