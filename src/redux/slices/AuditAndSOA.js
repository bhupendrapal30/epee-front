import { createSlice } from "@reduxjs/toolkit";

const AuditAndSOASlice = createSlice({
  name: "AuditAndSOA",
  initialState: {
    AuditList: [],
    AuditListLength: 0,
    AuditData: {},
    SOAList: [],
    SOAListLength: 0,
    SOAData: {},
    SOAAnnexList: [],
    SOAAnnexListLength: 0,
  },
  reducers: {
    SetAuditList(state, action) {
      state.AuditList = action.payload;
    },
    SetAuditListLength(state, action) {
      state.AuditListLength = action.payload;
    },
    SetSOAList(state, action) {
      state.SOAList = action.payload;
    },
    SetSOAListLength(state, action) {
      state.SOAListLength = action.payload;
    },
    SetSOAAnnexList(state, action) {
      state.SOAAnnexList = action.payload;
    },
    SetSOAAnnexListLength(state, action) {
      state.SOAAnnexListLength = action.payload;
    },
  },
});

export const {
  SetAuditList,
  SetAuditListLength,
  SetSOAList,
  SetSOAListLength,
  SetSOAAnnexList,
  SetSOAAnnexListLength,
} = AuditAndSOASlice.actions;
export default AuditAndSOASlice.reducer;
