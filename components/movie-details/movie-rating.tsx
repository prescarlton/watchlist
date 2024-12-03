import { FontAwesome } from '@expo/vector-icons'
import { Box } from '../ui/box'
import { Text } from '../ui/text'

export default function MovieRating({ rating }: { rating: number }) {
  return (
    <Box className="flex-row items-center opacity-80 gap-1">
      <Text className="text-lg font-bold text-yellow-500 mr-1">
        {rating.toFixed(1)}
      </Text>
      {Array.from({ length: 5 }).map((_, i) => (
        <FontAwesome
          key={i}
          name={
            i < Math.floor(rating / 2)
              ? 'star'
              : i === Math.floor(rating / 2)
                ? 'star-half-o'
                : 'star-o'
          }
          size={12}
          color={i <= Math.floor(rating / 2) ? '#eab308' : 'white'}
        />
      ))}
    </Box>
  )
}
