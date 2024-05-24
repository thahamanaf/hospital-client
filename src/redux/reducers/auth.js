import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  profile: {}
}

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserProfile(state, action) {
      state.profile = action.payload
    },
    todoToggled(state, action) {
      const todo = state.find((todo) => todo.id === action.payload);
      todo.completed = !todo.completed;
    },
  },
});

export const { setUserProfile, todoToggled } = authSlice.actions;
export default authSlice.reducer;
