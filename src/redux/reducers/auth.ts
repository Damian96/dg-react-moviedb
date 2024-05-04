import {createSlice} from '@reduxjs/toolkit'

// import {Movie} from "../../types/movie";
import {loadState} from "../localstorage";
import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../../constants/firebase";

export interface authState {
  token?: string
}

export const persistedState = loadState();

const initialState: authState = {
  token: persistedState && persistedState.auth ? persistedState.auth.token : undefined
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    login: (state, action) => {
      const {email, password} = action.payload;
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          userCredential.user.getIdToken().then(token => {
            state.token = token;
          })
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;

          console.log('firebaseError', errorCode);
          console.log('firebaseError', errorMessage);
          console.error(errorMessage);
        });
    },
    logout: (state, action) => {
      state.token = undefined;
    }
  },
})

// Action creators are generated for each case reducer function
export const {login, logout} = authSlice.actions

export default authSlice.reducer
