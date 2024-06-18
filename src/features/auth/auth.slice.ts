import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AuthStateType } from '../../types';
import { LocalStorage } from '../../util';

const initialState: AuthStateType = {
  userData: null,
  token: null,
  isAuthenticated: false,
};

const AuthSliceReducer = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: () => {
      return initialState;
    },
    setCredentials: (state, action: PayloadAction<AuthStateType>) => {
      state.userData = action.payload.userData;
      state.token = action.payload.token;

      LocalStorage.set('userInfo', state.userData);
      LocalStorage.set('tokens', state.token);
    },
  },
});

export default AuthSliceReducer.reducer;
export const { setCredentials, logout } = AuthSliceReducer.actions;
