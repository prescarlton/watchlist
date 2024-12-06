import { ScrollView } from 'react-native-gesture-handler'
import { StyleSheet } from 'react-native-unistyles'

import GenreList from '@/components/home/genre-list'
import PopularMovieCarousel from '@/components/home/popular-movie-carousel'
import TopRatedMovies from '@/components/home/top-rated-movies'
import TrendingMovies from '@/components/home/trending-movies'
import { useGetPopularMovies } from '@/domains/movie/queries'

export default function Screen() {
  const { data } = useGetPopularMovies()
  return (
    <ScrollView style={styles.root} showsVerticalScrollIndicator={false}>
      <PopularMovieCarousel movies={data || []} />
      <TrendingMovies />
      <TopRatedMovies />
      <GenreList />
    </ScrollView>
  )
}
const styles = StyleSheet.create((theme) => ({
  root: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
}))
