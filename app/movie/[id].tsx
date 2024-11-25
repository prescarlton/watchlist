import MovieHero from '@/components/common/movie-hero'
import { Box } from '@/components/ui/box'
import { Button } from '@/components/ui/button'
import { Divider } from '@/components/ui/divider'
import { Text } from '@/components/ui/text'
import { useMovieDetails } from '@/domains/movie/queries'
import { useSaveMovie } from '@/domains/movie/queries'
import { movieKeys } from '@/domains/movie/queries/keys'
import { Feather } from '@expo/vector-icons'
import { useQueryClient } from '@tanstack/react-query'
import { router, useLocalSearchParams } from 'expo-router'
import { ScrollView } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function MovieDetailsScreeen() {
  const { id } = useLocalSearchParams() as { id: string }
  const { data, isLoading } = useMovieDetails(id)
  const { top } = useSafeAreaInsets()
  const { mutateAsync: saveMovie } = useSaveMovie()
  const queryClient = useQueryClient()

  const onAddToList = async () => {
    if (!data) return
    saveMovie({
      movieId: data.id,
      title: data.title,
      poster: data.poster,
      backdrop: data.backdrop,
      year: data.release_date,
      category: data.genres.map((g) => g.name).join(', '),
    })
      .then(() => {
        alert('Movie added to list!')
        queryClient.invalidateQueries({ queryKey: movieKeys.saved })
      })
      .catch((err) => {
        alert('Error adding movie to list')
        console.error(err)
      })
  }

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
          <Feather name="more-horizontal" size={24} color="white" />
        </Button>
      </Box>
      <ScrollView>
        <MovieHero movie={data} showDetails />
        <Box className="flex gap-4 p-4 pb-12">
          <Box className="flex gap-2">
            <Text className="text-sm font-bold uppercase">{data.tagline}</Text>
            <Text className="">{data.overview}</Text>
          </Box>
          <Divider />
          <Button variant="outline">
            <Text>Rate, add to list, and watch</Text>
          </Button>
          <Divider />
          <Box className="flex gap-2">
            <Text className="text-sm font-bold uppercase">Genres</Text>
            <Text className="">
              {data.genres.map((g) => g.name).join(', ')}
            </Text>
          </Box>
          <Divider />
          <Box className="flex gap-2">
            <Text className="text-sm font-bold uppercase">Collections</Text>
            <Text className="">
              {data.belongs_to_collection?.name || 'No collection'}
            </Text>
          </Box>
          <Divider />
          <Box className="flex gap-2">
            <Text className="text-sm font-bold uppercase">
              Production Companies
            </Text>
            <Text className="">
              {data.production_companies.map((c) => c.name).join(', ')}
            </Text>
          </Box>
          <Divider />
          <Box className="flex gap-2">
            <Text className="text-sm font-bold uppercase">Copyright</Text>
            <Text className="">All data and images are from TMDB</Text>
          </Box>
        </Box>
      </ScrollView>
    </>
  )
}
