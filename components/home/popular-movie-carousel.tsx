import { Movie } from '@/domains/movie/movie.model'
import Carousel from 'react-native-reanimated-carousel'
import { Box } from '../ui/box'
import { Dimensions, Image, Pressable } from 'react-native'
import { useRouter } from 'expo-router'
import { getFullImageUrl } from '@/util'

interface PopularMovieCarouselProps {
  movies: Movie[]
}
export default function PopularMovieCarousel({
  movies,
}: PopularMovieCarouselProps) {
  const width = Dimensions.get('window').width
  const router = useRouter()
  const onPress = (id: number) => {
    router.push({
      pathname: '/movie/[id]',
      params: { id },
    })
  }
  return (
    <Box className="w-full h-full">
      <Carousel
        data={movies}
        width={width}
        autoPlayInterval={3000}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => onPress(item.movieId)}
            className="rounded-xl"
          >
            <Image
              source={{ uri: getFullImageUrl(item.poster) }}
              alt={item.title}
              className="w-full h-full object-contain rounded-xl"
            />
          </Pressable>
        )}
        mode="parallax"
        autoPlay
        loop
      />
    </Box>
  )
}
