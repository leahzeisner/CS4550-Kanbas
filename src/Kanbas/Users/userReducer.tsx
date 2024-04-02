import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: undefined,
};

const userSlice = createSlice({
  name: "userReducer",
  initialState,
  reducers: {
    getUser: (state) => {
      return state.user;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { getUser, setUser } = userSlice.actions;
export default userSlice.reducer;
