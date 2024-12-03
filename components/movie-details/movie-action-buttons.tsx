import { MovieDetails } from '@/domains/movie/movie.model'
import { Box } from '../ui/box'
import { Button } from '../ui/button'
import { FontAwesome } from '@expo/vector-icons'

export default function MovieActionButtons({
  movie,
  onPressBookmark,
  onPressWatch,
}: {
  movie: MovieDetails
  onPressBookmark: () => void
  onPressWatch: () => void
}) {
  return (
    <Box className="px-24 flex-row items-center justify-between gap-4">
      <Button
        className="w-16 h-16 rounded-full bg-background-muted p-0"
        onPress={onPressBookmark}
      >
        <FontAwesome
          name={movie.saved ? 'bookmark' : 'bookmark-o'}
          size={24}
          color="white"
        />
      </Button>
      <Button
        className="w-16 h-16 rounded-full bg-background-muted p-0"
        onPress={onPressWatch}
      >
        <FontAwesome
          name={movie.watched ? 'eye-slash' : 'eye'}
          size={24}
          color="white"
        />
      </Button>
      <Button className="w-16 h-16 rounded-full bg-background-muted p-0">
        <FontAwesome name="send-o" size={24} color="white" />
      </Button>
    </Box>
  )
}
