import { createSlice } from "@reduxjs/toolkit";
import { Quizzes } from "../../types";

const initialState = {
  quizzes: [] as Quizzes,
};

const quizzesSlice = createSlice({
  name: "quizzesReducer",
  initialState,
  reducers: {
    addQuiz: (state, action) => {
      state.quizzes = [...state.quizzes, action.payload];
    },
    deleteQuiz: (state, action) => {
      state.quizzes = state.quizzes.filter(
        (quiz) => quiz._id !== action.payload._id,
      );
    },
    updateQuiz: (state, action) => {
      state.quizzes = state.quizzes.map((quiz) =>
        quiz._id === action.payload._id ? action.payload : quiz,
      );
    },
    setQuizzes: (state, action) => {
      state.quizzes = action.payload;
    },
  },
});

export const { addQuiz, deleteQuiz, updateQuiz, setQuizzes } =
  quizzesSlice.actions;
export default quizzesSlice.reducer;
