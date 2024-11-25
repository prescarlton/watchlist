import { Movie } from '@/domains/movie/movie.model'
import Carousel from 'react-native-reanimated-carousel'
import { Box } from '../ui/box'
import { Dimensions, Pressable } from 'react-native'
import { useRouter } from 'expo-router'
import MovieHero from '../common/movie-hero'

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
    <Box className="w-full h-[500px]">
      <Carousel
        data={movies}
        width={width}
        autoPlayInterval={3000}
        renderItem={({ item }) => (
          <Pressable onPress={() => onPress(item.movieId)}>
            <MovieHero movie={item} showDetails />
          </Pressable>
        )}
        autoPlay
        loop
      />
    </Box>
  )
}
