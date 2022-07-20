import { configureStore } from "@reduxjs/toolkit";

import TimerReducer from "./TimerReducer";

export default Store = configureStore({
  reducer: {
    timer: TimerReducer,
  },
});
