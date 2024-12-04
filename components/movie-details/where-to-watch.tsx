import { useWatchProviders } from '@/domains/movie/queries'
import { Box } from '../ui/box'
import { Text } from '../ui/text'
import { Image } from 'react-native'
import { getFullImageUrl } from '@/util'
import { FlatList, ScrollView } from 'react-native-gesture-handler'

export default function WhereToWatch({ movieId }: { movieId: number }) {
  const { data: providers, isLoading } = useWatchProviders(movieId)
  return providers ? (
    <Box className="gap-2">
      <Text className="pl-4 text-xl font-bold">Where to Watch</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        directionalLockEnabled
        alwaysBounceVertical={false}
        className="ps-4"
      >
        <FlatList
          contentContainerStyle={{ alignSelf: 'flex-start' }}
          data={providers}
          numColumns={Math.ceil(providers.length / 2)}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          directionalLockEnabled
          alwaysBounceVertical={false}
          renderItem={({ item, index }) => (
            <Box
              key={index}
              className="flex-row h-16 w-56 bg-background-dark/50 rounded-lg items-stretch p-2 my-1 mr-2 gap-2 overflow-hidden"
            >
              <Image
                source={{ uri: getFullImageUrl(item.logo_path) }}
                alt={item.provider_name}
                className="w-12 h-12 object-cover rounded-md"
              />
              <Box className="flex-1 justify-center">
                <Text className="font-bold text-sm">{item.watchtype}</Text>
                <Text className="text-white/50 text-xs">
                  {item.provider_name}
                </Text>
              </Box>
            </Box>
          )}
        />
      </ScrollView>
    </Box>
  ) : (
    <Text className="ml-4 text-xl font-bold">In Theaters Now</Text>
  )
}
