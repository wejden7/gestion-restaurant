import { configureStore } from "@reduxjs/toolkit";
import auth from 'state/AuthSlice'
import setting from 'state/SettingSlice'
import team from 'state/TeamSlice'
export const store = configureStore({
  reducer: {
    auth,setting,team
  }
});