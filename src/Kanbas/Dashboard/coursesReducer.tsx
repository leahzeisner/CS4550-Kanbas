import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  course: undefined,
  page: "",
};

const coursesSlice = createSlice({
  name: "coursesReducer",
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
});

export const { setPage } = coursesSlice.actions;
export default coursesSlice.reducer;
