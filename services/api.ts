import axios from "axios";
import Constants from "expo-constants";

export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  overview: string;
}

export interface MovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

export const apiConfig = {
  baseUrl: "https://api.themoviedb.org/3",
  API_KEY: Constants.expoConfig?.extra?.movieApiKey,
  headers: {
    accept: "application/json",
    Authorization: `Bearer ${Constants.expoConfig?.extra?.movieApiKey}`,
  },
};

export const fetchMovies = async ({
  query,
}: {
  query?: string;
}): Promise<Movie[]> => {
  const endpoint = query
    ? `${apiConfig.baseUrl}/search/movie?query=${encodeURIComponent(query)}&include_adult=true`
    : `${apiConfig.baseUrl}/discover/movie?sort_by=popularity.desc&include_adult=true`;

  try {
    // console.log("Fetching movies from API...");
    // console.log(Constants.expoConfig?.extra?.movieApiKey);
    const response = await axios.get<MovieResponse>(`${endpoint}`, {
      headers: apiConfig.headers,
    });
    return response.data.results;
  } catch (error) {
    console.error("Error fetching movies:", error);
    return [];
  }
};

// Urls
// /discover/movie for getting the movies list,
//
