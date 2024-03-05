//External Lib Import
import { createSlice } from "@reduxjs/toolkit";

const PolicySlice = createSlice({
  name: "Policy",
  initialState: {
    PolicyLists: [],
    PolicyVersionLists: [],
    CategoryDropDown:[],
    StandardCatDropDown:[],
    assignerDropdrown:[],
    SetownerDropdrown:[],
    departmentDropdrown:[],
    reccurenceDropdrown:[],
    frameworkDropDown:[],
    clauseDropdrown:[],
    subclauseDropdrown:[],
    TotalPolicy: 0,
    PolicyDetails: {
      policyname:"",
      primaryassignee:"",
      reccurenceid:"",
      departmentsid:"",
      policyrequirements:"",
      status: "",
      ownerid:[],
      approverid:[],
      frameworkid:"",
      controlid:"",
      subcontrolid:"",
      clauseid:"",
      subclauseid:"",
      createdby: "",
      
    },
  },
  reducers: {
    SetPolicyLists(state, action) {
      state.PolicyLists = action.payload;
    },
    SetPolicyVersionLists(state, action) {
      state.PolicyVersionLists = action.payload;
    },
    SetCategoryDropDown(state, action) {
      state.CategoryDropDown = action.payload;
    },

    SetStandardCatDropDown(state, action) {
      state.StandardCatDropDown = action.payload;
    },
    SetframeworkDropDown(state, action) {
      state.frameworkDropDown = action.payload;
    },
    SetclauseDropdrown(state, action) {
      state.frameworkDropDown = action.payload;
    },
    SetsubclauseDropdrown(state, action) {
      state.frameworkDropDown = action.payload;
    },
    
    SetassignerDropdrown(state, action) {
      state.assignerDropdrown = action.payload;
    },
    SetownerDropdrown(state, action) {
      state.ownerDropdrown = action.payload;
    },
    SetdepartmentDropdrown(state, action) {
      state.departmentDropdrown = action.payload;
    },
    SetreccurenceDropdrown(state, action) {
      state.reccurenceDropdrown = action.payload;
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
  SetPolicyVersionLists,
  SetCategoryDropDown,
  SetStandardCatDropDown,
  SetassignerDropdrown,
  SetownerDropdrown,
  SetdepartmentDropdrown,
  SetreccurenceDropdrown,
  SetframeworkDropDown,
  SetclauseDropdrown,
  SetsubclauseDropdrown,
  SetTotalPolicy,
  SetPolicyDetails,
  ResetPolicyDetails,
} = PolicySlice.actions;
export default PolicySlice.reducer;
