import { Link } from 'expo-router'
import { Image, StyleSheet, View } from 'react-native'

import { Movie } from '@/domains/movie/movie.model'

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
      <View key={movie.id} style={styles.imageWrapper}>
        <View style={styles.imageFallback}>
          <Text bold>{movie.title}</Text>
          <Text>{movie.year}</Text>
        </View>
        <Image
          source={{ uri: movie.poster }}
          alt={movie.title}
          style={styles.image}
        />
      </View>
    </Link>
  )
}

const styles = StyleSheet.create({
  imageWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 114,
    height: 168,
    backgroundColor: '#ffffff15',
    borderRadius: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    borderRadius: 10,
  },
  imageFallback: {
    position: 'absolute',
    textAlign: 'center',
  },
})
