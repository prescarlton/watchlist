import { Link } from 'expo-router'
import { Image, View } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'

import { Movie } from '@/domains/movie/movie.model'

import Card from '../ui/card'
import { Text } from '../ui/text'

export default function MoviePosterCard({ movie }: { movie: Movie }) {
  return (
    <Link
      key={movie.id}
      href={{
        pathname: '/movie/[id]',
        params: { id: movie.movieId },
      }}
    >
      <Card key={movie.id} style={styles.imageWrapper}>
        <View style={styles.imageFallback}>
          <Text bold>{movie.title}</Text>
          <Text>{movie.year}</Text>
        </View>
        <Image
          source={{ uri: movie.poster }}
          alt={movie.title}
          style={styles.image}
        />
      </Card>
    </Link>
  )
}

const styles = StyleSheet.create((theme) => ({
  imageWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: theme.space(32),
    height: theme.space(48),
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: theme.radius.lg,
  },
  imageFallback: {
    position: 'absolute',
    textAlign: 'center',
  },
}))
