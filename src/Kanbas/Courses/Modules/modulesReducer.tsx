import { createSlice } from "@reduxjs/toolkit";
import { modules } from "../../Database";

const initialState = {
  modulesList: modules,
};

const modulesSlice = createSlice({
  name: "modulesReducer",
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
      state.modulesList = state.modulesList.map((module) =>
        module._id === action.payload._id ? action.payload : module,
      );
    },
    setModulesList: (state, action) => {
      state.modulesList = action.payload;
    },
  },
});

export const { addModule, deleteModule, updateModule, setModulesList } =
  modulesSlice.actions;
export default modulesSlice.reducer;
