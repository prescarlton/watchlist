import { Box } from '@/components/ui/box'
import { Text } from '@/components/ui/text'
import { useMovieDetails } from '@/domains/movie/queries'
import { useLocalSearchParams } from 'expo-router'
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet'
import MovieSheet from '@/components/movie-details/movie-sheet'
import { useRef } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import MovieDetailsTopbar from '@/components/movie-details/movie-details-topbar'
import MovieCast from '@/components/movie-details/movie-cast'
import MovieCollections from '@/components/movie-details/movie-collections'
import WhereToWatch from '@/components/movie-details/where-to-watch'
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated'
import ParallaxPosterHeader from '@/components/movie-details/parallax-poster-header'
import MovieMedia from '@/components/movie-details/movie-media'

export default function MovieDetailsScreeen() {
  const { id } = useLocalSearchParams() as { id: string }
  const { data: movie, isLoading, error } = useMovieDetails(Number(id))
  const IMG_HEIGHT = 600

  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  const scrollRef = useAnimatedRef<Animated.ScrollView | null>()
  const scrollOffset = useSharedValue(0)

  const scrollHandler = useAnimatedScrollHandler((e) => {
    scrollOffset.value = e.contentOffset.y
  })
  const showModal = () => bottomSheetModalRef?.current.present()
  error && console.error(error)
  return !movie || isLoading ? (
    <Text>Loading...</Text>
  ) : (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <Box>
          <MovieDetailsTopbar
            saved={movie.saved}
            title={movie.title}
            showModal={showModal}
            scrollOffset={scrollOffset}
            headerHeight={IMG_HEIGHT}
          />
          <Animated.ScrollView
            showsVerticalScrollIndicator={false}
            ref={scrollRef}
            onScroll={scrollHandler}
          >
            <ParallaxPosterHeader
              movie={movie}
              scrollOffset={scrollOffset}
              showModal={showModal}
              height={IMG_HEIGHT}
            />
            <Box className="pt-4 flex gap-4 pb-12 bg-black">
              <MovieMedia movieId={movie.movieId} />
              <WhereToWatch movieId={movie.movieId} />
              <MovieCast movieId={movie.movieId} />
              <MovieCollections collection={movie.belongs_to_collection} />
              <Box className="flex gap-2 px-4">
                <Text className="text-lg font-bold">Production Companies</Text>
                <Text className="">
                  {movie.production_companies.map((c) => c.name).join(', ')}
                </Text>
              </Box>
              <Box className="flex gap-2 px-4">
                <Text className="text-lg font-bold">Data</Text>
                <Text>All data and images are from TMDB</Text>
              </Box>
            </Box>
          </Animated.ScrollView>
        </Box>
        <MovieSheet ref={bottomSheetModalRef} movie={movie} />
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  )
}
