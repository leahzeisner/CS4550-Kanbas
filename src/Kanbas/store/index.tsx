import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "../Courses/Modules/modulesReducer";

export interface KanbasState {
  modulesReducer: {
    modulesList: any[];
  };
}

const store = configureStore({
  reducer: {
    modulesReducer,
  },
});

export default store;
