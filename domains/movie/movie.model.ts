export interface Movie {
  id: number
  movieId: number
  title: string
  poster: string
  backdrop: string
  year: string
  category: string
  watched: boolean
  saved: boolean
}
export interface MovieDetails extends Movie {
  adult: boolean
  belongs_to_collection: {
    id: number
    name: string
    poster_path: string
    backdrop_path: string
  }
  budget: number
  genres: {
    id: number
    name: string
  }[]
  homepage: string
  imdb_id: string
  origin_country: string[]
  original_language: string
  original_title: string
  overview: string
  popularity: number
  production_companies: {
    id: number
    logo_path: string
    name: string
    origin_country: string
  }[]
  production_countries: {
    iso_3166_1: string
    name: string
  }[]
  release_date: string
  revenue: number
  runtime: number
  spoken_languages: {
    english_name: string
    iso_639_1: string
    name: string
  }[]
  status: string
  tagline: string
  title: string
  video: boolean
  vote_average: number
  vote_count: number
}

export interface ListMoviesResponse {
  page: number
  results: Movie[]
  total_pages: number
  total_results: number
}

export interface CastMember {
  adult: boolean
  gender: number
  id: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path: string
  cast_id: number
  character: string
  credit_id: string
  order: number
}
export interface CrewMember {
  adult: boolean
  gender: number
  id: number
  known_for_department: string
  name: string
  original_name: string
  popularity: number
  profile_path: string
  credit_id: string
  department: string
  job: string
}
export interface GetWatchProvidersApiResponse {
  results: {
    US: {
      link: string
      ads: WatchProvider[]
      flatrate: WatchProvider[]
      rent: WatchProvider[]
      buy: WatchProvider[]
    }
  }
}
export interface WatchProvider {
  logo_path: string
  provider_id: number
  provider_name: string
  display_priority: number
  watchtype: string
}
