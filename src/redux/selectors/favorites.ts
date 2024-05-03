import {Movie} from "../../types/movie";
import {RootState} from "../configurestore";
import {createSelector} from "@reduxjs/toolkit";

// Selector to get the slice of state containing favorite movie IDs
export const selectFavoriteMovies = (state: RootState) => state.favorites;

// Selector to get the movie ID being checked for favorite status
const selectMovie = (_: RootState, movie: Movie) => movie;

// Selector to determine if a movie is marked as favorite
export const selectIsFavorite = createSelector(
  [selectFavoriteMovies, selectMovie],
  ({movies}, needle) => {
    for (let movie of movies) {
      if (movie.id === needle.id) return true;
    }
    return false;
  }
);
