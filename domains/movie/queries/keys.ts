function createMovieKeys() {
  const all = ['movies']
  return {
    all,
    popular: [...all, 'popular'],
    details: (id: string) => [...all, 'details', id],
    search: (query: string) => [...all, 'search', query],
  }
}
export const movieKeys = createMovieKeys()
