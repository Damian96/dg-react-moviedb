import {configureStore} from '@reduxjs/toolkit'
import {saveState} from './localstorage'; // <-- our utility of localstorage

import favoritesReducer, {favoritesState} from "./reducers/favorites";
import {debounce} from "../utilities/debounce";


export const rootReducer = {
  favorites: favoritesReducer
}

// Define the shape of the root state
export interface RootState {
  favorites: favoritesState;
}

const store = configureStore({
  reducer: rootReducer
})

store.subscribe(debounce(() => {
  saveState({
    favorites: store.getState().favorites, // <--- where we save data to localstorage  once every 1000ms
  });
}, 1000));

export default store
