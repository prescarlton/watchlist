import { FontAwesome } from '@expo/vector-icons'
import { Box } from '../ui/box'
import { Text } from '../ui/text'

export default function MovieRating({ rating }: { rating: number }) {
  return (
    <Box className="flex-row items-center opacity-80 gap-1">
      <FontAwesome name={'star'} size={12} color={'#eab308'} />
      <Text className="text-lg font-bold text-yellow-500 mr-1">
        {rating.toFixed(1)}
      </Text>
    </Box>
  )
}
