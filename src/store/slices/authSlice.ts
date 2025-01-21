import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { BASE_URL } from "../../config";
import api from "../../Api/Api";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (
    userData: {
      name: string;
      email: string;
      password: string;
      userrate: string;
    },
    thunkAPI
  ) => {
    try {
      const res = await api.post(`${BASE_URL}/user-register`, userData);
      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data || "Registration failed"
      );
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser",
  async (credentials: { email: string; password: string }, thunkAPI) => {
    try {
      const res = await api.post(`${BASE_URL}/login`, credentials);
      return res.data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.response?.data || "Login failed");
    }
  }
);

interface AuthState {
  isLoading: boolean;
  user: {
    id: number | null;
    name: string | null;
    email: string | null;
    role: string | null;
    userrate: string | null;
  };
  token: string | null;
  error: string | null;
}

const initialState: AuthState = {
  isLoading: false,
  user: {
    id: null,
    name: null,
    email: null,
    role: null,
    userrate: null,
  },
  token: null,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = {
        id: null,
        name: null,
        email: null,
        role: null,
        userrate: null,
      };
      state.token = null;
      state.error = null;
      localStorage.clear();
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.user = {
          id: action.payload.userData.id,
          name: action.payload.userData.name,
          email: action.payload.userData.email,
          role: action.payload.userData.role,
          userrate: action.payload.userDate.userrate,
        };
        state.token = action.payload.token;
        state.error = null;

        localStorage.setItem("token", action.payload.token);
        // localStorage.setItem("email", action.payload.userData.email);
        // localStorage.setItem("name", action.payload.userData.name);
        localStorage.setItem("id", action.payload.userData.id);
        // localStorage.setItem("role", action.payload.userData.role);
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.user = {
          id: action.payload.userData.id,
          name: action.payload.userData.name,
          email: action.payload.userData.email,
          role: action.payload.userData.role,
          userrate: action.payload.userData.userrate,
        };
        state.token = action.payload.token;
        state.error = null;

        localStorage.setItem("token", action.payload.token);
        // localStorage.setItem("email", action.payload.userData.email);
        // localStorage.setItem("name", action.payload.userData.name);
        localStorage.setItem("id", action.payload.userData.id);
        // .setItem("role", action.payload.userData.role);
      })
      .addCase(loginUser.rejected, (state, action: PayloadAction<any>) => {
        state.isLoading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
