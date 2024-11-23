function createMovieKeys() {
  const all = ['movies']
  return {
    all,
    popular: [...all, 'popular'],
  }
}
export const movieKeys = createMovieKeys()
