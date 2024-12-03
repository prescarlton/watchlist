import { Movie } from '@/domains/movie/movie.model'
import { Image, ScrollView } from 'react-native'
import { Box } from '../ui/box'
import { Link } from 'expo-router'
import MoviePosterCard from '../common/movie-poster-card'

export default function GridView({ movies }: { movies: Movie[] }) {
  return (
    <ScrollView>
      <Box className="flex flex-row flex-wrap gap-2">
        {movies.map((movie) => (
          <MoviePosterCard key={movie.id} movie={movie} />
        ))}
      </Box>
    </ScrollView>
  )
}
