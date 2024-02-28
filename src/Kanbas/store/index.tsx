import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "../Courses/Modules/modulesReducer";
import statusReducer from "../Courses/Home/Status/statusReducer";
import { ComingUpList, Modules, TodoList } from "../types";

export interface KanbasState {
  modulesReducer: {
    modulesList: Modules;
  };
  statusReducer: {
    todoList: TodoList;
    comingUpList: ComingUpList;
  };
}

const store = configureStore({
  reducer: {
    modulesReducer,
    statusReducer,
  },
});

export default store;
