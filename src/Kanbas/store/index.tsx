import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "../Courses/Modules/modulesReducer";
import statusReducer from "../Courses/Home/Status/statusReducer";
import assignmentsReducer from "../Courses/Assignments/assignmentsReducer";
import coursesReducer from "../Dashboard/coursesReducer";
import quizzesReducer from "../Courses/Quizzes/quizzesReducer";
import {
  AssignmentsList,
  ComingUpList,
  Course,
  Courses,
  Modules,
  Quizzes,
  TodoList,
} from "../types";
import userReducer from "../Users/userReducer";

export interface KanbasState {
  userReducer: {
    user: any;
  };
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
  quizzesReducer: {
    quizzes: Quizzes;
  };
}

const store = configureStore({
  reducer: {
    userReducer,
    modulesReducer,
    statusReducer,
    assignmentsReducer,
    coursesReducer,
    quizzesReducer,
  },
});

export default store;
