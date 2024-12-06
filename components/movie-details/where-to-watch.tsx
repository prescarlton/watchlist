import { Image, View } from 'react-native'
import { FlatList, ScrollView } from 'react-native-gesture-handler'
import { StyleSheet } from 'react-native-unistyles'

import { Text } from '@/components/ui/text'
import { useWatchProviders } from '@/domains/movie/queries'
import { getFullImageUrl } from '@/util'

import Card from '../ui/card'

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
            <Card key={index} style={styles.watchProvider}>
              <Image
                source={{ uri: getFullImageUrl(item.logo_path) }}
                alt={item.provider_name}
                style={styles.watchProviderLogo}
              />
              <View style={styles.watchProviderName}>
                <Text size="sm" bold>
                  {item.watchtype}
                </Text>
                <Text size="xs" numberOfLines={2}>
                  {item.provider_name}
                </Text>
              </View>
            </Card>
          )}
        />
      </ScrollView>
    </View>
  ) : null
}

const styles = StyleSheet.create((theme) => ({
  container: {
    gap: theme.space(2),
  },
  header: {
    marginLeft: theme.space(4),
  },
  scrollView: {
    paddingHorizontal: theme.space(4),
  },
  watchProvider: {
    flexDirection: 'row',
    width: theme.space(60),
    height: theme.space(16),
    gap: theme.space(2),
    padding: theme.space(2),
    marginVertical: theme.space(1),
    marginRight: theme.space(2),
  },
  watchProviderLogo: {
    width: theme.space(12),
    height: theme.space(12),
    objectFit: 'cover',
    borderRadius: theme.radius.lg,
  },
  watchProviderName: {
    flex: 1,
    justifyContent: 'center',
  },
}))
