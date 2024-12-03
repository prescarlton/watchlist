import { Movie } from '@/domains/movie/movie.model'
import { Link } from 'expo-router'
import { Box } from '../ui/box'
import { Image } from 'react-native'
import { Text } from '../ui/text'

export default function MoviePosterCard({ movie }: { movie: Movie }) {
  return (
    <Link
      key={movie.id}
      href={{
        pathname: '/movie/[id]',
        params: { id: movie.movieId },
      }}
    >
      <Box
        key={movie.id}
        className="flex items-center relative justify-center w-32 h-48 rounded-lg bg-background-muted"
      >
        <Box className="items-center absolute">
          <Text className="font-bold">{movie.title}</Text>
          <Text>{movie.year}</Text>
        </Box>
        <Image
          source={{ uri: movie.poster }}
          alt={movie.title}
          className="w-full h-full object-cover rounded-lg"
        />
      </Box>
    </Link>
  )
}
