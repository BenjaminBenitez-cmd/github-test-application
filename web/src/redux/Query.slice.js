import { createSlice } from "@reduxjs/toolkit";

export const querySlice = createSlice({
  name: "query",
  initialState: {
    query: "",
    loading: false,
    error: null,
  },
  reducers: {
    updateQuery: (state, action) => {
      state.query = action.payload;
    },
  },
});

const { reducer, actions } = querySlice;
export const { updateQuery } = actions;

export default reducer;
