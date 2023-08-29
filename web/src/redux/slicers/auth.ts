/* eslint-disable no-param-reassign */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import Cookies from 'universal-cookie';

import api from '~/services/api';

export interface State {
  user?: {
    username: string,
    role: string,
    name: string,
  }
  loading: 'pending' | 'succeeded' | 'failed';
}

const initialState: State = {
  user: undefined,
  loading: 'pending',
};

export const fetchSession = createAsyncThunk(
  'auth/fetchSession',
  async (_, { rejectWithValue }) => {
    const cookies = new Cookies();
    if (cookies.get('token')) {
      try {
        const response = await api.get('user/self');
        const { username, role, name } = response.data;
        return { username, role, name };
      } catch (error) {
        toast.error(error.response.data.message);
        // Use `err.response.data` as `action.payload` for a `rejected` action,
        // by explicitly returning it using the `rejectWithValue()` utility
      }
    }
    return rejectWithValue(_);
  },
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload.user;
    },
    logout: (state) => {
      const cookies = new Cookies();
      cookies.remove('token');
      state.user = undefined;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchSession.fulfilled, (state, action) => {
      // Add user to the state array
      state.user = action.payload;
      state.loading = 'succeeded';
    });
    builder.addCase(fetchSession.rejected, (state) => {
      // Add user to the state array
      state.user = undefined;
      state.loading = 'failed';
    });
  },
});

export const authSelector = (state: any) => state.auth;

// Action creators are generated for each case reducer function
export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
