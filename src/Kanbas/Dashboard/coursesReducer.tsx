import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  course: undefined,
  page: "",
};

const coursesSlice = createSlice({
  name: "coursesReducer",
  initialState,
  reducers: {
    setCourse: (state, action) => {
      state.course = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
});

export const { setCourse, setPage } = coursesSlice.actions;
export default coursesSlice.reducer;
