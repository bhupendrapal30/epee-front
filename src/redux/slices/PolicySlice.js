//External Lib Import
import { createSlice } from "@reduxjs/toolkit";

const PolicySlice = createSlice({
  name: "Policy",
  initialState: {
    PolicyLists: [],
    CategoryDropDown:[],
    StandardCatDropDown:[],
    TotalPolicy: 0,
    PolicyDetails: {
      title:"",
      filename:"",
      category_id:"",
      standard_id:"",
      description: "",
      status: "",
    },
  },
  reducers: {
    SetPolicyLists(state, action) {
      state.PolicyLists = action.payload;
    },
    SetCategoryDropDown(state, action) {
      state.CategoryDropDown = action.payload;
    },
    SetStandardCatDropDown(state, action) {
      state.StandardCatDropDown = action.payload;
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
  SetCategoryDropDown,
  SetStandardCatDropDown,
  SetTotalPolicy,
  SetPolicyDetails,
  ResetPolicyDetails,
} = PolicySlice.actions;
export default PolicySlice.reducer;
