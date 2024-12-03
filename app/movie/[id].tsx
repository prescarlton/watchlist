import MovieHero from '@/components/common/movie-hero'
import { Box } from '@/components/ui/box'
import { Text } from '@/components/ui/text'
import { useMovieDetails } from '@/domains/movie/queries'
import { useLocalSearchParams } from 'expo-router'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import ParallaxScroll from '@monterosa/react-native-parallax-scroll'
import { LinearGradient } from 'expo-linear-gradient'
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet'
import MovieSheet from '@/components/movie-details/movie-sheet'
import { useRef } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import MovieRating from '@/components/movie-details/movie-rating'
import MovieDetailsHeader from '@/components/movie-details/movie-details-header'
import MovieSubheader from '@/components/movie-details/movie-subheader'
import MovieCast from '@/components/movie-details/movie-cast'
import MovieOverview from '@/components/movie-details/movie-overview'
import MovieActionButtons from '@/components/movie-details/movie-action-buttons'
import MovieCollections from '@/components/movie-details/movie-collections'
import WhereToWatch from '@/components/movie-details/where-to-watch'

export default function MovieDetailsScreeen() {
  const { id } = useLocalSearchParams() as { id: string }
  const { data, isLoading } = useMovieDetails(Number(id))
  const { top, bottom } = useSafeAreaInsets()

  const bottomSheetModalRef = useRef<BottomSheetModal>(null)
  const showModal = () => bottomSheetModalRef.current.present()

  return !data || isLoading ? (
    <Text>Loading...</Text>
  ) : (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <Box className="bg-black">
          <MovieDetailsHeader showModal={showModal} saved={data.saved} />
          <ParallaxScroll
            renderParallaxBackground={() => <MovieHero movie={data} />}
            parallaxHeight={400}
            parallaxBackgroundScrollSpeed={4}
            showsVerticalScrollIndicator={false}
            fadeOutParallaxBackground={true}
          >
            <Box className="flex gap-4 pb-12 -mt-32">
              <LinearGradient
                colors={['#00000000', '#000000ff', '#000000ff']}
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  top: -200,
                }}
              />

              <Box className="flex items-center gap-1 px-4">
                <Text className="text-3xl font-bold">{data.title}</Text>
                <MovieSubheader movie={data} />
                <MovieRating rating={data.vote_average} />
              </Box>
              <MovieActionButtons
                movie={data}
                onPressBookmark={showModal}
                onPressWatch={showModal}
              />
              <MovieOverview overview={data.overview} />
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
          </ParallaxScroll>
        </Box>
        <MovieSheet ref={bottomSheetModalRef} movie={data} />
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  )
}
