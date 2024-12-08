import { useState } from 'react'
import { View } from 'react-native'
import { StyleSheet } from 'react-native-unistyles'

import GridView from '@/components/list/grid-view'
import ListView from '@/components/list/list-view'
import Page from '@/components/page'
import { Button } from '@/components/ui/button'
import { Text } from '@/components/ui/text'
import { useSavedMovies } from '@/domains/movie/queries'

export default function Screen() {
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const { data: savedMovies, isLoading } = useSavedMovies()
  const toggleView = () => setView((v) => (v === 'grid' ? 'list' : 'grid'))
  return (
    <Page>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text size="xl">My List</Text>
          <Button onPress={toggleView}>{view}</Button>
        </View>
        {isLoading ? (
          <Text>Loading</Text>
        ) : savedMovies ? (
          view === 'grid' ? (
            <GridView movies={savedMovies} />
          ) : (
            <ListView movies={savedMovies} />
          )
        ) : (
          <Text>{"You haven't saved any movies yet!"}</Text>
        )}
      </View>
    </Page>
  )
}
const styles = StyleSheet.create(({ space }) => ({
  container: {
    gap: space(4),
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
}))
