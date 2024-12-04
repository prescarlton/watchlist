import { getFullImageUrl } from '@/util'
import { ImageStyle, ViewStyle } from 'react-native'
import Animated, {
  SharedValue,
  interpolate,
  useAnimatedStyle,
} from 'react-native-reanimated'
import MovieDetailsHeader from './movie-details-header'
import { MovieDetails } from '@/domains/movie/movie.model'
import { LinearGradient } from 'expo-linear-gradient'
import { Text } from '../ui/text'
import MovieSubheader from './movie-subheader'
import MovieOverview from './movie-overview'
import { Button, ButtonText } from '../ui/button'
import { FontAwesome } from '@expo/vector-icons'

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

        <Animated.View
          className="flex mt-auto gap-1 p-4 z-10"
          style={containerStyle}
        >
          <Text className="text-3xl font-bold">{movie.title}</Text>
          <MovieSubheader movie={movie} />
          <MovieOverview overview={movie.overview} />
          <Button className="w-3/4 my-2 rounded-lg" onPress={showModal}>
            <FontAwesome name="bookmark-o" size={16} />
            <ButtonText>Add to List</ButtonText>
          </Button>
        </Animated.View>
      </Animated.View>
    </>
  )
}
