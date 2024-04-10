//External Lib Import
import { createSlice } from "@reduxjs/toolkit";

const SubclauseSlice = createSlice({
  name: "Subclause",
  initialState: {
    SubclauseLists: [],
    SubclauseDropDown: [],
    TotalSubclause: 0,
    SubclauseDetails: {
      sabclause: "",
      standard_id:"",
      clause_id: "",
      status: true,
    },
  },
  reducers: {
    SetSubclauseLists(state, action) {
      state.SubclauseLists = action.payload;
    },
    SetTotalSubclause(state, action) {
      state.TotalSubclause = action.payload;
    },
    SetSubclauseDropDown(state, action) {
      state.SubclauseDropDown = action.payload;
    },
    
    SetSubclauseDetails(state, action) {
      state.SubclauseDetails = action.payload;
    },
    ResetSubclauseDetails(state, action) {
      Object.keys(state.SubclauseDetails).map((i) => {
        return i === "status"
          ? (state.SubclauseDetails[i] = true)
          : (state.SubclauseDetails[i] = "");
      });
    },
  },
});

export const {
  SetSubclauseLists,
  SetTotalSubclause,
  SetSubclauseDropDown,
  SetSubclauseDetails,
  ResetSubclauseDetails,
} = SubclauseSlice.actions;
export default SubclauseSlice.reducer;
