function createMovieKeys() {
  const all = ['movies']
  return {
    all,
    popular: [...all, 'popular'],
    details: (id: number) => [...all, 'details', id],
    search: (query: string) => [...all, 'search', query],
    saved: [...all, 'saved'],
    watched: [...all, 'watched'],
    isSaved: (id: number) => [...all, 'saved', id],
    cast: (id: number) => [...all, 'cast', id],
    watchProviders: (id: number) => [...all, 'watchProviders', id],
    playingNow: [...all, 'playingNow'],
    similar: (id: number) => [...all, 'similar', id],
  }
}
export const movieKeys = createMovieKeys()
