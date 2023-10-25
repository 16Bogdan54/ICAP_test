import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import AxiosError from "axios";

const HOST = process.env.NEXT_PUBLIC_SERVER_HOST;

export const fetchTableData = createAsyncThunk(
  "table/fetch",
  async (_, thunkAPI) => {
    try {
      const res = await axios.get(`${HOST}/api/table/`);

      return res.data.results;
    } catch (e) {
      if (e instanceof AxiosError || e instanceof Error)
        return thunkAPI.rejectWithValue(e);

      return thunkAPI.rejectWithValue("Something went wrong");
    }
  }
);

const initialState = {
  isLoading: false,
  error: "",
  posts: [],
} as TableInitialState;

export const tableSlice = createSlice({
  name: "table",
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      .addCase(fetchTableData.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = "";
        state.posts = action.payload;
      })
      .addCase(fetchTableData.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchTableData.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.error.message;
      }),
});

export const tableReducer = tableSlice.reducer;
export const {} = tableSlice.actions;
