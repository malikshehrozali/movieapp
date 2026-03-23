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
  page = 1,
}: {
  query?: string;
  page?: number;
}): Promise<Movie[]> => {
  const endpoint = query
    ? `${apiConfig.baseUrl}/search/movie?query=${encodeURIComponent(query)}&include_adult=true&page=${page}`
    : `${apiConfig.baseUrl}/discover/movie?sort_by=popularity.desc&include_adult=true&page=${page}`;

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

export const fetchDetails = async (id: number): Promise<Movie> => {
  try {
    const response = await axios.get<Movie>(
      `${apiConfig.baseUrl}/movie/${id}?include_adult=true`,
      {
        headers: apiConfig.headers,
      },
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching movie details:", error);
    return [] as unknown as Movie;
  }
};

// Add this new function, leave fetchMovies completely untouched
export const fetchMoviesPaginated = async ({
  query,
  page = 1,
}: {
  query?: string;
  page?: number;
}): Promise<{ results: Movie[]; total_pages: number }> => {
  const endpoint = query
    ? `${apiConfig.baseUrl}/search/movie?query=${encodeURIComponent(query)}&include_adult=true&page=${page}`
    : `${apiConfig.baseUrl}/discover/movie?sort_by=popularity.desc&include_adult=true&page=${page}`;

  try {
    const response = await axios.get<MovieResponse>(endpoint, {
      headers: apiConfig.headers,
    });
    return {
      results: response.data.results,
      total_pages: response.data.total_pages,
    };
  } catch (error) {
    console.error("Error fetching movies:", error);
    return { results: [], total_pages: 0 };
  }
};
// Urls
// /discover/movie for getting the movies list,
//
