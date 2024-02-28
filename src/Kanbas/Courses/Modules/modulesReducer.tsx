import { createSlice } from "@reduxjs/toolkit";
import { Modules } from "../../types";

const initialState = {
  modulesList: [] as Modules,
};

const modulesSlice = createSlice({
  name: "modulesList",
  initialState,
  reducers: {
    addModule: (state, action) => {
      state.modulesList = [
        ...state.modulesList,
        { ...action.payload, _id: new Date().getTime().toString() },
      ];
    },
    deleteModule: (state, action) => {
      state.modulesList = state.modulesList.filter(
        (module) => module._id !== action.payload._id,
      );
    },
    updateModule: (state, action) => {
      state.modulesList = state.modulesList.map((module) => {
        if (module._id === action.payload._id) {
          return action.payload;
        } else {
          return module;
        }
      });
    },
    setModulesList: (state, action) => {
      state.modulesList = action.payload;
    },
  },
});

export const { addModule, deleteModule, updateModule, setModulesList } =
  modulesSlice.actions;
export default modulesSlice.reducer;
