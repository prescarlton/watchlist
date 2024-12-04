import { Image, StyleSheet, View } from 'react-native'
import { FlatList, ScrollView } from 'react-native-gesture-handler'

import { Text } from '@/components/ui/text'
import { useWatchProviders } from '@/domains/movie/queries'
import { getFullImageUrl } from '@/util'

export default function WhereToWatch({ movieId }: { movieId: number }) {
  const { data: providers } = useWatchProviders(movieId)
  return providers?.length ? (
    <View style={styles.container}>
      <Text style={styles.header} bold size="lg">
        Where to Watch
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        directionalLockEnabled
        alwaysBounceVertical={false}
        style={styles.scrollView}
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
            <View key={index} style={styles.watchProvider}>
              <Image
                source={{ uri: getFullImageUrl(item.logo_path) }}
                alt={item.provider_name}
                style={styles.watchProviderLogo}
              />
              <View style={styles.watchProviderName}>
                <Text size="sm" bold>
                  {item.watchtype}
                </Text>
                <Text size="xs">{item.provider_name}</Text>
              </View>
            </View>
          )}
        />
      </ScrollView>
    </View>
  ) : (
    <Text size="lg" style={{ marginLeft: 16 }} bold>
      In Theaters Now
    </Text>
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
  watchProvider: {
    flexDirection: 'row',
    height: 56,
    width: 196,
    gap: 8,
    backgroundColor: '#ffffff15',
    borderRadius: 8,
    padding: 8,
    marginVertical: 4,
    marginRight: 8,
  },
  watchProviderLogo: {
    width: 42,
    height: 42,
    objectFit: 'cover',
    borderRadius: 10,
  },
  watchProviderName: {
    flex: 1,
    justifyContent: 'center',
  },
})
