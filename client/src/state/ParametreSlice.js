import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getParametreApi, updateParametreApi } from "utils/apis/parametre.api";

export const getParametre = createAsyncThunk(
  "parametre/getParametre",
  (_, thunkAPI) => getParametreApi()
);
export const updateParametre = createAsyncThunk(
  "parametre/updateParametre",
  (data, thunkAPI) => updateParametreApi(data)
);

const initialState = {
  data: null,
};

const ParametreSlice = createSlice({
  name: "parametre",
  initialState,
  extraReducers(builder) {
    builder
      .addCase(getParametre.fulfilled, (state, action) => {
        //console.log(action.payload);
        //console.log("get parametre");
        state.data = action.payload.data;
      })
      .addCase(updateParametre.fulfilled, (state, action) => {
        //console.log(action.payload);
        //console.log("get parametre");
       state.data = action.payload.data;
      });
  },
});

export const selectData = (state) => state.parametre.data;

export default ParametreSlice.reducer;
