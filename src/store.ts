import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import tasksReducer from "./slice/taskSlice";


export const store = configureStore({
  reducer: {
    auth: authReducer,
    tasks:tasksReducer
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch