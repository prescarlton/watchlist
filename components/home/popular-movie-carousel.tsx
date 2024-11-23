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
import MovieHero from '../common/movie-hero'

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
            <MovieHero movie={item} />
          </Link>
        )}
      />
    </Box>
  )
}
