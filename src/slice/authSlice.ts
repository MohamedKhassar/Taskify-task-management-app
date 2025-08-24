import {
  createSlice,
  createAsyncThunk,
  type PayloadAction,
} from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { type User, type ApiErrorResponse } from "@/utils/types";

// Define your state
interface AuthState {
  message: string | null;
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: AuthState = {
  message: null,
  user: null,
  token: null,
  loading: false,
  error: null,
};

// Async thunk for signup
export const signupUser = createAsyncThunk<
  { user: User; token: string; message: string },
  User,
  { rejectValue: string }
>("auth/signupUser", async (userData, thunkAPI) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/auth/register`,
      userData
    );
    return response.data; // { user, token, message }
  } catch (err) {
    const error = err as AxiosError<ApiErrorResponse>;
    const message =
      error.response?.data.errors?.join(", ") ||
      error.response?.data.message ||
      "Network error";
    return thunkAPI.rejectWithValue(message);
  }
});

// Async thunk for login (example)
export const loginUser = createAsyncThunk<
  { user: User; token: string; message: string },
  { email: string; password: string },
  { rejectValue: string }
>("auth/loginUser", async (credentials, thunkAPI) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/auth/login`,
      credentials,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data; // { user, token, message }
  } catch (err) {
    const error = err as AxiosError<ApiErrorResponse>;
    const message =
      error.response?.data.errors?.join(", ") ||
      error.response?.data.message ||
      "Network error";
    return thunkAPI.rejectWithValue(message);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    loadUserFromStorage: (state) => {
      const user = localStorage.getItem("user");
      const token = localStorage.getItem("user");
      if (user&&token) {
        const parsedUser = JSON.parse(user);
        const parsedToken = JSON.parse(token);
        state.user = parsedUser || null;
        state.token = parsedToken || null;
      }
    },
    logout(state) {
      state.user = null;
      state.token = null;
      state.error = null;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Signup
    builder.addCase(signupUser.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    });
    builder.addCase(
      signupUser.fulfilled,
      (
        state,
        action: PayloadAction<{ user: User; token: string; message: string }>
      ) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.message = action.payload.message;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      }
    );
    builder.addCase(signupUser.rejected, (state, action) => {
      state.loading = false;
      state.message = null;
      state.error = action.payload || "Something went wrong";
    });

    // Login
    builder.addCase(loginUser.pending, (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    });
    builder.addCase(
      loginUser.fulfilled,
      (
        state,
        action: PayloadAction<{ user: User; token: string; message: string }>
      ) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.message = action.payload.message;
        localStorage.setItem("token", action.payload.token);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
      }
    );
    builder.addCase(loginUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || "Something went wrong";
    });
  },
});

export const { logout, clearError,loadUserFromStorage } = authSlice.actions;
export default authSlice.reducer;
