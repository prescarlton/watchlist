import { Link } from 'expo-router'
import { Image, ScrollView, View } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'

import { Movie } from '@/domains/movie/movie.model'
import { getFullImageUrl } from '@/util'

import Card from '../ui/card'
import { Text } from '../ui/text'

interface MovieListProps {
  title: string
  movies: Movie[]
}

export default function MovieList({ title, movies }: MovieListProps) {
  return (
    <View style={styles.container}>
      <Text size="lg" bold>
        {title}
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.movieList}>
          {movies.map((movie) => (
            <View style={styles.movieWrapper} key={movie.movieId}>
              <Link href={`/movie/${movie.movieId}`}>
                <Card style={styles.movieCard}>
                  <Image
                    source={{ uri: getFullImageUrl(movie.poster) }}
                    style={styles.moviePoster}
                  />
                </Card>
              </Link>
              <View>
                <Text numberOfLines={1} size="sm">
                  {movie.title}
                </Text>
                <Text size="xs" style={styles.movieYear}>
                  {movie.year}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create((theme) => ({
  container: {
    marginTop: theme.space(4),
    gap: theme.space(2),
    padding: theme.space(4),
  },
  movieList: {
    flexDirection: 'row',
    gap: theme.space(4),
  },
  movieWrapper: {
    gap: theme.space(2),
  },
  movieCard: {
    flexDirection: 'row',
    gap: theme.space(1),
    width: theme.space(42),
    height: theme.space(64),
    borderRadius: theme.radius.lg,
  },
  movieYear: {
    opacity: 0.7,
  },
  moviePoster: {
    width: '100%',
    height: '100%',
    borderRadius: theme.radius.lg,
  },
}))
