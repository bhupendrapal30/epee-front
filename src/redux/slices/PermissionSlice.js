//External Lib Import
import { createSlice } from "@reduxjs/toolkit";

const PermissionSlice = createSlice({
  name: "Permission",
  initialState: {
    PermissionLists: [],
    PermissionNews: 0,
    PermissionDetails: {
      roleid: "",
      moduleid: "",
      addedit: "",
      view: "",
      status: "",
    },
  },
  reducers: {
    SetPermissionLists(state, action) {
      state.PermissionLists = action.payload;
    },
    SetTotalPermission(state, action) {
      state.TotalPermission = action.payload;
    },
   
    SetPermissionDetails(state, action) {
      state.PermissionDetails = action.payload;
    },
    ResetPermissionDetails(state, action) {
      state.roleid = "";
      state.moduleid = "";
      state.addedit = "";
      state.view = "";
      state.status = "";
    },
  },
});

export const {
  SetPermissionLists,
  SetTotalPermission,
  SetPermissionDetails,
  ResetPermissionDetails,
} = PermissionSlice.actions;
export default PermissionSlice.reducer;
