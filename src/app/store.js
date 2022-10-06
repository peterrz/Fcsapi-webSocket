import { configureStore } from "@reduxjs/toolkit";
import socketReducer from "../features/websocket/socketSlice";
export const store = configureStore({
  reducer: {
    socket: socketReducer,
  },
});
