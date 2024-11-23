import SafeAreaPage from '@/components/page'
import { Box } from '@/components/ui/box'
import { Text } from '@/components/ui/text'
import { useLocalSearchParams } from 'expo-router'
import { Image } from 'react-native'

export default function MovieDetailsScreeen() {
  const { id } = useLocalSearchParams()
  return (
    <Box>
      <Box className="rounded-lg">
        <Image
          width={200}
          height={200}
          source={{
            uri: 'https://images.unsplash.com/photo-1612832460307-2f1b5d5f7f1c',
          }}
        />
      </Box>
      <Text>Movie Details Screen {id}</Text>
    </Box>
  )
}
