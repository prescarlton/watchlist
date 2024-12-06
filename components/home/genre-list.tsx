import { View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { StyleSheet } from 'react-native-unistyles'

import Card from '../ui/card'
import { Text } from '../ui/text'

export default function GenreList() {
  const genres = [
    { name: 'Action', color: '#FF5733' },
    { name: 'Adventure', color: '#FFA500' },
    { name: 'Comedy', color: '#FFD700' },
    { name: 'Drama', color: '#8B4513' },
    { name: 'Fantasy', color: '#9370DB' },
    { name: 'Horror', color: '#8B0000' },
    { name: 'Mystery', color: '#4B0082' },
    { name: 'Romance', color: '#FF69B4' },
    { name: 'Sci-Fi', color: '#00CED1' },
    { name: 'Thriller', color: '#708090' },
  ]
  return (
    <View style={styles.container}>
      <Text size="lg" bold>
        Genres
      </Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.list}>
          {genres.map((genre) => (
            <Card
              key={genre.name}
              style={[
                styles.genreCard,
                {
                  backgroundColor: genre.color,
                },
              ]}
            >
              <Text bold>{genre.name}</Text>
            </Card>
          ))}
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create((theme) => ({
  container: {
    marginTop: theme.space(4),
    gap: theme.space(2),
    padding: theme.space(4),
  },
  list: {
    flexDirection: 'row',
    gap: theme.space(4),
  },
  genreCard: {
    width: theme.space(48),
    height: theme.space(24),
    padding: theme.space(2),
    justifyContent: 'flex-end',
  },
}))
