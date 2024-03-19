import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "../Courses/Modules/modulesReducer";
import statusReducer from "../Courses/Home/Status/statusReducer";
import assignmentsReducer from "../Courses/Assignments/assignmentsReducer";
import coursesReducer from "../Dashboard/coursesReducer";
import {
  AssignmentsList,
  ComingUpList,
  Course,
  Courses,
  Modules,
  TodoList,
} from "../types";

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
  coursesReducer: {
    courses: Courses;
    course: Course;
    page: string;
  };
}

const store = configureStore({
  reducer: {
    modulesReducer,
    statusReducer,
    assignmentsReducer,
    coursesReducer,
  },
});

export default store;
