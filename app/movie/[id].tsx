import MovieHero from '@/components/common/movie-hero'
import { Box } from '@/components/ui/box'
import { Button } from '@/components/ui/button'
import { Text } from '@/components/ui/text'
import { useMovieDetails } from '@/domains/movie/queries/use-movie-details'
import { Feather } from '@expo/vector-icons'
import { router, useLocalSearchParams } from 'expo-router'
import { ScrollView } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function MovieDetailsScreeen() {
  const { id } = useLocalSearchParams() as { id: string }
  const { data, isLoading } = useMovieDetails(id)
  const { top } = useSafeAreaInsets()
  return !data || isLoading ? (
    <Text>Loading...</Text>
  ) : (
    <>
      <Box
        className="absolute left-0 right-0 z-10 flex flex-row items-center justify-between"
        style={{
          marginTop: top,
        }}
      >
        <Button
          onPress={() => router.back()}
          className="rounded-full bg-transparent"
        >
          <Feather name="arrow-left" size={24} color="white" />
        </Button>
        <Button className="bg-transparent">
          <Feather name="plus" size={24} color="white" />
        </Button>
      </Box>
      <ScrollView>
        <MovieHero movie={data} showDetails />
        <Box className="flex gap-4 p-4">
          <Button className="rounded-full bg-white/20">
            <Text>Add to List</Text>
          </Button>
          <Box className="flex gap-2">
            <Text className="text-2xl font-bold">Overview</Text>
            <Text className="">{data.overview}</Text>
          </Box>
        </Box>
      </ScrollView>
    </>
  )
}
