import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../Shared/utils/api";

export const updateRepositories = createAsyncThunk(
  "repositories/updateRepositories",
  async (value, { rejectWithValue, getState }) => {
    const { query } = getState();
    try {
      const result = await api(
        "get",
        `/repository?search=${encodeURIComponent(query.query || value)}`
      );
      return result.repositories;
    } catch (err) {
      return rejectWithValue([], err);
    }
  }
);

export const repositorySlice = createSlice({
  name: "repositories",
  initialState: {
    repositories: [],
    loading: false,
    error: null,
  },
  extraReducers: {
    [updateRepositories.pending]: (state) => {
      state.loading = true;
    },
    [updateRepositories.fulfilled]: (state, action) => {
      state.repositories = action.payload;
      state.loading = false;
    },
    [updateRepositories.rejected]: (state) => {
      state.error = false;
      state.loading = false;
    },
  },
});

const { reducer } = repositorySlice;

export default reducer;
