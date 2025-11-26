import { createSlice } from "@reduxjs/toolkit";
import type { UiState } from "../../types/ui.types";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: UiState = {
  globalLoading: false,
  globalError: null,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    startLoading(state) {
      state.globalError = null;
      state.globalLoading = true;
    },
    setError(state, actions: PayloadAction<string>) {
      state.globalError = actions.payload;
    },
    stopLoading(state){
        state.globalLoading = false;
    }
  },
});

export const {startLoading, setError, stopLoading} = uiSlice.actions;
export default uiSlice.reducer;
