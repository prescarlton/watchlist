import MoviePosterCard from '@/components/common/movie-poster-card'
import Page from '@/components/page'
import { Box } from '@/components/ui/box'
import { Button } from '@/components/ui/button'
import { Input, InputField, InputSlot } from '@/components/ui/input'
import { useSearchMovies } from '@/domains/movie/queries'
import { Feather } from '@expo/vector-icons'
import { debounce } from 'lodash'
import { useState } from 'react'
import { ScrollView } from 'react-native'

export default function Screen() {
  const [query, setQuery] = useState('')

  const { data, isLoading } = useSearchMovies(query)
  const onSearchChange = debounce((text: string) => {
    setQuery(text)
  }, 500)
  const clearSearch = () => {
    setQuery('')
  }
  return (
    <Page>
      <Box className="flex gap-4">
        <Input variant="rounded" className="bg-background-muted">
          <InputField
            placeholder="Search"
            defaultValue={query}
            onChangeText={onSearchChange}
          />
          {query && (
            <Button
              className="h-4 w-4 mr-4"
              variant="link"
              onPress={clearSearch}
            >
              <Feather name="x" size={16} color="white" />
            </Button>
          )}
        </Input>
        <ScrollView contentContainerClassName="pb-16">
          <Box className="flex-row flex-wrap gap-4">
            {data?.map((movie) => (
              <MoviePosterCard key={movie.id} movie={movie} />
            ))}
          </Box>
        </ScrollView>
      </Box>
    </Page>
  )
}
