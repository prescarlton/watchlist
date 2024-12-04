import { Feather } from '@expo/vector-icons'
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet'
import { useQueryClient } from '@tanstack/react-query'
import { forwardRef } from 'react'
import { StyleSheet } from 'react-native-unistyles'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

import BottomSheetBackdrop from '@/components/ui/bottom-sheet-backdrop'
import { Button } from '@/components/ui/button'
import { Text } from '@/components/ui/text'
import { MovieDetails } from '@/domains/movie/movie.model'
import { useSaveMovie } from '@/domains/movie/queries'
import { movieKeys } from '@/domains/movie/queries/keys'
import { useUnsaveMovie } from '@/domains/movie/queries/use-unsave-movie'

interface MovieSheetProps {
  movie: MovieDetails
}
type Ref = BottomSheetModal
const MovieSheet = forwardRef<Ref, MovieSheetProps>(function MovieSheet(
  { movie },
  ref,
) {
  const { mutateAsync: saveMovie } = useSaveMovie()
  const { mutateAsync: unsaveMovie } = useUnsaveMovie()
  const { bottom } = useSafeAreaInsets()
  const queryClient = useQueryClient()
  const toggleSaveMovie = async () => {
    const mut = movie.saved
      ? unsaveMovie(movie.movieId)
      : saveMovie({
          movieId: movie.movieId,
          title: movie.title,
          poster: movie.poster,
          backdrop: movie.backdrop,
          year: movie.release_date,
          category: movie.genres.map((g) => g.name).join(', '),
        })
    mut
      .then(() => {
        queryClient.invalidateQueries({ queryKey: movieKeys.saved })
        queryClient.invalidateQueries({
          queryKey: movieKeys.details(movie.movieId),
        })
      })
      .catch((err) => {
        alert('Error adding movie to list')
        console.error(err)
      })
  }
  return (
    <BottomSheetModal
      ref={ref}
      detached
      enableContentPanningGesture={false}
      enableHandlePanningGesture={false}
      enableOverDrag={false}
      enablePanDownToClose={false}
      bottomInset={bottom}
      handleStyle={{
        display: 'none',
      }}
      containerStyle={{ marginHorizontal: 16 }}
      backgroundStyle={{
        backgroundColor: 'transparent',
      }}
      style={{
        marginHorizontal: 16,
        zIndex: 9999,
      }}
      backdropComponent={(props) => (
        <BottomSheetBackdrop
          {...props}
          // @ts-expect-error: TS doesn't understand this ref type here
          onPress={() => ref.current?.dismiss()}
        />
      )}
    >
      <BottomSheetView style={styles.container}>
        <Text size="xl" bold style={styles.movieTitle}>
          {movie.title}
        </Text>
        <Button
          onPress={toggleSaveMovie}
          leftIcon={<Feather name={movie.saved ? 'minus' : 'plus'} size={24} />}
        >
          {movie.saved ? 'Remove from list' : 'Add to list'}
        </Button>
        <Button leftIcon={<Feather name="eye" size={32} />}>Watch</Button>
        <Button
          // @ts-expect-error: TS doesn't understand this ref type here
          onPress={() => ref.current?.dismiss()}
        >
          Done
        </Button>
      </BottomSheetView>
    </BottomSheetModal>
  )
})

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    gap: 14,
    justifyContent: 'flex-end',
  },
  movieTitle: {
    textAlign: 'center',
  },
})

export default MovieSheet
