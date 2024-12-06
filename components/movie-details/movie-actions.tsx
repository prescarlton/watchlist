import { FontAwesome } from '@expo/vector-icons'
import { useQueryClient } from '@tanstack/react-query'
import { View } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'

import { MovieDetails } from '@/domains/movie/movie.model'
import { useSaveMovie } from '@/domains/movie/queries'
import { movieKeys } from '@/domains/movie/queries/keys'
import { useUnsaveMovie } from '@/domains/movie/queries/use-unsave-movie'

import { Button } from '../ui/button'

interface MovieActionsProps {
  movie: MovieDetails
}
export default function MovieActions({ movie }: MovieActionsProps) {
  const { mutateAsync: saveMovie } = useSaveMovie()
  const { mutateAsync: unsaveMovie } = useUnsaveMovie()
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
    <View style={styles.container}>
      <Button
        leftIcon={
          <FontAwesome
            name={movie.saved ? 'bookmark' : 'bookmark-o'}
            size={16}
            color={movie.saved ? 'black' : 'white'}
          />
        }
        variant={movie.saved ? 'solid' : 'outline'}
        style={styles.button}
        onPress={toggleSaveMovie}
      >
        {movie.saved ? 'Added to list' : 'Add to list'}
      </Button>
      <Button
        leftIcon={<FontAwesome name="check" size={16} />}
        style={styles.button}
      >
        Watch
      </Button>
    </View>
  )
}

const styles = StyleSheet.create((theme) => ({
  container: {
    flexDirection: 'row',
    gap: theme.space(2),
    marginTop: theme.space(2),
  },
  button: {
    flex: 1,
  },
}))
