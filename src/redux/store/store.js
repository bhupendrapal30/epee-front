//External Lib Import
import { configureStore } from "@reduxjs/toolkit";

//Internal Import
import LoaderSlice from "../slices/LoaderSlice";
import SettingSlice from "../slices/SettingSlice";
import AuthSlice from "../slices/AuthSlice";
import UserSlice from "../slices/UserSlice";
import DepartmentSlice from "../slices/DepartmentSlice";
import FrameworkSlice from "../slices/FrameworkSlice";
import ClauseSlice from "../slices/ClauseSlice";
import SubclauseSlice from "../slices/SubclauseSlice";
import ControlSlice from "../slices/ControlSlice";
import SubcontrolSlice from "../slices/SubcontrolSlice";
import RiskSlice from "../slices/RiskSlice";
import LeaveTypeSlice from "../slices/LeaveTypeSlice";
import EmployeeSlice from "../slices/EmployeeSlice";
import LeaveSlice from "../slices/LeaveSlice";
import SummarySlice from "../slices/SummarySlice";
import ProfileSlice from "../slices/ProfileSlice";
import RoleSlice from "../slices/RoleSlice";
import PolicySlice from "../slices/PolicySlice";
import PermissionSlice from "../slices/PermissionSlice";
import ModuleSlice from "../slices/ModuleSlice";
import QuestionsAndAnswers from "../slices/QuestionsAndAnswers";
import QuizSlice from "../slices/Quiz";
import SurveySlice from "../slices/Survey";
import SurveyQuestionSlice from "../slices/SurveyQuestion";
import AssetSlice from "../slices/AssetSlice";
import VendorSlice from "../slices/VendorSlice";
import AuditAndSOASlice from "../slices/AuditAndSOA";

const store = configureStore({
  reducer: {
    Loader: LoaderSlice,
    Setting: SettingSlice,
    Auth: AuthSlice,
    User: UserSlice,
    Framework:FrameworkSlice,
    Clause:ClauseSlice,
    Subclause:SubclauseSlice,
    Control:ControlSlice,
    Subcontrol:SubcontrolSlice,
    Risk:RiskSlice,
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
    QuestionAnswer: QuestionsAndAnswers,
    Quiz: QuizSlice,
    Survey: SurveySlice,
    SurveyQuestion: SurveyQuestionSlice,
    Asset: AssetSlice,
    Vendor: VendorSlice,
    AuditAndSOA: AuditAndSOASlice,
  },
});

export default store;
