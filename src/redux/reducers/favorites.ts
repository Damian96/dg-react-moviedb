import {createSlice} from '@reduxjs/toolkit'

import {Movie} from "../../types/movie";
import {loadState} from "../localstorage";

export interface favoritesState {
  movies: Movie[]
}

export const persistedState = loadState();

const initialState: favoritesState = {
  movies: persistedState ? persistedState.favorites.movies : []
}

export const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: initialState,
  reducers: {
    addFavorite: (state, action) => {
      const newMovie = action.payload as Movie;

      state.movies.push(newMovie);
    },
    removeFavorite: (state, action) => {
      const targetMovie = action.payload as Movie;

      state.movies = state.movies.filter((movie: Movie) => {
        return movie.id !== targetMovie.id;
      });
    }
  },
})

// Action creators are generated for each case reducer function
export const {addFavorite, removeFavorite} = favoritesSlice.actions

export default favoritesSlice.reducer
