import { View } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'

import { Divider } from '@/components/ui/divider'
import { Text } from '@/components/ui/text'
import { MovieDetails } from '@/domains/movie/movie.model'
import { formatRuntime } from '@/util'

import MovieRating from './movie-rating'

export default function MovieSubheader({ movie }: { movie: MovieDetails }) {
  return (
    <View style={styles.container}>
      <MovieRating rating={movie.vote_average} />
      <Divider orientation="vertical" style={{ height: '75%' }} />
      <Text size="sm" style={{ color: 'white' }}>
        {movie.year}
      </Text>
      <Divider orientation="vertical" style={{ height: '75%' }} />
      <Text size="sm" style={{ color: 'white' }}>
        {movie.genres[0].name}
      </Text>
      <Divider orientation="vertical" style={{ height: '75%' }} />
      <Text size="sm" style={{ color: 'white' }}>
        {formatRuntime(movie.runtime)}
      </Text>
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
