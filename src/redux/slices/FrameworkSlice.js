//External Lib Import
import { createSlice } from "@reduxjs/toolkit";

const FrameworkSlice = createSlice({
  name: "Framework",
  initialState: {
    FrameworkLists: [],
    FrameworkDropDown: [],
    TotalFramework: 0,
    FrameworkDetails: {
      name: "",
      status: true,
    },
  },
  reducers: {
    SetFrameworkLists(state, action) {
      state.FrameworkLists = action.payload;
    },
    SetTotalFramework(state, action) {
      state.TotalFramework = action.payload;
    },
    SetFrameworkDropDown(state, action) {
      state.FrameworkDropDown = action.payload;
    },
    SetFrameworkDetails(state, action) {
      state.FrameworkDetails = action.payload;
    },
    ResetFrameworkDetails(state, action) {
      Object.keys(state.FrameworkDetails).map((i) => {
        return i === "status"
          ? (state.FrameworkDetails[i] = true)
          : (state.FrameworkDetails[i] = "");
      });
    },
  },
});

export const {
  SetFrameworkLists,
  SetTotalFramework,
  SetFrameworkDropDown,
  SetFrameworkDetails,
  ResetFrameworkDetails,
} = FrameworkSlice.actions;
export default FrameworkSlice.reducer;
