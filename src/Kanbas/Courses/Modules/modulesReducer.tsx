import { createSlice } from "@reduxjs/toolkit";
import { Modules } from "../../types";

const initialState = {
  modulesList: [] as Modules,
};

const modulesSlice = createSlice({
  name: "modulesReducer",
  initialState,
  reducers: {
    addModule: (state, action) => {
      state.modulesList = [...state.modulesList, action.payload];
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
    deleteSection: (state, action) => {
      state.modulesList = state.modulesList.map((module) =>
        module._id === action.payload.moduleId
          ? {
              ...module,
              sections: module.sections.filter(
                (sec) => sec._id !== action.payload.sectionId,
              ),
            }
          : module,
      );
    },
    updateSection: (state, action) => {
      state.modulesList = state.modulesList.map((module) =>
        module._id === action.payload.moduleId
          ? {
              ...module,
              sections: module.sections.map((sec) =>
                sec._id === action.payload.section._id
                  ? action.payload.section
                  : sec,
              ),
            }
          : module,
      );
    },
    deleteLesson: (state, action) => {
      state.modulesList = state.modulesList.map((module) =>
        module._id === action.payload.moduleId
          ? {
              ...module,
              sections: module.sections.map((sec) =>
                sec._id === action.payload.sectionId
                  ? {
                      ...sec,
                      lessons: sec.lessons.filter(
                        (les) => les._id !== action.payload.lessonId,
                      ),
                    }
                  : sec,
              ),
            }
          : module,
      );
    },
    updateLesson: (state, action) => {
      state.modulesList = state.modulesList.map((module) =>
        module._id === action.payload.moduleId
          ? {
              ...module,
              sections: module.sections.map((sec) =>
                sec._id === action.payload.sectionId
                  ? {
                      ...sec,
                      lessons: sec.lessons.map((les) =>
                        les._id === action.payload.lesson._id
                          ? action.payload.lesson
                          : les,
                      ),
                    }
                  : sec,
              ),
            }
          : module,
      );
    },
  },
});

export const {
  addModule,
  deleteModule,
  updateModule,
  setModulesList,
  deleteSection,
  updateSection,
  deleteLesson,
  updateLesson,
} = modulesSlice.actions;
export default modulesSlice.reducer;
