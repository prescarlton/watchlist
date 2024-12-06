import { Image, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { StyleSheet } from 'react-native-unistyles'

import { useMovieCast } from '@/domains/movie/queries'

import Card from '../ui/card'
import { Text } from '../ui/text'

export default function MovieCast({ movieId }: { movieId: number }) {
  const { data } = useMovieCast(movieId)
  return (
    <View style={styles.container}>
      <Text style={styles.header} size="lg" bold>
        Cast & Crew
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
      >
        <View style={styles.listWrapper}>
          {data?.map((cast) => (
            <View key={cast.id} style={styles.castWrapper}>
              <Card style={styles.castPhotoWrapper}>
                <Image
                  source={{ uri: cast.profile_path }}
                  alt={cast.name}
                  style={styles.castPhoto}
                />
              </Card>
              <Text size="sm" style={styles.castName} numberOfLines={2}>
                {cast.name}
              </Text>
              <Text size="xs" numberOfLines={2} style={styles.castCharacter}>
                {cast.character}
              </Text>
            </View>
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
    // paddingHorizontal: theme.space(4),
  },
  listWrapper: {
    flexDirection: 'row',
    gap: theme.space(4),
    paddingHorizontal: theme.space(4),
  },
  castWrapper: {
    alignItems: 'center',
    gap: theme.space(1),
    width: theme.space(24),
  },
  castPhotoWrapper: {
    width: theme.space(24),
    height: theme.space(24),
    overflow: 'hidden',
  },
  castPhoto: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  castName: {
    textAlign: 'center',
  },
  castCharacter: {
    textAlign: 'center',
    opacity: 0.8,
  },
}))
