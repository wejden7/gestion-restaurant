import { configureStore } from "@reduxjs/toolkit";
import auth from "state/AuthSlice";
import setting from "state/SettingSlice";
import team from "state/TeamSlice";
import autorization from "state/AutorizationSlice";
import presance from "state/PresanceSlice";
import parametre from "state/ParametreSlice";

export const store = configureStore({
  reducer: {
    auth,
    setting,
    team,
    autorization,
    presance,
    parametre,
  },
});
