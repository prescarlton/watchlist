import { Movie } from '@/domains/movie/movie.model'
import { Box } from '../ui/box'
import { Text } from '../ui/text'
import { useEffect, useState } from 'react'
import { Image } from 'react-native'
import { getFullImageUrl } from '@/util'
import { LinearGradient } from 'expo-linear-gradient'
import { Divider } from '../ui/divider'

interface TrendingMoviesCarouselProps {
  movies: Movie[]
}

export default function TrendingMoviesCarousel({
  movies,
}: TrendingMoviesCarouselProps) {
  const [selectedIdx, setSelectedIdx] = useState(0)

  // every 2 seconds, increment the selected index
  useEffect(() => {
    const interval = setInterval(() => {
      // if selected idx is going to be greater than number of movies, reset to 0
      setSelectedIdx((prev) => (prev + 1 >= movies.length ? 0 : prev + 1))
    }, 4000)
    return () => {
      clearInterval(interval)
    }
  }, [])

  // get the 5 indexes surrounding the selected index. the min should never be less than 0
  const dots = Array.from({ length: 5 }, (_, idx) =>
    Math.max(0, selectedIdx - 2 + idx),
  )

  return <Box className="h-full"></Box>
}
