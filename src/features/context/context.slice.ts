import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type InitialState = {
  currentApp: string;
};

const initialState: InitialState = {
  currentApp: 'default',
};

const AppContextSliceReducer = createSlice({
  name: 'appContext',
  initialState,
  reducers: {
    defaultApp: () => {
      return initialState;
    },
    open: (state, action: PayloadAction<{ appName: string }>) => {
      state.currentApp = action.payload.appName;
    },
  },
});

export default AppContextSliceReducer.reducer;
export const { open, defaultApp } = AppContextSliceReducer.actions;
