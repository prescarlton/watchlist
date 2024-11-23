import Page from '@/components/page'
import { Box } from '@/components/ui/box'
import { Card } from '@/components/ui/card'
import { Text } from '@/components/ui/text'
import { ScrollView } from 'react-native'

export default function Screen() {
  const movies = [
    {
      id: 1,
      title: 'The Shawshank Redemption',
      year: 1994,
      rating: 9.3,
      genre: 'Drama',
      director: 'Frank Darabont',
      cast: ['Tim Robbins', 'Morgan Freeman', 'Bob Gunton'],
    },
    {
      id: 2,
      title: 'The Godfather',
      year: 1972,
      rating: 9.2,
      genre: 'Crime, Drama',
      director: 'Francis Ford Coppola',
      cast: ['Marlon Brando', 'Al Pacino', 'James Caan'],
    },
    {
      id: 3,
      title: 'The Dark Knight',
      year: 2008,
      rating: 9.0,
      genre: 'Action, Crime, Drama',
      director: 'Christopher Nolan',
      cast: ['Christian Bale', 'Heath Ledger', 'Aaron Eckhart'],
    },
    {
      id: 4,
      title: '12 Angry Men',
      year: 1957,
      rating: 9.0,
      genre: 'Drama',
      director: 'Sidney Lumet',
      cast: ['Henry Fonda', 'Lee J. Cobb', 'Martin Balsam'],
    },
  ]
  return (
    <Page>
      <Text size="3xl">My List</Text>
      <ScrollView>
        <Box className="flex gap-2">
          {movies.map((movie) => (
            <Card key={movie.id}>
              <Box className="h-24 w-4 bg-blue-50 rounded-lg" />
              <Box className="flex flex-row gap-2">
                <Text size="lg" className="font-bold">
                  {movie.title}
                </Text>
                <Text size="lg">{movie.year}</Text>
              </Box>
              <Text size="md">{movie.genre}</Text>
            </Card>
          ))}
        </Box>
      </ScrollView>
    </Page>
  )
}
