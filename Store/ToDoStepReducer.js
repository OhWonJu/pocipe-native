import { createSlice } from "@reduxjs/toolkit";

export const toDoStepSlice = createSlice({
  name: "toDoStep",
  initialState: {
    nowStep: 0,
    nextStep: 1,
  },
  reducers: {
    setToDoStep: (state, action) => {
      state.nowStep = action.payload.nowStep;
      state.nextStep = action.payload.nextStep;
    },
  },
});

export const { setToDoStep } = toDoStepSlice.actions;
export default toDoStepSlice.reducer;
export const getToDoStep = (state) => {
  return {
    nowStep: state.toDoStep.nowStep,
    nextStep: state.toDoStep.nextStep,
  };
};
