import {RootState} from "../configurestore";
import {createSelector} from "@reduxjs/toolkit";

// Selector to get the slice of state containing favorite movie IDs
export const selectModalsState = (state: RootState) => state.modals;

export const selectShowToast = createSelector(selectModalsState, state => {
  return state.showToast;
});

export const selectToastData = createSelector(selectModalsState, state => {
  return {message: state.toastMessage};
});
