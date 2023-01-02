import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginApi, loginEmployerApi, loginTokenApi } from "utils/apis/auth.api";
import { socket } from "utils/service/socket";
export const login = createAsyncThunk("auth/login", (user, thunkAPI) =>
  loginApi(user)
);
export const loginEmployer = createAsyncThunk(
  "auth/loginEmployer",
  (user, thunkAPI) => loginEmployerApi(user, thunkAPI)
);
export const loginToken = createAsyncThunk("auth/loginToken", (_, thunkAPI) =>
  loginTokenApi(thunkAPI)
);
const initialState = {
  loding: false,
  out: false,
  user: null,
  etablissement: null,
  token: null,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logOut(state) {
      console.log("log out");
      state.user = null;
      state.out = true;
      state.token = null;
      state.etablissement = null;
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
        state.etablissement = action.payload.etablissement;
        socket.emit("join-room", state.etablissement._id);
        state.loding = false;
      })
      .addCase(login.rejected, (state, action) => {
        state.loding = false;
      })
      .addCase(loginEmployer.pending, (state, action) => {
        state.loding = true;
      })
      .addCase(loginEmployer.fulfilled, (state, action) => {
        console.log("login successful");
        state.token = action.payload.token;
        localStorage.setItem("user-restauration-token", action.payload.token);
        state.user = action.payload.data;
        state.etablissement = action.payload.etablissement;
        socket.emit("join-room", state.etablissement._id);
        state.loding = false;
      })
      .addCase(loginEmployer.rejected, (state, action) => {
        state.loding = false;
      })
      .addCase(loginToken.pending, (state, action) => {
        state.loding = true;
      })
      .addCase(loginToken.fulfilled, (state, action) => {
        console.log(action.payload.data);
        state.token = localStorage.getItem("user-restauration-token");
        state.user = action.payload.data;
        state.etablissement = action.payload.etablissement;
        socket.emit("join-room", state.etablissement._id);

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
export const getEtablissement = (state) => state.auth.etablissement;
export const getEtablissementCreatedDate = (state) =>
  state.auth.etablissement.created_at;
export const getError = (state) => state.auth.error;
export const getloding = (state) => state.auth.loding;
export const getOut = (state) => state.auth.out;
export const { logOut } = AuthSlice.actions;
export default AuthSlice.reducer;
