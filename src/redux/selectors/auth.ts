import {Movie} from "../../types/movie";
import {RootState} from "../configurestore";
import {createSelector} from "@reduxjs/toolkit";

// Selector to get the slice of state containing favorite movie IDs
export const selectAuthState = (state: RootState) => state.user;

// Selector to get the movie ID being checked for favorite status
// const selectMovie = (_: RootState, movie: Movie) => movie;

export const selectIsLoggedIn = createSelector(selectAuthState, state => {
  return state && (typeof state.token !== "undefined");
});
