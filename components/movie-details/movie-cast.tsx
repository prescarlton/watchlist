import { useMovieCast } from '@/domains/movie/queries'
import { Box } from '../ui/box'
import { Text } from '../ui/text'
import { ScrollView } from 'react-native-gesture-handler'
import { Image } from 'react-native'

export default function MovieCast({ movieId }: { movieId: number }) {
  const { data, isLoading } = useMovieCast(movieId)
  return (
    <Box className="flex gap-2">
      <Text className="text-xl font-bold ml-4">Cast & Crew</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="ps-4"
      >
        <Box className="flex-row gap-4">
          {data?.map((cast) => (
            <Box key={cast.id} className="items-center gap-1 w-24">
              <Box className="w-24 h-24 bg-background-dark/50 rounded-xl overflow-hidden">
                <Image
                  source={{ uri: cast.profile_path }}
                  alt={cast.name}
                  className="w-full h-full object-cover"
                />
              </Box>
              <Text className="text-sm text-center line-clamp-2">
                {cast.name}
              </Text>
              <Text className="text-xs opacity-80 text-center line-clamp-2">
                {cast.character}
              </Text>
            </Box>
          ))}
        </Box>
      </ScrollView>
    </Box>
  )
}
