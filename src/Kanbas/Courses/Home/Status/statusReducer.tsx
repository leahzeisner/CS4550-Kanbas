import { createSlice } from "@reduxjs/toolkit";
import { comingUpItems, todos } from "../../../Database";
import { getFreshId } from "../../../utils";

const initialState = {
  todoList: todos,
  comingUpList: comingUpItems,
};

const statusSlice = createSlice({
  name: "statusReducer",
  initialState,
  reducers: {
    addTodoItem: (state, action) => {
      state.todoList = [
        ...state.todoList,
        { ...action.payload, _id: getFreshId() },
      ];
    },
    deleteTodoItem: (state, action) => {
      state.todoList = state.todoList.filter(
        (todo) => todo._id !== action.payload._id,
      );
    },
    updateTodoItem: (state, action) => {
      state.todoList = state.todoList.map((todo) =>
        todo._id === action.payload._id ? action.payload : todo,
      );
    },
    setTodoList: (state, action) => {
      state.todoList = action.payload;
    },
    addComingUpItem: (state, action) => {
      state.comingUpList = [
        ...state.comingUpList,
        { ...action.payload, _id: getFreshId() },
      ];
    },
    deleteComingUpItem: (state, action) => {
      state.comingUpList = state.comingUpList.filter(
        (item) => item._id !== action.payload._id,
      );
    },
    updateComingUpItem: (state, action) => {
      state.comingUpList = state.comingUpList.map((item) =>
        item._id === action.payload._id ? action.payload : item,
      );
    },
    setComingUpList: (state, action) => {
      state.comingUpList = action.payload;
    },
  },
});

export const {
  addTodoItem,
  addComingUpItem,
  deleteTodoItem,
  deleteComingUpItem,
  updateTodoItem,
  updateComingUpItem,
  setTodoList,
  setComingUpList,
} = statusSlice.actions;
export default statusSlice.reducer;
