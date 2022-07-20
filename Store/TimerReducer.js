import { createSlice } from "@reduxjs/toolkit";

export const timerSlice = createSlice({
  name: "timer",
  initialState: {
    recipeId: "",
    isAutoRun: false,
    nowStep: 0,
    nextStep: 1,
    // startTime: null,
    endTime: null, // Date type
  },
  reducers: {
    setTimer: (state, action) => {
      state.recipeId = action.payload.recipeId;
      state.isAutoRun = action.payload.isAutoRun;
      state.nowStep = action.payload.nowStep;
      state.nextStep = action.payload.nextStep;
      //   state.startTime = action.payload.startTime;
      state.endTime = action.payload.endTime;
    },
  },
});

export const { setTimer } = timerSlice.actions;
export default timerSlice.reducer;
export const getTimer = (state) => {
  return {
    recipeId: state.Ttimer.recipeId,
    isAutoRun: state.Ttimer.isAutoRun,
    nowStep: state.Ttimer.nowStep,
    nextStep: state.Ttimer.nextStep,
    // startTime: state.timer.startTime,
    endTime: state.timer.endTime,
  };
};
