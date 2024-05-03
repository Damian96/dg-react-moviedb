import {configureStore} from '@reduxjs/toolkit'

import favoritesReducer, {favoritesState} from "./reducers/favorites";

export const rootReducer = {
  favorites: favoritesReducer
}

// Define the shape of the root state
export interface RootState {
  favorites: favoritesState;
}

export default configureStore({
  reducer: rootReducer,
})
