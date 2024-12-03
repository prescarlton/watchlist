import { Box } from '../ui/box'
import { Text } from '../ui/text'

export default function SimilarMovies({ movieId }: { movieId: number }) {
  return (
    <Box className="gap-2 px-4">
      <Text className="text-xl font-bold">Similar Films</Text>
    </Box>
  )
}
