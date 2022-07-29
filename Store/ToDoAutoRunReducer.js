import { createSlice } from "@reduxjs/toolkit";

export const toDoAutoRunSlice = createSlice({
  name: "toDoAutoRun",
  initialState: {
    isAutoRun: false,
  },
  reducers: {
    setToDoAutoRun: (state, action) => {
      state.isAutoRun = action.payload.isAutoRun;
    },
  },
});

export const { setToDoAutoRun } = toDoAutoRunSlice.actions;
export default toDoAutoRunSlice.reducer;
export const getToDoAutoRun = (state) => {
  return {
    isAutoRun: state.toDoAutoRun.isAutoRun,
  };
};
