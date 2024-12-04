import { Image, StyleSheet, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

import { useMovieCast } from '@/domains/movie/queries'

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
              <View style={styles.castPhotoWrapper}>
                <Image
                  source={{ uri: cast.profile_path }}
                  alt={cast.name}
                  style={styles.castPhoto}
                />
              </View>
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

const styles = StyleSheet.create({
  container: {
    gap: 7,
  },
  header: {
    marginLeft: 16,
  },
  scrollView: {
    paddingStart: 16,
  },
  listWrapper: {
    flexDirection: 'row',
    gap: 14,
  },
  castWrapper: {
    alignItems: 'center',
    gap: 3,
    width: 84,
  },
  castPhotoWrapper: {
    width: 84,
    height: 84,
    backgroundColor: '#ffffff15',
    borderRadius: 10,
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
})
