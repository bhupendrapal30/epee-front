import { createSlice } from "@reduxjs/toolkit";

const VendorSlice = createSlice({
  name: "Vendor",
  initialState: {
    VendorDetailsList: [],
    VendorDetailsListLength: 0,
    VendorDetailsData: {},
    VendorPerformanceRatingList: [],
    VendorPerformanceRatingListLength: 0,
    VendorPerformanceRatingData: {},
    VendorRiskList: [],
    VendorRiskListLength: 0,
    VendorRiskData: {},
  },
  reducers: {
    SetVendorDetailsList(state, action) {
      state.VendorDetailsList = action.payload;
    },
    SetVendorDetailsListLength(state, action) {
      state.VendorDetailsListLength = action.payload;
    },
    SetVendorPerformanceRatingList(state, action) {
      state.VendorPerformanceRatingList = action.payload;
    },
    SetAVendorPerformanceRatingListLength(state, action) {
      state.VendorPerformanceRatingListLength = action.payload;
    },
    SetVendorRiskList(state, action) {
      state.VendorRiskList = action.payload;
    },
    SetVendorRiskListLength(state, action) {
      state.VendorRiskListLength = action.payload;
    },
  },
});

export const {
  SetVendorDetailsList,
  SetVendorDetailsListLength,
  SetVendorRiskList,
  SetVendorRiskListLength,
  SetVendorPerformanceRatingList,
  SetAVendorPerformanceRatingListLength,
} = VendorSlice.actions;
export default VendorSlice.reducer;
