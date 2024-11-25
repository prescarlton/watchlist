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
import { Image } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'
import ParallaxScroll from '@monterosa/react-native-parallax-scroll'
import { LinearGradient } from 'expo-linear-gradient'
import { getFullImageUrl } from '@/util'

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
    <Box className="bg-background-dark">
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
      <ParallaxScroll
        renderParallaxBackground={() => <MovieHero movie={data} />}
        parallaxHeight={300}
        parallaxBackgroundScrollSpeed={2.5}
        showsVerticalScrollIndicator={false}
      >
        <Box className="flex gap-4 p-4 pb-12 bg-background-dark">
          <LinearGradient
            colors={['#18171900', '#181719']}
            style={{
              position: 'absolute',
              top: -150,
              left: 0,
              right: 0,
              height: 150,
            }}
          />
          <Box className="flex flex-row justify-between items-center absolute -top-10 left-0 right-0 px-4">
            <Box className="flex gap-2 max-w-[50%]">
              <Text className="text-3xl font-bold mb-2">{data.title}</Text>
              <Box className="flex flex-row items-center gap-2">
                <Text className="opacity-50">{data.year}</Text>
                <Divider orientation="vertical" />
                <Text className="opacity-50">{data.runtime} mins</Text>
              </Box>
            </Box>
            <Image
              source={{ uri: getFullImageUrl(data.poster) }}
              style={{ width: 125, height: 190 }}
              className="rounded-lg border"
            />
          </Box>
          <Box className="flex gap-2 mt-40">
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
      </ParallaxScroll>
    </Box>
  )
}
