import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import api from "../Shared/utils/api";

export const getBookmarks = createAsyncThunk(
  "bookmarks/getBookmarks",
  async (_, { rejectWithValue }) => {
    try {
      const result = await api("get", "/bookmark");
      return result.bookmarks;
    } catch (err) {
      return rejectWithValue([], err);
    }
  }
);

export const addBookmark = createAsyncThunk(
  "bookmarks/addBookmarks",
  async (values, { rejectWithValue }) => {
    try {
      await api("post", `/repository/${values.id}/bookmark`);
      return values;
    } catch (err) {
      return rejectWithValue([], err);
    }
  }
);

export const deleteBookmark = createAsyncThunk(
  "bookmarks/deleteBookmarks",
  async (id, { rejectWithValue }) => {
    try {
      await api("delete", `/repository/${id}/bookmark`);
      return id;
    } catch (err) {
      return rejectWithValue([], err);
    }
  }
);

export const bookmarksSlice = createSlice({
  name: "bookmarks",
  initialState: {
    bookmarks: [],
    loading: false,
    error: null,
  },
  extraReducers: {
    [getBookmarks.pending]: (state) => {
      state.loading = true;
    },
    [getBookmarks.fulfilled]: (state, action) => {
      state.bookmarks = action.payload;
      state.loading = false;
    },
    [getBookmarks.rejected]: (state) => {
      state.loading = false;
      state.error = "An error occured";
    },
    [addBookmark.pending]: (state) => {
      state.loading = true;
    },
    [addBookmark.fulfilled]: (state, action) => {
      state.bookmarks.push(action.payload);
      state.loading = false;
    },
    [addBookmark.rejected]: (state) => {
      state.loading = false;
      state.error = "An error occured";
    },
    [deleteBookmark.pending]: (state) => {
      state.loading = true;
    },
    [deleteBookmark.fulfilled]: (state, action) => {
      state.bookmarks = state.bookmarks.filter(
        (node) => node.id !== action.payload
      );
    },
    [deleteBookmark.rejected]: (state) => {
      state.loading = false;
      state.error = "An error occured";
    },
  },
});

const { reducer } = bookmarksSlice;

export default reducer;
