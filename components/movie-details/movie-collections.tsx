import { Image, View } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'
import { Text } from '@/components/ui/text'
import { getFullImageUrl } from '@/util'

export default function MovieCollections({
  collection,
}: {
  collection: {
    id: number
    name: string
    poster_path: string
  }
} | null) {
  return collection ? (
    <View style={styles.container}>
      <Text size="lg" bold>
        Collections
      </Text>
      <View style={styles.collectionImageWrapper}>
        <Image
          source={{ uri: getFullImageUrl(collection.poster_path) }}
          alt={collection.name}
          style={styles.collectionImage}
        />
      </View>
    </View>
  ) : null
}

const styles = StyleSheet.create({
  container: {
    gap: 7,
    paddingHorizontal: 14,
  },
  scrollView: {
    paddingStart: 16,
  },
  collectionImageWrapper: {
    height: 168,
    width: 112,
    backgroundColor: '#ffffff15',
    borderRadius: 10,
    overflow: 'hidden',
  },
  collectionImage: {
    width: 112,
    height: 168,
    objectFit: 'cover',
  },
})
