import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginApi, loginTokenApi } from "utils/apis/auth.api";

export const login = createAsyncThunk("auth/login", (user, thunkAPI) =>
  loginApi(user)
);
export const loginToken = createAsyncThunk("auth/loginToken", (_, thunkAPI) =>
  loginTokenApi()
);
const initialState = {
  loding: false,
  user: null,
  token: null,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut(state) {
      console.log("log out");
      state.user = null;
      state.token = null;
      state.loding = false;
      localStorage.removeItem("user-restauration-token");
    },
  },
  extraReducers(builder) {
    builder
      .addCase(login.pending, (state, action) => {
        state.loding = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log("login successful");
        state.token = action.payload.token;
        localStorage.setItem("user-restauration-token", action.payload.token);
        state.user = action.payload.data;
        state.loding = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.loding = false;
      })
      .addCase(loginToken.pending, (state, action) => {
        state.loding = true;
      })
      .addCase(loginToken.fulfilled, (state, action) => {
        console.log("login successful");
        state.token = action.payload.token;
        localStorage.setItem("user-restauration-token", action.payload.token);
        state.user = action.payload.data;
        state.loding = false;
      })
      .addCase(loginToken.rejected, (state, action) => {
        console.log("login token rejected");
        state.loding = false;
        localStorage.removeItem("user-restauration-token");
      });
  },
});
export const getToken = (state) => state.auth.token;
export const getUser = (state) => state.auth.user;
export const getError = (state) => state.auth.error;
export const getloding = (state) => state.auth.loding;
export const { logOut } = AuthSlice.actions;
export default AuthSlice.reducer;
