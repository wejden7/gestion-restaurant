import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginApi,loginTokenApi } from "utils/apis/auth.api";

export const login = createAsyncThunk("auth/login", (user, thunkAPI) =>
  loginApi(user)
);
export const loginToken = createAsyncThunk("auth/loginToken", (_, thunkAPI) =>
loginTokenApi()
);
const initialState = {
  user: null,
  token: null,
  error: null,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  extraReducers(builder) {
    builder.addCase(login.fulfilled, (state, action) => {
      console.log("login successful");
      state.token = action.payload.token;
      localStorage.setItem("user-restauration-token", action.payload.token);
      state.user = action.payload.data;
    })
    .addCase(loginToken.fulfilled,(state, action) => {
      console.log("login successful");
      state.token = action.payload.token;
      localStorage.setItem("user-restauration-token", action.payload.token);
      state.user = action.payload.data;

    }).addCase(loginToken.rejected,(state,action)=>{
      console.log("login token rejected")
      localStorage.removeItem("user-restauration-token")
    });
  },
});
export const getToken = (state) => state.auth.token;
export const getUser = (state) => state.auth.user;
export const getError = (state) => state.auth.error;
export default AuthSlice.reducer;
