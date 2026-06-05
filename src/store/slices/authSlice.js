import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authApi } from '../../api';

// Async Thunks
export const checkAuth = createAsyncThunk(
  'auth/checkAuth',
  async (_, { rejectWithValue }) => {
    try {
      const response = await authApi.getProfile();
      return response.data.user;
    } catch (err) {
      localStorage.removeItem('token');
      return rejectWithValue(err.response?.data?.message || 'Session expired');
    }
  },
  {
    condition: (_, { getState }) => {
      const { auth } = getState();
      if (!localStorage.getItem('token') || auth.user) {
        // Skip calling if no token, or user is already loaded
        return false;
      }
    }
  }
);

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await authApi.login(email, password);
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      return user;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to sign in');
    }
  }
);

export const register = createAsyncThunk(
  'auth/register',
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const response = await authApi.register(name, email, password);
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      return user;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Failed to register');
    }
  }
);

export const loginWithGoogle = createAsyncThunk(
  'auth/loginWithGoogle',
  async (credentialToken, { rejectWithValue }) => {
    try {
      const response = await authApi.googleLogin(credentialToken);
      const { token, user } = response.data;
      localStorage.setItem('token', token);
      return user;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || 'Google Authentication failed');
    }
  }
);

const initialState = {
  user: null,
  loading: true, // starts loading while checkAuth initializes
  error: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      localStorage.removeItem('token');
      state.user = null;
      state.error = null;
      state.loading = false;
    },
    clearError(state) {
      state.error = null;
    },
    setError(state, action) {
      state.error = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // checkAuth
      .addCase(checkAuth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(checkAuth.rejected, (state) => {
        state.loading = false;
        state.user = null;
      })
      // login
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // register
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // loginWithGoogle
      .addCase(loginWithGoogle.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginWithGoogle.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      })
      .addCase(loginWithGoogle.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logout, clearError, setError } = authSlice.actions;
export default authSlice.reducer;
