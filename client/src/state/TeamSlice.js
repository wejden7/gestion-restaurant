import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from "@reduxjs/toolkit";

import {
  findEmployerApi,
  createEmployerApi,
  deleteEmployerApi,
  updateEmployerApi,
} from "utils/apis/team.api";

const TeamAdapter = createEntityAdapter({
  selectId: (a) => a._id,
});

const initialState = TeamAdapter.getInitialState({
  status: "idle", //'idle' | 'loading' | 'succeeded' | 'failed'
  error: null,
});
export const fetchTeam = createAsyncThunk("team/fetchTeam", (_, thunkAPI) =>
  findEmployerApi()
);
export const createEmployer = createAsyncThunk(
  "team/createEmployer",
  (data, thunkAPI) => createEmployerApi(data)
);
export const updateEmployer = createAsyncThunk(
  "team/updateEmployer",
  (data, thunkAPI) => updateEmployerApi(data)
);
export const deleteEmployer = createAsyncThunk(
  "team/deleteEmployer",
  (id, thunkAPI) => deleteEmployerApi(id)
);
const TeamSlice = createSlice({
  name: "team",
  initialState,
  extraReducers(builder) {
    builder
      .addCase(fetchTeam.fulfilled, (state, action) => {
        /* console.log("team successful");
        console.log(action.payload); */
        state.status = "succeeded";
        TeamAdapter.upsertMany(state, action.payload.data);
      })
      .addCase(fetchTeam.rejected, (state, action) => {
        /*  console.log("team successful");
        console.log(action.payload); */
        state.status = "failed";
      })
      .addCase(createEmployer.fulfilled, (state, action) => {
        // console.log("team successful");
        // console.log(action.payload.data);
        TeamAdapter.addOne(state, action.payload.data);
      })
      .addCase(deleteEmployer.fulfilled, (state, action) => {
        // console.log("team delete successful");
        //console.log(action.payload);
        TeamAdapter.removeOne(state, action.payload);
      })
      .addCase(updateEmployer.fulfilled, (state, action) => {
        // console.log("team delete successful");
        console.log(action.payload.data);
        TeamAdapter.upsertOne(state, action.payload.data);
      });
  },
});

export const {
  selectAll: selectAllTeam,
  selectById: selectTeamById,
  selectIds: selectTeamIds,
  selectEntities: selectEntitiesTeam,
  selectTotal: selectTotalTeam,
} = TeamAdapter.getSelectors((state) => state.team);

export const getTeamStatus = (state) => state.team.status;
export const getTeamError = (state) => state.team.error;
export default TeamSlice.reducer;
