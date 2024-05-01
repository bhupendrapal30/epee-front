//External Lib Import
import { createSlice } from "@reduxjs/toolkit";

const RiskSlice = createSlice({
  name: "Risk",
  initialState: {
    RiskLists: [],
    RiskControlLists:[],
    RiskMitigationLists:[],
    RiskownerDropDown:[],
    TotalRisk: 0,
    RiskDetails: {
      riskcategoryid:"",
      action1:"",
      Vulnerabilitygroupid:"",
      Vulnerabilitynameid:"",
      threatdescription:"",
      status: "",
      Threatnameid:"",
      Assettypeid:"",
      departmentid:"",
      riskowneremail:"",
      createdby: "",
    },
  },
  reducers: {
    SetRiskLists(state, action) {
      state.RiskLists = action.payload;
    },

    SetRiskControlLists(state, action) {
      state.RiskControlLists = action.payload;
    },

    SetRiskMitigationLists(state, action) {
      state.RiskMitigationLists = action.payload;
    },
    SetRiskownerDropDown(state, action) {
      state.RiskownerDropDown = action.payload;
    },
    
    SetTotalRisk(state, action) {
      state.TotalRisk = action.payload;
    },
    SetRiskDetails(state, action) {
      state.RiskDetails = action.payload;
    },
    ResetRiskDetails(state, action) {
      state.riskcategoryid="";
      state.Vulnerabilitygroupid="";
      state.Vulnerabilitynameid="";
      state.departmentsid="";
      state.threatdescription="";
      state.status= "";
      state.Threatnameid="";
      state.Assettypeid="";
      state.riskowneremail="";
     
    },
  },
});

export const {
  SetRiskLists,
  SetRiskControlLists,
  SetRiskMitigationLists,
  SetTotalRisk,
  SetRiskDetails,
  ResetRiskDetails,
  SetRiskownerDropDown,
} = RiskSlice.actions;
export default RiskSlice.reducer;
