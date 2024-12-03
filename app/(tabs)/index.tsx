import PopularMovieCarousel from '@/components/home/popular-movie-carousel'
import { Box } from '@/components/ui/box'
import { Text } from '@/components/ui/text'
import { useGetPopularMovies } from '@/domains/movie/queries'
import { ScrollView } from 'react-native'

export default function Screen() {
  const { data, isLoading } = useGetPopularMovies()
  return (
    <Box>
      <PopularMovieCarousel movies={data || []} />
    </Box>
  )
}
