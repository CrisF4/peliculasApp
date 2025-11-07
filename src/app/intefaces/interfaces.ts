export interface RespuestaTMDB {
  page:          number;
  results:       Pelicula[];
  total_pages:   number;
  total_results: number;
}

export interface Pelicula {
  adult:             boolean;
  backdrop_path:     null | string;
  genre_ids:         number[];
  id:                number;
  original_language: string;
  original_title:    string;
  overview:          string;
  popularity:        number;
  poster_path:       string;
  release_date:      Date;
  title:             string;
  video:             boolean;
  vote_average:      number;
  vote_count:        number;
}

export interface PeliculaDetalle {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: null;
  budget: number;
  genres: Genre[];
  homepage: string;
  id: number;
  imdb_id: string;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: Productioncompany[];
  production_countries: Productioncountry[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: Spokenlanguage[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

interface Spokenlanguage {
  english_name: string;
  iso_639_1: string;
  name: string;
}

interface Productioncountry {
  iso_3166_1: string;
  name: string;
}

interface Productioncompany {
  id: number;
  logo_path: null | string;
  name: string;
  origin_country: string;
}

interface Genre {
  id: number;
  name: string;
}


export interface RespuestaCredits {
  id: number;
  cast: Cast[];
  crew: Crew[];
}

export interface Crew {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: null | string;
  credit_id: string;
  department: string;
  job: string;
}

export interface Cast {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: null | string;
  cast_id: number;
  character: string;
  credit_id: string;
  order: number;
}
