import Page from '@/components/page'
import { Box } from '@/components/ui/box'
import { Input, InputField } from '@/components/ui/input'
import { useSearchMovies } from '@/domains/movie/queries'
import { getFullImageUrl } from '@/util'
import { Link } from 'expo-router'
import { debounce } from 'lodash'
import { useState } from 'react'
import { Image, ScrollView } from 'react-native'

export default function Screen() {
  const [query, setQuery] = useState('')

  const { data, isLoading } = useSearchMovies(query)
  const onSearchChange = debounce((text: string) => {
    setQuery(text)
  }, 500)
  return (
    <Page>
      <Box className="flex gap-4">
        <Input variant="rounded" className="border-none outline-none">
          <InputField
            placeholder="Search"
            defaultValue={query}
            onChangeText={onSearchChange}
          />
        </Input>
        <ScrollView contentContainerClassName="pb-16">
          <Box className="flex-row flex-wrap gap-4">
            {data?.results.map((movie) => (
              <Link
                key={movie.id}
                href={{
                  pathname: '/movie/[id]',
                  params: { id: movie.id },
                }}
              >
                <Box key={movie.id}>
                  <Box className="flex items-center justify-center">
                    <Box className="w-32 h-48">
                      <Image
                        source={{ uri: getFullImageUrl(movie.poster_path) }}
                        alt={movie.title}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </Box>
                  </Box>
                </Box>
              </Link>
            ))}
          </Box>
        </ScrollView>
      </Box>
    </Page>
  )
}
