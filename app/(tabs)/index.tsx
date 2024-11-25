import PopularMovieCarousel from '@/components/home/popular-movie-carousel'
import { Box } from '@/components/ui/box'
import { Text } from '@/components/ui/text'
import { useGetPopularMovies } from '@/domains/movie/queries'
import { ScrollView } from 'react-native'

export default function Screen() {
  const { data, isLoading } = useGetPopularMovies()
  return (
    <ScrollView className="bg-background-dark">
      <Box>
        <PopularMovieCarousel movies={data || []} />
        <Box className="p-4 mt-2">
          <Box className="flex gap-2">
            <Text className="text-xl font-bold">Recommended</Text>
            <ScrollView horizontal>
              <Box className="flex flex-row gap-4">
                <Box className="w-32 h-32 bg-gray-300 rounded-md"></Box>
                <Box className="w-32 h-32 bg-gray-300 rounded-md"></Box>
                <Box className="w-32 h-32 bg-gray-300 rounded-md"></Box>
                <Box className="w-32 h-32 bg-gray-300 rounded-md"></Box>
                <Box className="w-32 h-32 bg-gray-300 rounded-md"></Box>
                <Box className="w-32 h-32 bg-gray-300 rounded-md"></Box>
                <Box className="w-32 h-32 bg-gray-300 rounded-md"></Box>
                <Box className="w-32 h-32 bg-gray-300 rounded-md"></Box>
                <Box className="w-32 h-32 bg-gray-300 rounded-md"></Box>
              </Box>
            </ScrollView>
          </Box>
        </Box>
      </Box>
    </ScrollView>
  )
}
