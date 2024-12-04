import { ScrollView, View } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'

import { Text } from '@/components/ui/text'
import { Movie } from '@/domains/movie/movie.model'

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
