//External Lib Import
import { createSlice } from "@reduxjs/toolkit";

const SubcontrolSlice = createSlice({
  name: "Subcontrol",
  initialState: {
    SubcontrolLists: [],
    SubcontrolDropDown: [],
    TotalSubcontrol: 0,
    SubcontrolDetails: {
      name: "",
      control_id:"",
      frameworkid: "",
      status: true,
    },
  },
  reducers: {
    SetSubcontrolLists(state, action) {
      state.SubcontrolLists = action.payload;
    },
    SetTotalSubcontrol(state, action) {
      state.TotalSubcontrol = action.payload;
    },
    SetSubcontrolDropDown(state, action) {
      state.SubcontrolDropDown = action.payload;
    },
    
    SetSubcontrolDetails(state, action) {
      state.SubcontrolDetails = action.payload;
    },
    ResetSubcontrolDetails(state, action) {
      Object.keys(state.SubcontrolDetails).map((i) => {
        return i === "status"
          ? (state.SubcontrolDetails[i] = true)
          : (state.SubcontrolDetails[i] = "");
      });
    },
  },
});

export const {
  SetSubcontrolLists,
  SetTotalSubcontrol,
  SetSubcontrolDropDown,
  SetSubcontrolDetails,
  ResetSubcontrolDetails,
} = SubcontrolSlice.actions;
export default SubcontrolSlice.reducer;
