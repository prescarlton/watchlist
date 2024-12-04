import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet'
import { useLocalSearchParams } from 'expo-router'
import { useRef } from 'react'
import { View } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import Animated, {
  useAnimatedRef,
  useAnimatedScrollHandler,
  useSharedValue,
} from 'react-native-reanimated'

import MovieCast from '@/components/movie-details/movie-cast'
import MovieCollections from '@/components/movie-details/movie-collections'
import MovieDetailsTopbar from '@/components/movie-details/movie-details-topbar'
import MovieSheet from '@/components/movie-details/movie-sheet'
import MovieVideos from '@/components/movie-details/movie-videos'
import ParallaxPosterHeader from '@/components/movie-details/parallax-poster-header'
import WhereToWatch from '@/components/movie-details/where-to-watch'
import { Text } from '@/components/ui/text'
import { useMovieDetails } from '@/domains/movie/queries'

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
        <View>
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
            <View style={styles.container}>
              <MovieVideos movieId={movie.movieId} />
              <WhereToWatch movieId={movie.movieId} />
              <MovieCast movieId={movie.movieId} />
              <MovieCollections collection={movie.belongs_to_collection} />
              <View style={styles.detailWrapper}>
                <Text size="lg" bold>
                  Production Companies
                </Text>
                <Text>
                  {movie.production_companies.map((c) => c.name).join(', ')}
                </Text>
              </View>
              <View style={styles.detailWrapper}>
                <Text size="lg" bold>
                  Data
                </Text>
                <Text>All data and images are from TMDB</Text>
              </View>
            </View>
          </Animated.ScrollView>
        </View>
        <MovieSheet ref={bottomSheetModalRef} movie={movie} />
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 16,
    gap: 16,
    paddingBottom: 48,
    backgroundColor: 'black',
  },
  detailWrapper: {
    gap: 8,
    paddingHorizontal: 16,
  },
})
