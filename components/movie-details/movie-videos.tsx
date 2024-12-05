import { FontAwesome } from '@expo/vector-icons'
import { Link } from 'expo-router'
import { View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { StyleSheet } from 'react-native-unistyles'

import { Text } from '@/components/ui/text'
import { useMovieVideos } from '@/domains/movie/queries'
import { getYoutubeUrl } from '@/util'

import Card from '../ui/card'

export default function MovieVideos({ movieId }: { movieId: number }) {
  const { data } = useMovieVideos(movieId)
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
          {data?.map((video) => (
            <Link href={getYoutubeUrl(video.key)} key={video.id}>
              <Card style={styles.videoCard}>
                <FontAwesome name="youtube-play" size={24} color="red" />
                <Text bold>{video.name}</Text>
              </Card>
            </Link>
          ))}
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create((theme) => ({
  container: {
    gap: theme.space(2),
  },
  header: {
    marginLeft: theme.space(4),
  },
  scrollView: {
    paddingStart: theme.space(4),
    paddingVertical: theme.space(1),
  },
  videoList: {
    flexDirection: 'row',
    gap: theme.space(4),
  },
  videoCard: {
    width: theme.space(60),
    height: theme.space(16),
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: theme.space(4),
    gap: theme.space(2),
  },
}))
