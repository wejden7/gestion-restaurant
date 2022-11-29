import {createAsyncThunk,createSlice} from '@reduxjs/toolkit'
import {loginApi} from 'apis/auth.api'

export const login = createAsyncThunk("auth/login",loginApi)


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
            state.token = action.token;
            state.user = action.user;
        }).addCase(login.rejected,(state, action) => {
            console.log("login rejected")
            state.error= action.error;
        })

    }
})
export const getToken= (state)=>state.auth.token;
export const getUser = (state)=>state.auth.user;
export const getError = (state)=>state.auth.error
export default AuthSlice.reducer;