import { MovieDetails } from '@/domains/movie/movie.model'
import { BottomSheetModal, BottomSheetView } from '@gorhom/bottom-sheet'
import { Text } from '../ui/text'
import { Button, ButtonText } from '../ui/button'
import { useSaveMovie } from '@/domains/movie/queries'
import { useQueryClient } from '@tanstack/react-query'
import { movieKeys } from '@/domains/movie/queries/keys'
import { Feather } from '@expo/vector-icons'
import { useUnsaveMovie } from '@/domains/movie/queries/use-unsave-movie'
import BottomSheetBackdrop from '../ui/bottom-sheet-backdrop'
import { forwardRef } from 'react'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

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
      <BottomSheetView className="bg-transparent gap-4 justify-end">
        <Text className="text-center font-bold text-xl">{movie.title}</Text>
        <Button
          className="bg-background-muted shadow-xl rounded-xl"
          size="xl"
          onPress={toggleSaveMovie}
        >
          <ButtonText className="text-white">
            {movie.saved ? 'Remove from list' : 'Add to list'}
          </ButtonText>
          <Feather
            name={movie.saved ? 'minus' : 'plus'}
            color="white"
            size={24}
          />
        </Button>
        <Button className="bg-background-muted shadow-xl rounded-xl" size="xl">
          <ButtonText className="text-white">Watch</ButtonText>
          <Feather name="eye" color="white" size={32} />
        </Button>
        <Button
          className="bg-background-muted rounded-xl h-12 shadow-xl"
          size="xl"
          // @ts-expect-error: TS doesn't understand this ref type here
          onPress={() => ref.current?.dismiss()}
        >
          <ButtonText className="text-white">Done</ButtonText>
        </Button>
      </BottomSheetView>
    </BottomSheetModal>
  )
})

export default MovieSheet
