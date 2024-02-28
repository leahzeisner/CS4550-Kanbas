import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "../Courses/Modules/modulesReducer";
import statusReducer from "../Courses/Home/Status/statusReducer";
import assignmentsReducer from "../Courses/Assignments/assignmentsReducer";
import { AssignmentsList, ComingUpList, Modules, TodoList } from "../types";

export interface KanbasState {
  modulesReducer: {
    modulesList: Modules;
  };
  statusReducer: {
    todoList: TodoList;
    comingUpList: ComingUpList;
  };
  assignmentsReducer: {
    assignmentsList: AssignmentsList;
  };
}

const store = configureStore({
  reducer: {
    modulesReducer,
    statusReducer,
    assignmentsReducer,
  },
});

export default store;
