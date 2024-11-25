function createMovieKeys() {
  const all = ['movies']
  return {
    all,
    popular: [...all, 'popular'],
    details: (id: string) => [...all, 'details', id],
    search: (query: string) => [...all, 'search', query],
    saved: [...all, 'saved'],
    watched: [...all, 'watched'],
    isSaved: (id: number) => [...all, 'saved', id],
  }
}
export const movieKeys = createMovieKeys()
