import { useTopRatedMovies } from '@/domains/movie/queries'

import MovieList from '../common/movie-list'

export default function TopRatedMovies() {
  const { data } = useTopRatedMovies()
  // need to figure out logic to "show more"
  const limit = 5

  return <MovieList title="Top Rated" movies={data?.slice(0, limit) || []} />
}
