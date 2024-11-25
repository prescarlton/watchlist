import { Movie, MovieDetails } from '@/domains/movie/movie.model'
import { Box } from '../ui/box'
import { Image } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Text } from '../ui/text'
import { Divider } from '../ui/divider'
import dayjs from 'dayjs'
import { getFullImageUrl } from '@/util'

type MovieHeroProps =
  | {
      showDetails: true
      movie: MovieDetails
    }
  | {
      showDetails?: false
      movie: Movie
    }
export default function MovieHero({ movie, showDetails }: MovieHeroProps) {
  return (
    <Box className="w-full h-[600px]">
      <Image
        source={{ uri: getFullImageUrl(movie.backdrop) }}
        className="w-full h-full absolute inset-0"
      />
      <Box className="mt-auto flex items-center justify-center p-2 relative min-h-24 pt-24">
        <LinearGradient
          colors={['rgba(0,0,0,0)', 'rgba(0,0,0,1)']}
          style={{
            position: 'absolute',
            inset: 0,
          }}
        />
        <Box className="flex items-center gap-2">
          <Text className="font-bold text-4xl text-center">{movie.title}</Text>
          <Box className="flex flex-row items-center gap-2">
            {showDetails ? (
              <Text className="text-xl">
                {movie.genres
                  .slice(0, 2)
                  .map((genre) => genre.name)
                  .join(' / ')}
              </Text>
            ) : (
              <Text className="text-xl">Action</Text>
            )}
            <Divider orientation="vertical" />
            <Text className="text-xl">
              {dayjs(movie.release_date).format('YYYY')}
            </Text>
          </Box>
        </Box>
      </Box>
    </Box>
  )
}
