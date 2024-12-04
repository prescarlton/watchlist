import { Movie } from '@/domains/movie/movie.model'
import { ScrollView, StyleSheet, View } from 'react-native'
import { Text } from '@/components/ui/text'

export default function ListView({ movies }: { movies: Movie[] }) {
  return (
    <ScrollView>
      <View style={styles.list}>
        {movies.map((movie) => (
          <Text key={movie.movieId}>{movie.title}</Text>
        ))}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  list: {
    gap: 7,
  },
})
