import { Movie } from '@/domains/movie/movie.model'
import { Image, ScrollView } from 'react-native'
import { Box } from '../ui/box'
import { Link } from 'expo-router'

export default function GridView({ movies }: { movies: Movie[] }) {
  return (
    <ScrollView>
      <Box className="flex flex-row flex-wrap gap-2">
        {movies.map((movie) => (
          <Link
            href={{
              pathname: '/movie/[id]',
              params: { id: movie.movieId },
            }}
            key={movie.id}
          >
            <Box
              key={movie.id}
              className="h-48 w-32 rounded-lg"
              style={{
                position: 'relative',
              }}
            >
              <Image
                source={{ uri: movie.poster }}
                style={{ position: 'absolute', inset: 0 }}
                className="rounded-lg"
              />
            </Box>
          </Link>
        ))}
      </Box>
    </ScrollView>
  )
}
