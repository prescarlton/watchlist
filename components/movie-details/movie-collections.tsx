import { Image } from 'react-native'
import { Box } from '../ui/box'
import { Text } from '../ui/text'
import { getFullImageUrl } from '@/util'

export default function MovieCollections({
  collection,
}: {
  collection: {
    id: number
    name: string
    poster_path: string
  }
} | null) {
  return collection ? (
    <Box className="flex gap-2 px-4">
      <Text className="text-xl font-bold ">Collections</Text>
      <Box className="h-48 w-32 bg-background-muted rounded-xl overflow-hidden">
        <Image
          source={{ uri: getFullImageUrl(collection.poster_path) }}
          alt={collection.name}
          className="w-full h-full object-cover"
        />
      </Box>
    </Box>
  ) : null
}
