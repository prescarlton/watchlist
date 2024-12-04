import { MovieDetails } from '@/domains/movie/movie.model'
import { Box } from '../ui/box'
import { Text } from '../ui/text'
import { Divider } from '../ui/divider'
import { formatRuntime } from '@/util'
import MovieRating from './movie-rating'

export default function MovieSubheader({ movie }: { movie: MovieDetails }) {
  return (
    <Box className="flex-row items-center gap-2">
      <MovieRating rating={movie.vote_average} />
      <Divider orientation="vertical" className="h-3/4" />
      <Text>{movie.year}</Text>
      <Divider orientation="vertical" className="h-3/4" />
      <Text>{movie.genres[0].name}</Text>
      <Divider orientation="vertical" className="h-3/4" />
      <Text>{formatRuntime(movie.runtime)}</Text>
    </Box>
  )
}
