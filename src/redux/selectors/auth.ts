import {RootState} from "../configurestore";
import {createSelector} from "@reduxjs/toolkit";

// Selector to get the slice of state containing favorite movie IDs
export const selectAuthState = (state: RootState) => state.auth;

export const selectIsLoggedIn = createSelector(selectAuthState, state => {
  return state && (typeof state.token !== "undefined");
});

export const selectAuthMessage = createSelector(selectAuthState, state => {
  return state && (typeof state.message !== "undefined") ? state.message : null;
})
