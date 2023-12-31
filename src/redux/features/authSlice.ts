import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";
import AxiosError from "axios";

const HOST = process.env.NEXT_PUBLIC_SERVER_HOST;

export const login = createAsyncThunk<Response, LoginInput>(
  "auth/login",
  async (loginInput, thunkAPI) => {
    try {
      const res = await axios.post(`${HOST}/api/login/`, loginInput);
      return res.data;
    } catch (e) {
      if (e instanceof AxiosError || e instanceof Error)
        return thunkAPI.rejectWithValue(e);

      return thunkAPI.rejectWithValue("Something went wrong");
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
    logout: (state) => {
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
