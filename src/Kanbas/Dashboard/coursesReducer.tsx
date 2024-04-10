import { createSlice } from "@reduxjs/toolkit";
import { Courses } from "../types";

const initialState = {
  courses: [] as Courses,
  course: undefined,
  pageList: [] as string[],
};

const coursesSlice = createSlice({
  name: "coursesReducer",
  initialState,
  reducers: {
    setCourses: (state, action) => {
      state.courses = action.payload;
    },
    addCourse: (state, action) => {
      state.courses = [...state.courses, action.payload];
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
    setPageList: (state, action) => {
      state.pageList = action.payload;
    },
  },
});

export const {
  setCourses,
  addCourse,
  updateCourse,
  deleteCourse,
  setCourse,
  setPageList,
} = coursesSlice.actions;
export default coursesSlice.reducer;
