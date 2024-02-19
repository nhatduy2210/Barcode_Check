import { createSlice } from '@reduxjs/toolkit';

import { AuthState } from '@/models';

const initialState = {
  isAuth: false,
  access_token: null,
  refresh_token: null,
} as AuthState;

export const AuthSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetAuth: (state: AuthState) => {
      state.isAuth = false;
      state.access_token = null;
      state.refresh_token = null;
    },
  },
});

export const { resetAuth } = AuthSlice.actions;

export const getAuthState = (state: { auth: AuthState }) => state.auth;

export default AuthSlice.reducer;
