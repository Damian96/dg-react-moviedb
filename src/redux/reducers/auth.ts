import {createSlice} from '@reduxjs/toolkit'
import {loadState} from "../localstorage";

export interface authState {
  token?: string
  message?: string
}

export const persistedState = loadState();

const initialState: authState = {
  token: persistedState && persistedState.auth ? persistedState.auth.token : undefined,
  message: undefined
}

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    login: (state, action) => {
    },
    loginFailure: (state, action) => {
      const {message } = action.payload;
      state.token = undefined;
      state.message = message;
    },
    loginSuccess: (state, action) => {
      const {token} = action.payload
      state.token = token;
      state.message = 'You have successfully logged in!';
    },
    logout: (state, action) => {
      state.token = undefined;
    },
    register: (state, action) => {
    },
    registerSuccess: (state, action) => {
      const {token} = action.payload
      state.token = token;
      state.message = 'You have successfully registered!';
    },
    registerFailure: (state, action) => {
    }
  },
})

// Action creators are generated for each case reducer function
export const {
  login,
  loginFailure,
  loginSuccess,
  logout,
  register,
  registerSuccess,
  registerFailure
} = authSlice.actions

export default authSlice.reducer
