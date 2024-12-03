import GridView from '@/components/list/grid-view'
import ListView from '@/components/list/list-view'
import Page from '@/components/page'
import { Box } from '@/components/ui/box'
import { Button, ButtonText } from '@/components/ui/button'
import { Text } from '@/components/ui/text'
import { useSavedMovies } from '@/domains/movie/queries'
import { useState } from 'react'

export default function Screen() {
  const [view, setView] = useState<'grid' | 'list'>('grid')
  const { data: savedMovies, isLoading } = useSavedMovies()
  const toggleView = () => setView((v) => (v === 'grid' ? 'list' : 'grid'))
  return (
    <Page>
      <Box className="flex-row justify-between">
        <Text size="3xl">My List</Text>
        <Button onPress={toggleView}>
          <ButtonText>{view}</ButtonText>
        </Button>
      </Box>
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
    </Page>
  )
}
