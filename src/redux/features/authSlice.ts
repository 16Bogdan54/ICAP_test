import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import toast from "react-hot-toast";

const HOST = process.env.NEXT_PUBLIC_SERVER_HOST;

export const login = createAsyncThunk<Response, LoginInput>(
  "auth/login",
  async (loginInput, thunkAPI) => {
    try {
      const res = await axios.post(`${HOST}/api/login/`, loginInput);
      return res.data;
    } catch (e) {
      toast.error(e.message);

      return thunkAPI.rejectWithValue(e.message);
    }
  }
);

const initialState = {
  isLoggedIn: false,
  isLoading: false,
  error: "",
  username: "",
} as AuthInitialState;

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state, action) => {
      state.username = "";
      state.isLoggedIn = false;
      state.isLoading = false;
      state.error = "";
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.username = action.meta.arg.username;
        state.isLoggedIn = true;
        state.isLoading = false;
        state.error = "";
      })
      .addCase(login.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isLoggedIn = false;

        state.error = action.error.message;
      }),
});

export const authReducer = authSlice.reducer;
export const { logout } = authSlice.actions;
