import { View } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'

import PopularMovieCarousel from '@/components/home/popular-movie-carousel'
import { useGetPopularMovies } from '@/domains/movie/queries'

export default function Screen() {
  const { data } = useGetPopularMovies()
  return (
    <View style={styles.root}>
      <PopularMovieCarousel movies={data || []} />
    </View>
  )
}
const styles = StyleSheet.create((theme) => ({
  root: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
}))
