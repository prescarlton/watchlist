import { ScrollView } from 'react-native-gesture-handler'
import { Box } from '../ui/box'
import { Text } from '../ui/text'

export default function MovieMedia({ movieId }: { movieId: number }) {
  return (
    <Box className="gap-2">
      <Text className="text-xl font-bold ml-4">Videos</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="ps-4"
      >
        <Box className="flex-row gap-4">
          <Box className="w-64 h-36 bg-background-dark/50 rounded-xl overflow-hidden items-center justify-center">
            <Text className="text-white text-lg font-bold">
              No videos found
            </Text>
          </Box>
          <Box className="w-64 h-36 bg-background-dark/50 rounded-xl overflow-hidden items-center justify-center">
            <Text className="text-white text-lg font-bold">
              No videos found
            </Text>
          </Box>
          <Box className="w-64 h-36 bg-background-dark/50 rounded-xl overflow-hidden items-center justify-center">
            <Text className="text-white text-lg font-bold">
              No videos found
            </Text>
          </Box>
          <Box className="w-64 h-36 bg-background-dark/50 rounded-xl overflow-hidden items-center justify-center">
            <Text className="text-white text-lg font-bold">
              No videos found
            </Text>
          </Box>
        </Box>
      </ScrollView>
    </Box>
  )
}
