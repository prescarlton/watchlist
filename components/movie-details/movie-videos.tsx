import { View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { StyleSheet } from 'react-native-unistyles'

import { Text } from '@/components/ui/text'

import Card from '../ui/card'

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
          <Card style={styles.videoCard}>
            <Text bold>No videos found</Text>
          </Card>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create(({ space }) => ({
  container: {
    gap: space(2),
  },
  header: {
    marginLeft: space(4),
  },
  scrollView: {
    paddingStart: space(4),
    paddingVertical: space(1),
  },
  videoList: {
    flexDirection: 'row',
    gap: space(4),
  },
  videoCard: {
    width: space(60),
    height: space(32),
    alignItems: 'center',
    justifyContent: 'center',
  },
}))
