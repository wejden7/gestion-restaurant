import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import {loginApi} from 'apis/auth.api'

export const login = createAsyncThunk("auth/login",(user,thunkAPI)=>loginApi(user))


const initialState = {
    user:null,
    token:null,
    error:null,
}

const AuthSlice = createSlice({
    name:"auth",
    initialState,
    extraReducers(builder){
        builder
        .addCase(login.fulfilled,(state, action) => {
            console.log("login successful")
            state.token = action.payload.token;
            localStorage.setItem('user-restauration-token', action.payload.token);
            state.user = action.payload.data;
        })

    }
})
export const getToken= (state)=>state.auth.token;
export const getUser = (state)=>state.auth;
export const getError = (state)=>state.auth.error
export default AuthSlice.reducer;