import { Movie } from '@/domains/movie/movie.model'
import Carousel from 'react-native-reanimated-carousel'
import { Dimensions, Image, Pressable, StyleSheet, View } from 'react-native'
import { useRouter } from 'expo-router'
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
        mode="parallax"
        // autoPlay
        loop
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    height: 700,
  },
  pressable: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    objectFit: 'cover',
  },
})
