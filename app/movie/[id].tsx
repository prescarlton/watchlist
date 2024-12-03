import MovieHero from '@/components/common/movie-hero'
import { Box } from '@/components/ui/box'
import { Text } from '@/components/ui/text'
import { useMovieDetails } from '@/domains/movie/queries'
import { Stack, useLocalSearchParams } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { LinearGradient } from 'expo-linear-gradient'
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet'
import MovieSheet from '@/components/movie-details/movie-sheet'
import { useRef } from 'react'
import {
  GestureHandlerRootView,
  ScrollView,
} from 'react-native-gesture-handler'
import MovieRating from '@/components/movie-details/movie-rating'
import MovieDetailsHeader from '@/components/movie-details/movie-details-header'
import MovieSubheader from '@/components/movie-details/movie-subheader'
import MovieCast from '@/components/movie-details/movie-cast'
import MovieOverview from '@/components/movie-details/movie-overview'
import MovieActionButtons from '@/components/movie-details/movie-action-buttons'
import MovieCollections from '@/components/movie-details/movie-collections'
import WhereToWatch from '@/components/movie-details/where-to-watch'
import Animated, {
  interpolate,
  useAnimatedRef,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useScrollViewOffset,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated'
import { getFullImageUrl } from '@/util'
import { Image, ImageStyle, ViewStyle } from 'react-native'
import { BlurView } from 'expo-blur'
import { Button, ButtonIcon, ButtonText } from '@/components/ui/button'
import { Feather, FontAwesome } from '@expo/vector-icons'

export default function MovieDetailsScreeen() {
  const { id } = useLocalSearchParams() as { id: string }
  const { data, isLoading } = useMovieDetails(Number(id))
  const { top, bottom } = useSafeAreaInsets()

  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  const scrollRef = useAnimatedRef<Animated.ScrollView | null>()
  const scrollOffset = useSharedValue(0)

  const scrollHandler = useAnimatedScrollHandler((e) => {
    scrollOffset.value = e.contentOffset.y
  })
  const IMG_HEIGHT = 650
  const imageStyle = useAnimatedStyle<ImageStyle>(() => {
    return {
      transform: [
        {
          translateY: interpolate(
            scrollOffset?.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT],
            [-IMG_HEIGHT / 2, 0, IMG_HEIGHT * 0.75],
            'clamp',
          ),
        },
        {
          scale: interpolate(
            scrollOffset?.value,
            [-IMG_HEIGHT, 0, IMG_HEIGHT],
            [2, 1, 1],
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
        [-IMG_HEIGHT, 0, IMG_HEIGHT * 0.5, IMG_HEIGHT * 0.7],
        [0, 1, 1, 0],
        'clamp',
      ),
    }
  })
  const showModal = () => bottomSheetModalRef?.current.present()

  return !data || isLoading ? (
    <Text>Loading...</Text>
  ) : (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <Box>
          <MovieDetailsHeader
            saved={data.saved}
            showModal={showModal}
            scrollOffset={scrollOffset}
            headerHeight={IMG_HEIGHT}
          />
          <Animated.ScrollView
            showsVerticalScrollIndicator={false}
            ref={scrollRef}
            onScroll={scrollHandler}
          >
            <Animated.View
              style={[
                {
                  width: '100%',
                  height: IMG_HEIGHT,
                },
                // TODO: add a new opacity animation here, should fade out around the same time / right after containerStyle
              ]}
              className="pb-4"
            >
              <Animated.Image
                source={{ uri: getFullImageUrl(data.backdrop) }}
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
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: IMG_HEIGHT,
                }}
              />

              <Animated.View
                className="flex mt-auto items-center gap-1 p-4 z-10"
                style={containerStyle}
              >
                <Text className="text-3xl font-bold">{data.title}</Text>
                <MovieSubheader movie={data} />
                <Button className="w-3/4 my-2" onPress={showModal}>
                  <FontAwesome name="bookmark-o" size={16} />
                  <ButtonText>Add to List</ButtonText>
                </Button>
                <MovieOverview overview={data.overview} />
                <MovieRating rating={data.vote_average} />
              </Animated.View>
            </Animated.View>
            <Box className="pt-4 flex gap-4 pb-12 bg-black">
              <WhereToWatch movieId={data.movieId} />
              <MovieCast movieId={data.movieId} />
              <MovieCollections collection={data.belongs_to_collection} />
              <Box className="flex gap-2 px-4">
                <Text className="text-lg font-bold">Production Companies</Text>
                <Text className="">
                  {data.production_companies.map((c) => c.name).join(', ')}
                </Text>
              </Box>
              <Box className="flex gap-2 px-4">
                <Text className="text-lg font-bold">Data</Text>
                <Text>All data and images are from TMDB</Text>
              </Box>
            </Box>
          </Animated.ScrollView>
        </Box>
        <MovieSheet ref={bottomSheetModalRef} movie={data} />
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  )
}
