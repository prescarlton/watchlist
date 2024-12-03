import { Box } from '../ui/box'
import { Text } from '../ui/text'

export default function MovieOverview({ overview }: { overview: string }) {
  return (
    <Box className="flex gap-2 pxd-4">
      <Text className="text-sm line-clamp-3">{overview}</Text>
    </Box>
  )
}
