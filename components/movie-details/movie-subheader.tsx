import { MovieDetails } from '@/domains/movie/movie.model'
import { Text } from '@/components/ui/text'
import { Divider } from '@/components/ui/divider'
import { formatRuntime } from '@/util'
import MovieRating from './movie-rating'
import { StyleSheet, View } from 'react-native'

export default function MovieSubheader({ movie }: { movie: MovieDetails }) {
  return (
    <View style={styles.container}>
      <MovieRating rating={movie.vote_average} />
      <Divider orientation="vertical" style={{ height: '75%' }} />
      <Text size="sm">{movie.year}</Text>
      <Divider orientation="vertical" style={{ height: '75%' }} />
      <Text size="sm">{movie.genres[0].name}</Text>
      <Divider orientation="vertical" style={{ height: '75%' }} />
      <Text size="sm">{formatRuntime(movie.runtime)}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
  },
})
