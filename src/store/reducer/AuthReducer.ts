import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { authApi } from 'src/api';
import { setToken } from 'src/utils/setToken';
import { AppState } from '../store';

interface IInitState {
  user: any;
  isAuthenticated: boolean;
  isLoading: boolean;
}

const initialState: IInitState = {
  isAuthenticated: false,
  isLoading: true,
  user: null
};

export const login = createAsyncThunk('auth/login', async (tokenId: string) => {
  try {
    const response = await authApi.login(tokenId);
    localStorage.setItem('access_token', response.data.data.access_token);
    localStorage.setItem('refresh_token', response.data.data.refresh_token);
    setToken(response.data.data.access_token);
    return response.data;
  } catch (error) {
    console.error(error);
    localStorage.removeItem('access_token');
    throw new Error(error);
  }
});

export const loadUser = createAsyncThunk('auth/loaduser', async () => {
  try {
    const res = await authApi.loadUser();
    return res.data;
  } catch (error) {
    console.error(error);
    localStorage.removeItem('access_token');
    setToken(null);
    throw new Error(error);
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthLoading(state, action) {
      state.isLoading = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.isLoading = false;
        state.user = action.payload.data.user;
      })
      .addCase(login.rejected, (state, action) => {
        console.log('login reject');
        state.isLoading = false;
      });
    builder
      .addCase(loadUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.isLoading = false;
        state.user = action.payload.data;
      })
      .addCase(loadUser.rejected, (state, action) => {
        console.log('load user reject');
        state.isLoading = false;
      });
  }
});

export const { setAuthLoading } = authSlice.actions;

export const authSelector = (state: AppState) => {
  return state.auth;
};

export default authSlice.reducer;
