import { useWatchProviders } from '@/domains/movie/queries'
import { Box } from '../ui/box'
import { Text } from '../ui/text'
import { Image } from 'react-native'
import { getFullImageUrl } from '@/util'

export default function WhereToWatch({ movieId }: { movieId: number }) {
  const { data, isLoading } = useWatchProviders(movieId)
  return data ? (
    <Box className="gap-4 px-4">
      <Text className="text-xl font-bold">Where to Watch</Text>
      <Box className="flex-row items-center gap-2 justify-between">
        <Text className="opacity-80">Stream</Text>
        <Box className="flex-row gap-2">
          {data?.flatrate?.slice(0, 5).map((provider) => (
            <Box
              key={provider.provider_id}
              className="h-12 w-12 bg-background-muted rounded-lg overflow-hidden"
            >
              <Image
                source={{ uri: getFullImageUrl(provider.logo_path) }}
                alt={provider.provider_name}
                className="w-full h-full object-cover"
              />
            </Box>
          ))}
        </Box>
      </Box>
      <Box className="flex-row items-center gap-2 justify-between">
        <Text className="opacity-80">Rent</Text>
        <Box className="flex-row gap-2">
          {data?.rent?.slice(0, 5).map((provider) => (
            <Box
              key={provider.provider_id}
              className="h-12 w-12 bg-background-muted rounded-lg overflow-hidden"
            >
              <Image
                source={{ uri: getFullImageUrl(provider.logo_path) }}
                alt={provider.provider_name}
                className="w-full h-full object-cover"
              />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  ) : (
    <Text className="ml-4 text-xl font-bold">In Theaters Now</Text>
  )
}
