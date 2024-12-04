import { FontAwesome } from '@expo/vector-icons'
import { Text } from '@/components/ui/text'
import { StyleSheet, View } from 'react-native'

export default function MovieRating({ rating }: { rating: number }) {
  return (
    <View style={styles.container}>
      <FontAwesome name={'star'} size={12} color={'#eab308'} />
      <Text bold style={styles.text}>
        {rating.toFixed(1)}
      </Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    opacity: 0.8,
  },
  text: {
    color: '#eab308',
  },
})
