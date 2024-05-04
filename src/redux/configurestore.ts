import {configureStore} from '@reduxjs/toolkit'
import {saveState} from './localstorage'; // <-- our utility of localstorage

import favoritesReducer, {favoritesState} from "./reducers/favorites";
import authReducer, {authState} from "./reducers/auth";
import {debounce} from "../utilities/debounce";


export const rootReducer = {
  favorites: favoritesReducer,
  user: authReducer
}

// Define the shape of the root state
export interface RootState {
  favorites: favoritesState;
  user?: authState
}

const store = configureStore({
  reducer: rootReducer
})

store.subscribe(debounce(() => {
  saveState({ // <--- where we save data to localstorage  once every 1000ms
    favorites: store.getState().favorites,
    user: store.getState().user
  });
}, 1000));

export default store
