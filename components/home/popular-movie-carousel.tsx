import { useRouter } from 'expo-router'
import { Dimensions, Image, Pressable, View } from 'react-native'
import Carousel from 'react-native-reanimated-carousel'
import { StyleSheet } from 'react-native-unistyles'

import { Movie } from '@/domains/movie/movie.model'
import { getFullImageUrl } from '@/util'

interface PopularMovieCarouselProps {
  movies: Movie[]
}
export default function PopularMovieCarousel({
  movies,
}: PopularMovieCarouselProps) {
  const width = Dimensions.get('window').width
  const router = useRouter()
  const onPress = (id: number) => {
    router.push({
      pathname: '/movie/[id]',
      params: { id },
    })
  }

  return (
    <View style={styles.container}>
      <Carousel
        data={movies}
        width={width}
        autoPlayInterval={3000}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => onPress(item.movieId)}
            style={styles.pressable}
          >
            <Image
              source={{ uri: getFullImageUrl(item.poster) }}
              alt={item.title}
              style={styles.image}
            />
          </Pressable>
        )}
        autoPlay
        loop
      />
    </View>
  )
}

const styles = StyleSheet.create((theme) => ({
  container: {
    height: theme.space(160),
  },
  pressable: {
    overflow: 'hidden',
    backgroundColor: theme.colors.card,
  },
  image: {
    height: '100%',
    objectFit: 'cover',
  },
}))
