import { ScrollView, StyleSheet,View } from 'react-native'

import { Movie } from '@/domains/movie/movie.model'

import MoviePosterCard from '../common/movie-poster-card'

export default function GridView({ movies }: { movies: Movie[] }) {
  return (
    <ScrollView>
      <View style={styles.list}>
        {movies.map((movie) => (
          <MoviePosterCard key={movie.id} movie={movie} />
        ))}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  list: {
    gap: 7,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
})
