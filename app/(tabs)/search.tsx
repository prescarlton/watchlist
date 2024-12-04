import MoviePosterCard from '@/components/common/movie-poster-card'
import Page from '@/components/page'
import { useSearchMovies } from '@/domains/movie/queries'
import { debounce } from 'lodash'
import { useState } from 'react'
import { ScrollView, StyleSheet, TextInput, View } from 'react-native'

export default function Screen() {
  const [query, setQuery] = useState('')

  const { data, isLoading } = useSearchMovies(query)

  const onSearchChange = debounce((text: string) => {
    setQuery(text)
  }, 500)

  return (
    <Page>
      <TextInput
        defaultValue={query}
        onChangeText={onSearchChange}
        style={styles.searchBox}
      />
      <ScrollView contentContainerStyle={{ paddingBottom: 64, paddingTop: 14 }}>
        <View style={styles.searchResults}>
          {data?.map((movie) => (
            <MoviePosterCard key={movie.id} movie={movie} />
          ))}
        </View>
      </ScrollView>
    </Page>
  )
}
const styles = StyleSheet.create({
  searchBox: {
    backgroundColor: '#ffffff30',
    height: 40,
    color: '#fff',
    borderRadius: 10,
    paddingHorizontal: 14,
  },
  searchResults: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 7,
  },
})
