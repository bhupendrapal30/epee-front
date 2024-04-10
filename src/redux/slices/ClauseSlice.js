//External Lib Import
import { createSlice } from "@reduxjs/toolkit";

const ClauseSlice = createSlice({
  name: "Clause",
  initialState: {
    ClauseLists: [],
    ClauseDropDown: [],
    FrameworkDropDown: [],
    TotalClause: 0,
    ClauseDetails: {
      clause: "",
      frameworkid: "",
      status: true,
    },
  },
  reducers: {
    SetClauseLists(state, action) {
      state.ClauseLists = action.payload;
    },
    SetTotalClause(state, action) {
      state.TotalClause = action.payload;
    },
    SetClauseDropDown(state, action) {
      state.ClauseDropDown = action.payload;
    },
    SetFrameworkDropDown(state, action) {
      state.FrameworkDropDown = action.payload;
    },
    SetClauseDetails(state, action) {
      state.ClauseDetails = action.payload;
    },
    ResetClauseDetails(state, action) {
      Object.keys(state.ClauseDetails).map((i) => {
        return i === "status"
          ? (state.ClauseDetails[i] = true)
          : (state.ClauseDetails[i] = "");
      });
    },
  },
});

export const {
  SetClauseLists,
  SetTotalClause,
  SetClauseDropDown,
  SetFrameworkDropDown,
  SetClauseDetails,
  ResetClauseDetails,
} = ClauseSlice.actions;
export default ClauseSlice.reducer;
