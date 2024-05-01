import { createSlice } from "@reduxjs/toolkit";

const AssetSlice = createSlice({
  name: "Asset",
  initialState: {
    AssetTypeList: [],
    AssetTypeListLength: 0,
    AssetTypeData: {},
    AssetAssignmentList: [],
    AssetAssignmentListLength: 0,
    AssetAssignmentData: {},
    AssetInventoryList: [],
    AssetInventoryListLength: 0,
    AssetInventoryData: {},
  },
  reducers: {
    SetAssetTypeList(state, action) {
      state.AssetTypeList = action.payload;
    },
    SetAssetTypeListLength(state, action) {
      state.AssetTypeListLength = action.payload;
    },
    SetAssetAssignmentList(state, action) {
      state.AssetAssignmentList = action.payload;
    },
    SetAssetAssignmentListLength(state, action) {
      state.AssetAssignmentListLength = action.payload;
    },
    SetAssetInventoryList(state, action) {
      state.AssetTypeList = action.payload;
    },
    SetAssetInventoryListLength(state, action) {
      state.AssetTypeListLength = action.payload;
    },
  },
});

export const {
  SetAssetTypeList,
  SetAssetTypeListLength,
  SetAssetAssignmentList,
  SetAssetAssignmentListLength,
  SetAssetInventoryList,
  SetAssetInventoryListLength,
} = AssetSlice.actions;
export default AssetSlice.reducer;
