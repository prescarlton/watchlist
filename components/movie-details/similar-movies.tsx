import { View } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'

import { Text } from '@/components/ui/text'

export default function SimilarMovies({ movieId }: { movieId: number }) {
  return (
    <View style={styles.container}>
      <Text size="lg" bold>
        Similar Films
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 7,
    paddingHorizontal: 14,
  },
})
