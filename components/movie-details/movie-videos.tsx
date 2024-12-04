import { ScrollView } from 'react-native-gesture-handler'
import { Text } from '@/components/ui/text'
import { StyleSheet, View } from 'react-native'

export default function MovieVideos({ movieId }: { movieId: number }) {
  return (
    <View style={styles.container}>
      <Text style={styles.header} size="lg" bold>
        Videos
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
      >
        <View style={styles.videoList}>
          <View style={styles.videoCard}>
            <Text bold>No videos found</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    gap: 8,
  },
  header: {
    marginLeft: 16,
  },
  scrollView: {
    paddingStart: 16,
  },
  videoList: {
    flexDirection: 'row',
    gap: 16,
  },
  videoCard: {
    width: 236,
    height: 124,
    backgroundColor: '#ffffff15',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
})
