import { configureStore } from "@reduxjs/toolkit";

import TimerReducer from "./TimerReducer";
import ToDoAutoRunReducer from "./ToDoAutoRunReducer";
import ToDoStepReducer from "./ToDoStepReducer";

export default Store = configureStore({
  reducer: {
    timer: TimerReducer,
    toDoStep: ToDoStepReducer,
    toDoAutoRun: ToDoAutoRunReducer,
  },
});
