//External Lib Import
import { createSlice } from "@reduxjs/toolkit";

const PolicySlice = createSlice({
  name: "Policy",
  initialState: {
    PolicyLists: [],
    TotalPolicy: 0,
    PolicyDetails: {
      filename:"",
      description: "",
      status: "",
    },
  },
  reducers: {
    SetPolicyLists(state, action) {
      state.PolicyLists = action.payload;
    },
    SetTotalPolicy(state, action) {
      state.TotalPolicy = action.payload;
    },
    SetPolicyDetails(state, action) {
      state.PolicyDetails = action.payload;
    },
    ResetPolicyDetails(state, action) {
        state.filename= "";
        state.description= "";
        state.status= ""
    },
  },
});

export const {
  SetPolicyLists,
  SetTotalPolicy,
  SetPolicyDetails,
  ResetPolicyDetails,
} = PolicySlice.actions;
export default PolicySlice.reducer;
