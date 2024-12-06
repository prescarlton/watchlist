import { FontAwesome } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { ImageStyle, ViewStyle } from 'react-native'
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated'
import { StyleSheet } from 'react-native-unistyles'

import { Button } from '@/components/ui/button'
import { Text } from '@/components/ui/text'
import { MovieDetails } from '@/domains/movie/movie.model'
import { getFullImageUrl } from '@/util'

import MovieActions from './movie-actions'
import MovieOverview from './movie-overview'
import MovieSubheader from './movie-subheader'

interface ParallaxPosterHeaderProps {
  movie: MovieDetails
  showModal: () => void
  scrollOffset: SharedValue<number>
  height: number
}
export default function ParallaxPosterHeader({
  movie,
  showModal,
  scrollOffset,
  height,
}: ParallaxPosterHeaderProps) {
  const imageStyle = useAnimatedStyle<ImageStyle>(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset?.value,
            [-height, 0, height],
            [-height / 2, 0, height * 0.75],
            'clamp',
          ),
        },
        {
          scale: interpolate(
            scrollOffset?.value,
            [-height, 0, height],
            [2, 1.25, 1],
            'clamp',
          ),
        },
      ],
    }
  })
  const containerStyle = useAnimatedStyle<ViewStyle>(() => {
    return {
      opacity: interpolate(
        scrollOffset?.value,
        [-height, 0, height * 0.5, height * 0.7],
        [0, 1, 1, 0],
        'clamp',
      ),
    }
  })
  return (
    <>
      <Animated.View
        style={[
          {
            width: '100%',
            height: height,
          },
        ]}
      >
        <Animated.Image
          source={{ uri: getFullImageUrl(movie.backdrop) }}
          style={[
            {
              position: 'absolute',
              inset: 0,
            },
            imageStyle,
          ]}
        />
        <LinearGradient
          colors={[
            'transparent',
            'transparent',
            'rgba(0,0,0,0.8)',
            'rgb(24,18,24)',
          ]}
          locations={[0, 0.4, 0.7, 1]}
          style={[
            {
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: height,
            },
            containerStyle,
          ]}
        />

        <Animated.View style={[containerStyle, styles.container]}>
          <Text style={styles.movieTitle}>{movie.title}</Text>
          <MovieSubheader movie={movie} />
          <MovieOverview overview={movie.overview} />
          <MovieActions movie={movie} />
        </Animated.View>
      </Animated.View>
    </>
  )
}

const styles = StyleSheet.create(({ space }) => ({
  container: {
    marginTop: 'auto',
    gap: space(1),
    padding: space(4),
    zIndex: 10,
  },
  movieTitle: {
    fontSize: 30,
    lineHeight: 36,
    fontWeight: 'bold',
    color: 'white',
  },
  button: {
    width: '75%',
    marginVertical: space(2),
    backgroundColor: 'white',
  },
}))
