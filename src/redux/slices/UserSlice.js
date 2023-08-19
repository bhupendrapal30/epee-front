//External Lib Import
import { createSlice } from "@reduxjs/toolkit";
import SessionHelper from "../../helpers/SessionHelper";

const UserSlice = createSlice({
  name: "User",
  initialState: {
    UserList: [],
    TotalUser: 0,
    UserData: {
      fname: "",
      lname: "",
      mobileNo: "",
      email: "",
      password: "",
      usertype: "",
      status: "",
    },
    UserDetails: SessionHelper.GetUserDetails() || undefined,
  },
  
  reducers: {
    SetUserDetails(state, action) {
      SessionHelper.SetUserDetails(action.payload);
      state.UserDetails = SessionHelper.GetUserDetails() || undefined;
    },
    SetUserList(state, action) {
      state.UserList = action.payload;
    },
    SetTotalUser(state, action) {
      state.TotalUser = action.payload;
    },
    SetUserData(state, action) {
      state.UserData = action.payload;
    },
    RemoveUserDetails(state, action) {
      SessionHelper.RemoveUserDetails();
      state.UserDetails = SessionHelper.GetUserDetails() || undefined;
    },
    ResetUserData(state, action) {
      
      state.fname = "";
      state.lname = "";
      state.mobileNo = "";
      state.email = "";
      state.password = "";
      state.usertype = "";
      state.status = "";
      
    },
  },
});

export const { SetUserDetails,SetUserData,ResetUserData,SetUserList,SetTotalUser,RemoveUserDetails } = UserSlice.actions;
export default UserSlice.reducer;
