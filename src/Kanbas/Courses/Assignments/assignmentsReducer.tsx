import { createSlice } from "@reduxjs/toolkit";
import { assignments } from "../../Database";
import { getFreshId } from "../../utils";

const initialState = {
  assignmentsList: assignments,
};

const assignmentsSlice = createSlice({
  name: "assignmentsReducer",
  initialState,
  reducers: {
    addAssignment: (state, action) => {
      state.assignmentsList = [
        ...state.assignmentsList,
        { ...action.payload, _id: getFreshId() },
      ];
    },
    deleteAssignment: (state, action) => {
      state.assignmentsList = state.assignmentsList.filter(
        (assignment) => assignment._id !== action.payload._id,
      );
    },
    updateAssignment: (state, action) => {
      state.assignmentsList = state.assignmentsList.map((assignment) =>
        assignment._id === action.payload._id ? action.payload : assignment,
      );
    },
    setAssignmentsList: (state, action) => {
      state.assignmentsList = action.payload;
    },
  },
});

export const {
  addAssignment,
  deleteAssignment,
  updateAssignment,
  setAssignmentsList,
} = assignmentsSlice.actions;
export default assignmentsSlice.reducer;
