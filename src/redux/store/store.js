//External Lib Import
import { configureStore } from "@reduxjs/toolkit";

//Internal Import
import LoaderSlice from "../slices/LoaderSlice";
import SettingSlice from "../slices/SettingSlice";
import AuthSlice from "../slices/AuthSlice";
import UserSlice from "../slices/UserSlice";
import DepartmentSlice from "../slices/DepartmentSlice";
import LeaveTypeSlice from "../slices/LeaveTypeSlice";
import EmployeeSlice from "../slices/EmployeeSlice";
import LeaveSlice from "../slices/LeaveSlice";
import SummarySlice from "../slices/SummarySlice";
import ProfileSlice from "../slices/ProfileSlice";
import RoleSlice from "../slices/RoleSlice";
import PolicySlice from "../slices/PolicySlice";
import PermissionSlice from "../slices/PermissionSlice";
import ModuleSlice from "../slices/ModuleSlice";



const store = configureStore({
  reducer: {
    Loader: LoaderSlice,
    Setting: SettingSlice,
    Auth: AuthSlice,
    User: UserSlice,
    Department: DepartmentSlice,
    LeaveType: LeaveTypeSlice,
    Employee: EmployeeSlice,
    Leave: LeaveSlice,
    Summary: SummarySlice,
    Profile: ProfileSlice,
    Role: RoleSlice,
    Policy: PolicySlice,
    Permission: PermissionSlice,
    Module: ModuleSlice,
  },
});

export default store;
