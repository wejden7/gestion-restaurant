import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  createBrancheApi,
  findBrancheApi,
  deleteBrancheApi,
  updateBrancheApi,
  openCloseZoneBrancheApi,
} from "utils/apis/branche.api";
import {
  findEtablissementApi,
  updateEtablissementApi,
} from "utils/apis/etablissement.api";
import {
  findPosteApi,
  createPosteApi,
  updatePosteApi,
  deletePosteApi,
} from "utils/apis/poste.api";

export const ajouterBranche = createAsyncThunk(
  "setting/ajouterBranche",
  (data, thunkAPI) => createBrancheApi(data)
);
export const findBranche = createAsyncThunk(
  "setting/findBranche",
  (_, thunkAPI) => findBrancheApi()
);
export const deleteBranche = createAsyncThunk(
  "setting/deleteBranche",
  (id, thunkAPI) => deleteBrancheApi(id)
);
export const updateBranche = createAsyncThunk(
  "setting/updateBranche",
  (data, thunkAPI) => updateBrancheApi(data)
);
export const openCloseZoneBranche = createAsyncThunk(
  "setting/openCloseZoneBranche",
  (id, thunkAPI) => openCloseZoneBrancheApi(id)
);
export const findEtablissement = createAsyncThunk(
  "setting/findEtablissement",
  (_, thunkAPI) => findEtablissementApi()
);
export const updateEtablissement = createAsyncThunk(
  "setting/updateEtablissement",
  (data, thunkAPI) => updateEtablissementApi(data)
);
export const findPoste = createAsyncThunk("setting/findPoste", (_, thunkAPI) =>
  findPosteApi()
);
export const createPoste = createAsyncThunk(
  "setting/createPoste",
  (data, thunkAPI) => createPosteApi(data)
);
export const updatePoste = createAsyncThunk(
  "setting/updatePoste",
  (data, thunkAPI) => updatePosteApi(data)
);
export const deletePoste = createAsyncThunk(
  "setting/deletePoste",
  (id, thunkAPI) => deletePosteApi(id)
);
const initialState = {
  etablissement: null,
  branches: [],
  postes: [],
};

const SettingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(ajouterBranche.fulfilled, (state, action) => {
        //  console.log("login successful");
        // console.log(action.payload.data);
        state.branches.push(action.payload.data);
      })
      .addCase(findBranche.fulfilled, (state, action) => {
        // console.log("find Branche successful");
        // console.log(action.payload.data);
        state.branches = action.payload.data;
      })
      .addCase(deleteBranche.fulfilled, (state, action) => {
        //  console.log("delete Branche successful");
        //  console.log(action.payload);
        state.branches = state.branches.filter(
          (branche) => branche._id !== action.payload
        );
      })
      .addCase(updateBranche.fulfilled, (state, action) => {
        // console.log("delete Branche successful");
        // console.log(action.payload);
        state.branches = state.branches.map((item) => {
          if (item._id === action.payload.data._id) return action.payload.data;
          return item;
        });
      })
      .addCase(openCloseZoneBranche.fulfilled, (state, action) => {
        //  console.log("delete Branche successful");
        //  console.log(action.payload);
        state.branches = state.branches.map((item) => {
          if (item._id === action.payload.data._id) return action.payload.data;
          return item;
        });
      })
      .addCase(findEtablissement.fulfilled, (state, action) => {
        //console.log("find etablisment successful");
        //console.log(action.payload.data);
        state.etablissement = action.payload.data;
      })
      .addCase(updateEtablissement.fulfilled, (state, action) => {
        // console.log("find etablisment successful");
        //console.log(action.payload.data);
        state.etablissement = action.payload.data;
      })
      .addCase(findPoste.fulfilled, (state, action) => {
        //console.log("find post successful");
        //console.log(action.payload.data);
        state.postes = action.payload.data;
      })
      .addCase(createPoste.fulfilled, (state, action) => {
        // console.log("find post successful");
        // console.log(action.payload.data);
        state.postes.push(action.payload.data);
      })
      .addCase(updatePoste.fulfilled, (state, action) => {
        //console.log("update post successful");
        //console.log(action.payload.data);
        state.postes = state.postes.map((item) => {
          if (item._id === action.payload.data._id) return action.payload.data;
          return item;
        });
      })
      .addCase(deletePoste.fulfilled, (state, action) => {
        console.log("delte post successful");
        console.log(action.payload.data);
        state.postes = state.postes.filter(
          (poste) => poste._id !== action.payload
        );
      });
  },
});
export const getBranches = (state) => state.setting.branches;
export const getPostes = (state) => state.setting.postes;
export const getEtablissement = (state) => state.setting.etablissement;
export const getBrancheById = (state, id) => {
  const branches = state.setting.branches;
  return branches.filter((branche) => branche._id === id)[0];
};
export const getPostesById = (state, id) => {
  const postes = state.setting.postes;
  return postes.filter((poste) => poste._id === id)[0];
};
export default SettingSlice.reducer;
