import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  checkMePresantApi,
  IamQuiteApi,
  IamPresantApi,
} from "utils/apis/presence.api";

export const checkMePresant = createAsyncThunk(
  "presance/checkMePresant",
  (_, thunkAPI) => checkMePresantApi(_)
);
export const IamQuite = createAsyncThunk("presance/IamQuite", (_, thunkAPI) =>
  IamQuiteApi()
);
export const IamPresant = createAsyncThunk(
  "presance/IamPresant",
  (_, thunkAPI) => IamPresantApi()
);
const initialState = {
  status: "",
};

const PresanceSlice = createSlice({
  name: "presance",
  initialState,
  extraReducers(builder) {
    builder
      .addCase(checkMePresant.fulfilled, (state, action) => {
        // console.log(action.payload);
        console.log("chekecd");
        state.status = action.payload.data;
      })
      .addCase(IamPresant.fulfilled, (state, action) => {
        // console.log(action.payload);
        console.log("add");
        state.status = "Work";
      })
      .addCase(IamQuite.fulfilled, (state, action) => {
        //   console.log(action.payload);
        console.log("quite");
        state.status = "Quite";
      });
  },
});

export const selectSatatus = (state) => state.presance.status;

export default PresanceSlice.reducer;
