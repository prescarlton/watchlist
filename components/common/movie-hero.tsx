import { Movie } from '@/domains/movie/movie.model'
import { Box } from '../ui/box'
import { Image } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Text } from '../ui/text'
import { getFullImageUrl } from '@/util'

type MovieHeroProps = {
  showDetails?: boolean
  movie: Movie
}
export default function MovieHero({ movie, showDetails }: MovieHeroProps) {
  return (
    <Box className="w-full h-full">
      <Image
        source={{ uri: getFullImageUrl(movie.poster) }}
        className="w-full h-full absolute object-cover"
      />
      <Box className="mt-auto flex items-center justify-center p-2 relative min-h-24 pt-24">
        <LinearGradient
          colors={['#00000000', '#000000']}
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: 300,
          }}
        />
        {showDetails && (
          <Box className="items-center">
            <Text className="font-bold text-4xl text-center">
              {movie.title}
            </Text>
            <Text>{movie.year}</Text>
          </Box>
        )}
      </Box>
    </Box>
  )
}
