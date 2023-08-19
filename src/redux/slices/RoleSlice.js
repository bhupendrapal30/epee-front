//External Lib Import
import { createSlice } from "@reduxjs/toolkit";

const RoleSlice = createSlice({
  name: "Role",
  initialState: {
    RoleList: [],
    TotalRole: 0,
    RoleDetails: {
      name: "",
      createdby: "",
      status: "",
    },
  },
  reducers: {
    SetRoleList(state, action) {
      state.RoleLists = action.payload;
    },
    SetTotalRole(state, action) {
      state.TotalRole = action.payload;
    },
    SetRoleDetails(state, action) {
      state.RoleDetails = action.payload;
    },
    ResetRoleDetails(state, action) {
      state.name = "";

      state.status = "";
      
    },
  },
});

export const {
  SetRoleList,
  SetTotalRole,
  SetRoleDetails,
  ResetRoleDetails,
} = RoleSlice.actions;
export default RoleSlice.reducer;
