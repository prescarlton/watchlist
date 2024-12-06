import { Feather } from '@expo/vector-icons'
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet'
import { useQueryClient } from '@tanstack/react-query'
import { forwardRef } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import { StyleSheet } from 'react-native-unistyles'

import BottomSheetBackdrop from '@/components/ui/bottom-sheet-backdrop'
import { Button } from '@/components/ui/button'
import { MovieDetails } from '@/domains/movie/movie.model'
import { useSaveMovie } from '@/domains/movie/queries'
import { movieKeys } from '@/domains/movie/queries/keys'
import { useUnsaveMovie } from '@/domains/movie/queries/use-unsave-movie'

import { Divider } from '../ui/divider'
import { Text } from '../ui/text'

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
      handleStyle={styles.handle}
      style={{ paddingBottom: bottom }}
      backdropComponent={(props) => (
        <BottomSheetBackdrop
          {...props}
          // @ts-expect-error: TS doesn't understand this ref type here
          onPress={() => ref.current?.dismiss()}
        />
      )}
    >
      <BottomSheetView style={styles.sheetView}>
        <Text style={styles.movieTitle} bold>
          {movie.title}
        </Text>
        <Button
          onPress={toggleSaveMovie}
          leftIcon={<Feather name={movie.saved ? 'minus' : 'plus'} size={24} />}
          variant="ghost"
          style={styles.action}
        >
          {movie.saved ? 'Remove from list' : 'Add to list'}
        </Button>
        <Divider />
        <Button
          variant="ghost"
          style={styles.action}
          leftIcon={<Feather name="check" size={24} />}
        >
          Mark as watched
        </Button>
      </BottomSheetView>
    </BottomSheetModal>
  )
})

const styles = StyleSheet.create((theme) => ({
  handle: {
    backgroundColor: theme.colors.card,
    borderTopLeftRadius: theme.radius.xl,
    borderTopRightRadius: theme.radius.xl,
  },
  sheetView: {
    gap: theme.space(4),
    zIndex: 9999,
    backgroundColor: theme.colors.card,
    padding: theme.space(4),
    paddingTop: 0,
    paddingBottom: theme.space(16),
    justifyContent: 'flex-end',
    borderBottomLeftRadius: theme.radius.lg,
    borderBottomRightRadius: theme.radius.lg,
  },
  movieTitle: {
    textAlign: 'center',
    marginBottom: theme.space(2),
    marginVertical: theme.space(1),
  },
  action: {
    justifyContent: 'flex-start',
  },
}))

export default MovieSheet
