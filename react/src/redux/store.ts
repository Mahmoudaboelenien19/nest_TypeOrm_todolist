import { configureStore } from "@reduxjs/toolkit";
import todosSlice from "./todosSlice.js";
import authSlice from "./authSlice.js";

export const store = configureStore({
  reducer: {
    todos: todosSlice,
    auth: authSlice,
  },
});
export type RootType = ReturnType<typeof store.getState>;
export type appDispatch = typeof store.dispatch;
