import axios from "axios";

export const searchMovies = (s: string) => {
  return axios.get("https://api.themoviedb.org/3/search/movie?query="
    + encodeURI(s) + '&api_key=' + process.env.REACT_APP_TMDB_API_KEY);
}
