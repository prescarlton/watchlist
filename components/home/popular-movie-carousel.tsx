import { Movie } from '@/domains/movie/movie.model'
import Carousel from 'react-native-reanimated-carousel'
import { Box } from '../ui/box'
import { Dimensions, Image } from 'react-native'
import { getFullImageUrl } from '@/util'
import { LinearGradient } from 'expo-linear-gradient'
import { Text } from '../ui/text'
import { Divider } from '../ui/divider'
import dayjs from 'dayjs'
import { Link } from 'expo-router'

interface PopularMovieCarouselProps {
  movies: Movie[]
}
export default function PopularMovieCarousel({
  movies,
}: PopularMovieCarouselProps) {
  const width = Dimensions.get('window').width
  return (
    <Box className="w-full h-[500px]">
      <Carousel
        data={movies}
        width={width}
        autoPlayInterval={1000}
        renderItem={({ item }) => (
          <Link
            href={{
              pathname: '/movie/[id]',
              params: { id: item.id },
            }}
          >
            <Box className="w-full h-full">
              <Image
                source={{ uri: getFullImageUrl(item.backdrop_path) }}
                className="w-full h-full absolute inset-0"
              />
              <Box className="mt-auto flex items-center justify-center p-2 relative min-h-24 pt-12">
                <LinearGradient
                  colors={['rgba(0,0,0,0)', 'rgba(0,0,0,1)']}
                  style={{
                    position: 'absolute',
                    inset: 0,
                  }}
                />
                <Box className="flex items-center gap-2">
                  <Text className="font-bold text-4xl text-center">
                    {item.title}
                  </Text>
                  <Box className="flex flex-row items-center gap-2">
                    <Text className="text-xl">Action</Text>
                    <Divider orientation="vertical" />
                    <Text className="text-xl">
                      {dayjs(item.release_date).format('YYYY')}
                    </Text>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Link>
        )}
      />
    </Box>
  )
}
