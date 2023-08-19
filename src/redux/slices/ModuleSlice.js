//External Lib Import
import { createSlice } from "@reduxjs/toolkit";

const ModuleSlice = createSlice({
  name: "Module",
  initialState: {
    ModuleDropDown: [],
    RoleDropDown:[],
    
  },
  reducers: {
    
      SetModuleDropDown(state, action) {
        state.ModuleDropDown = action.payload;
      },
     SetRoleDropDown(state, action) {
      state.RoleDropDown = action.payload;
     },
   
  },
});

export const {
 
  SetModuleDropDown,
  SetRoleDropDown,
  
} = ModuleSlice.actions;
export default ModuleSlice.reducer;
