import {configureStore, } from '@reduxjs/toolkit'
import {saveState} from './localstorage'; // <-- our utility of localstorage
import favoritesReducer, {favoritesState} from "./reducers/favorites";
import authReducer, {authState} from "./reducers/auth";
import {debounce} from "../utilities/debounce";
import modalsReducer, {modalsState} from "./reducers/modals";
import authMiddleware from "./middleware/auth";

export const rootReducer = {
  favorites: favoritesReducer,
  auth: authReducer,
  modals: modalsReducer
}

// Define the shape of the root state
export interface RootState {
  favorites: favoritesState;
  auth?: authState,
  modals: modalsState
}

const store: any = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authMiddleware),
});

store.subscribe(debounce(() => {
  saveState({ // <--- where we save data to localstorage  once every 1000ms
    favorites: store.getState().favorites,
    auth: store.getState().auth,
    modals: store.getState().modals
  });
}, 1000));

export default store
