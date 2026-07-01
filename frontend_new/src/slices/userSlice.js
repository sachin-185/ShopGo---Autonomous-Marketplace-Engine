import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api, { setAuthToken } from '../utils/api';

export const loginUser = createAsyncThunk(
  'user/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await api.post('/api/users/login', { email, password });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || 'Login failed');
    }
  }
);

export const registerUser = createAsyncThunk(
  'user/register',
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const response = await api.post('/api/users/register', { name, email, password });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || 'Registration failed');
    }
  }
);

export const getUserProfile = createAsyncThunk(
  'user/getProfile',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/api/users/profile');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data.message || 'Failed to get profile');
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState: { user: null, loading: false, error: null },
  reducers: {
    logout: (state) => {
      state.user = null;
      state.error = null;
      setAuthToken(null);
      localStorage.removeItem('userToken');
    },
    clearError: (state) => { state.error = null; },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        setAuthToken(action.payload.token);
        localStorage.setItem('userToken', action.payload.token);
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        setAuthToken(action.payload.token);
        localStorage.setItem('userToken', action.payload.token);
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(getUserProfile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUserProfile.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(getUserProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        localStorage.removeItem('userToken');
      });
  },
});

export const { logout, clearError } = userSlice.actions;
export default userSlice.reducer;