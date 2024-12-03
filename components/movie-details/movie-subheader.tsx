import { MovieDetails } from '@/domains/movie/movie.model'
import { Box } from '../ui/box'
import { Text } from '../ui/text'
import { Feather } from '@expo/vector-icons'
import { Divider } from '../ui/divider'
import { formatRuntime } from '@/util'

export default function MovieSubheader({ movie }: { movie: MovieDetails }) {
  return (
    <Box className="flex-row items-center gap-2">
      <Box className="flex-row items-center opacity-80 gap-1">
        <Feather name="calendar" size={12} color="white" />
        <Text>{movie.year}</Text>
      </Box>
      <Divider orientation="vertical" />
      <Box className="flex-row items-center opacity-80 gap-1">
        <Feather name="clock" size={12} color="white" />
        <Text>{formatRuntime(movie.runtime)}</Text>
      </Box>
      <Divider orientation="vertical" />
      <Box className="flex-row items-center opacity-80 gap-1">
        <Feather name="video" size={12} color="white" />
        <Text className="text-sm">
          {movie.genres
            .slice(0, 2)
            .map((g, i) => g.name + (i === 0 ? ', ' : ''))}
        </Text>
      </Box>
    </Box>
  )
}
