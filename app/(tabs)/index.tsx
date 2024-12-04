import { View } from 'react-native'

import PopularMovieCarousel from '@/components/home/popular-movie-carousel'
import { useGetPopularMovies } from '@/domains/movie/queries'

export default function Screen() {
  const { data } = useGetPopularMovies()
  return (
    <View>
      <PopularMovieCarousel movies={data || []} />
    </View>
  )
}
