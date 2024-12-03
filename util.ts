export const getFullImageUrl = (path: string) => {
  return `https://image.tmdb.org/t/p/original${path}`
}
export const formatRuntime = (runtime: number) => {
  const hours = Math.floor(runtime / 60)
  const minutes = runtime % 60
  return `${hours}h ${minutes}m`
}
