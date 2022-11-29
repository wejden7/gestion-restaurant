import { configureStore } from "@reduxjs/toolkit";
import auth from 'state/AuthSlice'
export const store = configureStore({
  reducer: {
    auth
  }
});