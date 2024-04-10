//External Lib Import
import { createSlice } from "@reduxjs/toolkit";

const ControlSlice = createSlice({
  name: "Control",
  initialState: {
    ControlLists: [],
    ControlDropDown: [],
    FrameworkDropDown: [],
    TotalControl: 0,
    ControlDetails: {
      name: "",
      frameworkid: "",
      status: true,
    },
  },
  reducers: {
    SetControlLists(state, action) {
      state.ControlLists = action.payload;
    },
    SetTotalControl(state, action) {
      state.TotalControl = action.payload;
    },
    SetControlDropDown(state, action) {
      state.ControlDropDown = action.payload;
    },
    SetFrameworkDropDown(state, action) {
      state.FrameworkDropDown = action.payload;
    },
    SetControlDetails(state, action) {
      state.ControlDetails = action.payload;
    },
    ResetControlDetails(state, action) {
      Object.keys(state.ControlDetails).map((i) => {
        return i === "status"
          ? (state.ControlDetails[i] = true)
          : (state.ControlDetails[i] = "");
      });
    },
  },
});

export const {
  SetControlLists,
  SetTotalControl,
  SetControlDropDown,
  SetFrameworkDropDown,
  SetControlDetails,
  ResetControlDetails,
} = ControlSlice.actions;
export default ControlSlice.reducer;
