import { createSlice } from "@reduxjs/toolkit";
import { Courses } from "../types";

const initialState = {
  courses: [] as Courses,
  course: undefined,
  page: "",
};

const coursesSlice = createSlice({
  name: "coursesReducer",
  initialState,
  reducers: {
    setCourses: (state, action) => {
      state.courses = action.payload;
    },
    updateCourse: (state, action) => {
      const course = action.payload;
      state.courses = state.courses.map((c) =>
        c._id === course._id ? { ...c, ...course } : c,
      );
    },
    deleteCourse: (state, action) => {
      state.courses = state.courses.filter((c) => c._id !== action.payload);
    },
    setCourse: (state, action) => {
      state.course = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
});

export const { setCourses, updateCourse, deleteCourse, setCourse, setPage } =
  coursesSlice.actions;
export default coursesSlice.reducer;
