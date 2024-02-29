import { createSlice } from "@reduxjs/toolkit";
import { courses } from "../Database";
import { getFreshId } from "../utils";

const initialState = {
  coursesList: courses,
  course: undefined,
  page: "",
};

const coursesSlice = createSlice({
  name: "coursesReducer",
  initialState,
  reducers: {
    addCourse: (state, action) => {
      state.coursesList = [
        ...state.coursesList,
        { ...action.payload, _id: getFreshId() },
      ];
    },
    deleteCourse: (state, action) => {
      state.coursesList = state.coursesList.filter(
        (course) => course._id !== action.payload._id,
      );
    },
    updateCourse: (state, action) => {
      state.coursesList = state.coursesList.map((course) =>
        course._id === action.payload._id ? action.payload : course,
      );
    },
    setCoursesList: (state, action) => {
      state.coursesList = action.payload;
    },
    setCourse: (state, action) => {
      state.course = action.payload;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
  },
});

export const {
  addCourse,
  deleteCourse,
  updateCourse,
  setCoursesList,
  setCourse,
  setPage,
} = coursesSlice.actions;
export default coursesSlice.reducer;
