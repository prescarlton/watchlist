import PopularMovieCarousel from '@/components/home/popular-movie-carousel'
import { useGetPopularMovies } from '@/domains/movie/queries'
import { View } from 'react-native'

export default function Screen() {
  const { data, isLoading } = useGetPopularMovies()
  return (
    <View>
      <PopularMovieCarousel movies={data || []} />
    </View>
  )
}
