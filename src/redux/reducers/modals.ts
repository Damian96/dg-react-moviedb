import {createSlice} from '@reduxjs/toolkit'
import {loadState} from "../localstorage";

export interface modalsState {
  showToast: boolean,
  toastMessage: string
}

export const persistedState = loadState();

const initialState: modalsState = {
  showToast: false,
  toastMessage: ''
}

export const modalsSlice = createSlice({
  name: 'modals',
  initialState: initialState,
  reducers: {
    showToast: (state, action) => {
      state.showToast = true;
      state.toastMessage = action.payload;
    },
    hideToast(state, action) {
      state.showToast = false;
      state.toastMessage = ''
    }
  },
})

// Action creators are generated for each case reducer function
export const {showToast} = modalsSlice.actions

export default modalsSlice.reducer
