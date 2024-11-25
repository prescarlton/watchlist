import { Movie } from '@/domains/movie/movie.model'
import { Image, ScrollView } from 'react-native'
import { Box } from '../ui/box'
import { Card } from '../ui/card'
import { getFullImageUrl } from '@/util'
import { Text } from '../ui/text'

export default function ListView({ movies }: { movies: Movie[] }) {
  return (
    <ScrollView>
      <Box className="flex gap-2">
        {movies.map((movie) => (
          <Card key={movie.id} className="flex-row gap-4">
            <Box className="h-24 w-12 rounded-lg">
              <Image
                source={{ uri: getFullImageUrl(movie.poster) }}
                style={{ position: 'absolute', inset: 0 }}
              />
            </Box>
            <Box className="flex gap-1">
              <Box className="flex flex-row gap-2">
                <Text size="lg" className="font-bold">
                  {movie.title}
                </Text>
                <Text size="lg">{movie.year}</Text>
              </Box>
            </Box>
          </Card>
        ))}
      </Box>
    </ScrollView>
  )
}
