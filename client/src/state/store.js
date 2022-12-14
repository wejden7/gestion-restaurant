import { configureStore } from "@reduxjs/toolkit";
import auth from 'state/AuthSlice'
import setting from 'state/SettingSlice'
export const store = configureStore({
  reducer: {
    auth,setting
  }
});