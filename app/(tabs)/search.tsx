import { debounce } from 'lodash'
import { useState } from 'react'
import { ScrollView, TextInput, View } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'

import MoviePosterCard from '@/components/common/movie-poster-card'
import Page from '@/components/page'
import { useSearchMovies } from '@/domains/movie/queries'

export default function Screen() {
  const [query, setQuery] = useState('')

  const { data } = useSearchMovies(query)

  const onSearchChange = debounce((text: string) => {
    setQuery(text)
  }, 500)

  return (
    <Page>
      <TextInput
        defaultValue={query}
        onChangeText={onSearchChange}
        style={styles.searchBox}
        // autoFocus
        autoCorrect={false}
      />
      <ScrollView
        contentContainerStyle={{ paddingBottom: 64, paddingTop: 14 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.searchResults}>
          {data?.map((movie) => (
            <MoviePosterCard key={movie.id} movie={movie} />
          ))}
        </View>
      </ScrollView>
    </Page>
  )
}
const styles = StyleSheet.create((theme) => ({
  searchBox: {
    backgroundColor: theme.colors.card,
    height: theme.space(10),
    color: theme.colors.text,
    borderRadius: theme.radius.lg,
    paddingHorizontal: theme.space(4),
  },
  searchResults: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: theme.space(2),
  },
}))
