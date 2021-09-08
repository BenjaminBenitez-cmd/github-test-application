import { configureStore } from "@reduxjs/toolkit";
import BookmarksReducer from "./redux/Bookmark.slice";
import QuerySlice from "./redux/Query.slice";
import RepositorySlice from "./redux/Repository.slice";

export const store = configureStore({
  reducer: {
    bookmarks: BookmarksReducer,
    repositories: RepositorySlice,
    query: QuerySlice,
  },
});
