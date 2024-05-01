import React, { useEffect } from "react";
import { Navigate, Route, Routes, useRoutes } from "react-router-dom";
import { useSelector } from "react-redux";
import * as layoutConstants from "../redux/slices/SettingSlice";

// All layouts/containers
import DefaultLayout from "../layouts/Default";
import VerticalLayout from "../layouts/Vertical";
import DetachedLayout from "../layouts/Detached";
import HorizontalLayout from "../layouts/Horizontal";
import FullLayout from "../layouts/Full";

//External Lib Import

// Auth
const Login = React.lazy(() => import("../pages/Account/Login"));

//Page
const AdminDashboard = React.lazy(() =>
  import("../pages/Dashboard/AdminDashboard"),
);
const HodDashboard = React.lazy(() =>
  import("../pages/Dashboard/HodDashboard"),
);

const Logout = React.lazy(() => import("../pages/Account/Logout"));

const DepartmentCreateUpdatePage = React.lazy(() =>
  import("../pages/Department/DepartmentCreateUpdatePage"),
);
const DepartmentListPage = React.lazy(() =>
  import("../pages/Department/DepartmentListPage"),
);

const FrameworkCreateUpdatePage = React.lazy(() =>
  import("../pages/Framework/FrameworkCreateUpdatePage"),
);

const FrameworkListPage = React.lazy(() =>
  import("../pages/Framework/FrameworkListPage"),
);

const ClauseCreateUpdatePage = React.lazy(() =>
  import("../pages/Clause/ClauseCreateUpdatePage"),
);

const ClauseListPage = React.lazy(() =>
  import("../pages/Clause/ClauseListPage"),
);


const SubclauseCreateUpdatePage = React.lazy(() =>
  import("../pages/Subclause/SubclauseCreateUpdatePage"),
);

const SubclauseListPage = React.lazy(() =>
  import("../pages/Subclause/SubclauseListPage"),
);

const ControlCreateUpdatePage = React.lazy(() =>
  import("../pages/Control/ControlCreateUpdatePage"),
);

const ControlListPage = React.lazy(() =>
  import("../pages/Control/ControlListPage"),
);


const SubcontrolCreateUpdatePage = React.lazy(() =>
  import("../pages/Subcontrol/SubcontrolCreateUpdatePage"),
);

const SubcontrolListPage = React.lazy(() =>
  import("../pages/Subcontrol/SubcontrolListPage"),
);

const LeaveTypeCreateUpdatePage = React.lazy(() =>
  import("../pages/LeaveType/LeaveTypeCreateUpdatePage"),
);
const LeaveTypeListPage = React.lazy(() =>
  import("../pages/LeaveType/LeaveTypeListPage"),
);

const EmployeeCreateUpdatePage = React.lazy(() =>
  import("../pages/Employee/EmployeeCreateUpdatePage"),
);
const EmployeeListPage = React.lazy(() =>
  import("../pages/Employee/EmployeeListPage"),
);

const UsersCreateUpdatePage = React.lazy(() =>
  import("../pages/Users/UsersCreateUpdatePage"),
);
const UsersListPage = React.lazy(() =>
  import("../pages/Users/UsersListPage"),
);

const RolesCreateUpdatePage = React.lazy(() =>
  import("../pages/Roles/RolesCreateUpdatePage"),
);
const RolesListPage = React.lazy(() =>
  import("../pages/Roles/RolesListPage"),
);

const PolicyCreateUpdatePage = React.lazy(() =>
  import("../pages/Policies/PolicyCreateUpdatePage"),
);

const PolicyCreateUpdatePageNew = React.lazy(() =>
  import("../pages/Policies/PolicyCreateUpdatePageNew"),
);

const PolicyCreateUpdatePageTab = React.lazy(() =>
  import("../pages/Policies/PolicyCreateUpdatePageTab"),
);



const PolicyListPage = React.lazy(() =>
  import("../pages/Policies/PolicyListPage"),
);

const PolicyVersionListPage = React.lazy(() =>
  import("../pages/Policies/PolicyVersionListPage"),
);

const PolicyApproverListPage = React.lazy(() =>
  import("../pages/Policies/ApproverList"),
);

const PolicyApprovedListPage = React.lazy(() =>
  import("../pages/Policies/PolicyApprovedListPage"),
);

const PolicyPendingListPage = React.lazy(() =>
  import("../pages/Policies/PolicyPendingListPage"),
);

const PolicyRejectListPage = React.lazy(() =>
  import("../pages/Policies/PolicyRejectListPage"),
);
const PermissionCreateUpdatePage = React.lazy(() =>
  import("../pages/Permission/PermissionCreateUpdatePage"),
);
const PermissionListPage = React.lazy(() =>
  import("../pages/Permission/PermissionListPage"),
);

const LeaveAdminUpdatePage = React.lazy(() =>
  import("../pages/Leave/LeaveAdminUpdatePage"),
);
const LeaveAdminListPage = React.lazy(() =>
  import("../pages/Leave/LeaveAdminListPage"),
);
const LeaveListAdminPending = React.lazy(() =>
  import("../pages/Leave/LeaveListAdminPending"),
);

const LeaveListAdminApproved = React.lazy(() =>
  import("../pages/Leave/LeaveListAdminApproved"),
);

const LeaveListAdminRejected = React.lazy(() =>
  import("../pages/Leave/LeaveListAdminRejected"),
);

const LeaveListHodPending = React.lazy(() =>
  import("../pages/Leave/LeaveListHodPending"),
);

const LeaveListHodApproved = React.lazy(() =>
  import("../pages/Leave/LeaveListHodApproved"),
);

const LeaveListHodRejected = React.lazy(() =>
  import("../pages/Leave/LeaveListHodRejected"),
);

const LeaveListHodPage = React.lazy(() =>
  import("../pages/Leave/LeaveListHodPage"),
);
const LeaveHodCreateUpdatePage = React.lazy(() =>
  import("../pages/Leave/LeaveHodCreateUpdatePage"),
);

const LeaveCreateUpdatePage = React.lazy(() =>
  import("../pages/Leave/LeaveCreateUpdatePage"),
);

const LeaveListEmployeePage = React.lazy(() =>
  import("../pages/Leave/LeaveListEmployeePage"),
);

const EmployeeDashboard = React.lazy(() =>
  import("../pages/Dashboard/EmployeeDashboard"),
);

const ProfilePage = React.lazy(() => import("../pages/Profile/ProfilePage"));
const ChangePasswordPage = React.lazy(() =>
  import("../pages/Profile/ChangePasswordPage"),
);

const ForgetPassword = React.lazy(() =>
  import("../pages/Account/ForgetPassword"),
);

const VerifyOtpPage = React.lazy(() =>
  import("../pages/Account/VerifyOtpPage"),
);

const ResetPasswordPage = React.lazy(() =>
  import("../pages/Account/ResetPasswordPage"),
);


//Training Management
const TrainingMgmt = React.lazy(() =>
  import("../pages/TrainingMgmt/TrainingMgmt")
);
const TrainingMgmtList = React.lazy(() =>
  import("../pages/TrainingMgmt/TrainingMgmtList")
);
const Quiz = React.lazy(() => import("../pages/TrainingMgmt/Quiz"));
const Questions = React.lazy(() => import("../pages/TrainingMgmt/Questions"));
const QuestionsList = React.lazy(() => import("../pages/TrainingMgmt/Questionlist"));
const QandAList = React.lazy(() => import("../pages/TrainingMgmt/QandAList"));
const QuizList = React.lazy(() => import("../pages/TrainingMgmt/QuizList"));
const Survey = React.lazy(() => import("../pages/TrainingMgmt/Survey"));
const SurveyList = React.lazy(() => import("../pages/TrainingMgmt/SurveyList"));
const SurveyQuestion = React.lazy(() =>
  import("../pages/TrainingMgmt/SurveyQuestion")
);
const SurveyQuestionList = React.lazy(() =>
  import("../pages/TrainingMgmt/SurveyQuestionList")
);

//Asset Management
const Asset = React.lazy(() => import("../pages/AssestMgmt/Asset"));
const AssetList = React.lazy(() => import("../pages/AssestMgmt/AssetList"));
const AssetAssignment = React.lazy(() =>
  import("../pages/AssestMgmt/AssetAssignment")
);
const AssetAssignmentList = React.lazy(() => import("../pages/AssestMgmt/AssetAssignmentList"));
const AssetInventory = React.lazy(() =>
  import("../pages/AssestMgmt/AssetInventory")
);
const AssetInventoryList = React.lazy(() => import("../pages/AssestMgmt/AssetInventoryList"));


//Vendor Management
const VendorDetails = React.lazy(() =>
  import("../pages/VendorManagement/VendorDetails")
);
const VendorDetailsList = React.lazy(() =>
  import("../pages/VendorManagement/VendorDetailsList")
);
const VendorRisk = React.lazy(() =>
  import("../pages/VendorManagement/VendorRisk")
);
const VendorRiskList = React.lazy(() =>
  import("../pages/VendorManagement/VendorRiskList")
);
const VendorPerformanceRating = React.lazy(() =>
  import("../pages/VendorManagement/VendorPerformanceRating")
);
const VendorPerformanceRatingList = React.lazy(() =>
  import("../pages/VendorManagement/VendorPerformanceRatingList")
);

//Audit Management
const Audit = React.lazy(() =>
  import("../pages/AuditMgmt/Audit")
);
const AuditListing = React.lazy(() => import("../pages/AuditMgmt/AuditListing"));
const ClauseWiseDetailsListing = React.lazy(() =>
  import("../pages/AuditMgmt/ClauseWiseDetailList")
);
const ClauseWiseAuditDetailUpdate = React.lazy(() =>
  import("../pages/AuditMgmt/ClauseWiseAuditDetailUpdate")
);
const AnnexWiseDetailsListing = React.lazy(() =>
  import("../pages/AuditMgmt/AnnexWiseDetailsList")
);
const AnnexWiseAuditDetailUpdate = React.lazy(() =>
  import("../pages/AuditMgmt/AnnexWiseAuditDetailUpdate")
);
//SOA
const SOA = React.lazy(() =>
  import("../pages/AuditMgmt/SOA")
);
const SOAListing = React.lazy(() => import("../pages/AuditMgmt/SOAList"));
const SOAAnnexDetailsList = React.lazy(() =>
  import("../pages/AuditMgmt/SoaAnnexDetailsListing")
);
const AnnexWiseSoaDetailUpdate = React.lazy(() =>
  import("../pages/AuditMgmt/AnnexWiseSoaDetailUpdate")
);

const LoadComponent = ({ component: Component }) => {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  return <Component />;
};

const AllRoutes = () => {
  const { LayoutType } = useSelector((state) => state.Setting);
  const { UserDetails } = useSelector((state) => state.User);
  const { AccessToken } = useSelector((state) => state.Auth);

  const getLayout = () => {
    let layoutCls = VerticalLayout;

    switch (LayoutType) {
      case layoutConstants.LAYOUT_HORIZONTAL:
        layoutCls = HorizontalLayout;
        break;
      case layoutConstants.LAYOUT_DETACHED:
        layoutCls = DetachedLayout;
        break;
      case layoutConstants.LAYOUT_FULL:
        layoutCls = FullLayout;
        break;
      default:
        layoutCls = VerticalLayout;
        break;
    }
    return layoutCls;
  };

  let Layout = getLayout();

  if (AccessToken && UserDetails?.usertype === "STAFF") {
    return (
      <Routes>
        <Route to="/" element={<Layout />}>
          <Route
            path="/dashboard"
            element={<LoadComponent component={EmployeeDashboard} />}
          />
          <Route
            path="/leave/leave-create-update"
            element={<LoadComponent component={LeaveCreateUpdatePage} />}
          />
          <Route
            path="/leave/leave-list"
            element={<LoadComponent component={LeaveListEmployeePage} />}
          />
          <Route
            path="/leave/leave-list-pending"
            element={<LoadComponent component={LeaveListHodPending} />}
          />
          <Route
            path="/leave/leave-list-approved"
            element={<LoadComponent component={LeaveListHodApproved} />}
          />
          <Route
            path="/leave/leave-list-rejected"
            element={<LoadComponent component={LeaveListHodRejected} />}
          />
          <Route
            path="/account/profile"
            element={<LoadComponent component={ProfilePage} />}
          />
          <Route
            path="/account/setting"
            element={<LoadComponent component={ChangePasswordPage} />}
          />
          <Route
            path="/training/trainingmgmt"
            element={<LoadComponent component={TrainingMgmt} />}
          />
          <Route
            path="/training/traininglist"
            element={<LoadComponent component={TrainingMgmtList} />}
          />
          <Route
            path="/training/quiz"
            element={<LoadComponent component={Quiz} />}
          />
          <Route
            path="/Quiz/Quizlist"
            element={<LoadComponent component={QuizList} />}
          />
          <Route
            path="/training/questions"
            element={<LoadComponent component={Questions} />}
          />
          <Route
            path="/training/questionslist"
            element={<LoadComponent component={QuestionsList} />}
          />
          <Route
            path="/QandA/QandA-list"
            element={<LoadComponent component={QandAList} />}
          />
          <Route
            path="/Survey"
            element={<LoadComponent component={Survey} />}
          />
          <Route
            path="/Surveylist"
            element={<LoadComponent component={SurveyList} />}
          />
          <Route
            path="/SurveyQuestion"
            element={<LoadComponent component={SurveyQuestion} />}
          />
          <Route
            path="/SurveyQuestionList"
            element={<LoadComponent component={SurveyQuestionList} />}
          />
          <Route path="/Asset" element={<LoadComponent component={Asset} />} />
          <Route
            path="/AssetList"
            element={<LoadComponent component={AssetList} />}
          />
          <Route
            path="/AssetAssignment"
            element={<LoadComponent component={AssetAssignment} />}
          />
          <Route
            path="/AssetAssignmentList"
            element={<LoadComponent component={AssetAssignmentList} />}
          />
          <Route
            path="/AssetInventory"
            element={<LoadComponent component={AssetInventory} />}
          />
          <Route
            path="/AssetInventoryList"
            element={<LoadComponent component={AssetInventoryList} />}
          />
          <Route
            path="/VendorDetails"
            element={<LoadComponent component={VendorDetails} />}
          />
          <Route
            path="/VendorDetailsList"
            element={<LoadComponent component={VendorDetailsList} />}
          />
          <Route
            path="/VendorRisk"
            element={<LoadComponent component={VendorRisk} />}
          />
          <Route
            path="/VendorRiskList"
            element={<LoadComponent component={VendorRiskList} />}
          />
          <Route
            path="/VendorPerformanceRating"
            element={<LoadComponent component={VendorPerformanceRating} />}
          />
          <Route
            path="/VendorPerformanceRatingList"
            element={<LoadComponent component={VendorPerformanceRatingList} />}
          />
          <Route path="/Audit" element={<LoadComponent component={Audit} />} />
          <Route
            path="/AuditList"
            element={<LoadComponent component={AuditListing} />}
          />
          <Route
            path="/ClauseWiseDetailsList"
            element={<LoadComponent component={ClauseWiseDetailsListing} />}
          />
          <Route
            path="/AnnexWiseDetailsList"
            element={<LoadComponent component={AnnexWiseDetailsListing} />}
          />
          <Route
            path="/ClauseWiseAuditDetailUpdate"
            element={<LoadComponent component={ClauseWiseAuditDetailUpdate} />}
          />
          <Route
            path="/AnnexWiseAuditDetailUpdate"
            element={<LoadComponent component={AnnexWiseAuditDetailUpdate} />}
          />
          <Route path="/SOA" element={<LoadComponent component={SOA} />} />
          <Route
            path="/SOAList"
            element={<LoadComponent component={SOAListing} />}
          />
          <Route
            path="/SOAAnnexDetailsListing"
            element={<LoadComponent component={SOAAnnexDetailsList} />}
          />
          <Route
            path="/AnnexWiseSoaDetailUpdate"
            element={<LoadComponent component={AnnexWiseSoaDetailUpdate} />}
          />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Route>
      </Routes>
    );
  } else if (AccessToken && UserDetails?.Roles === "HOD") {
    return (
      <Routes>
        <Route to="/" element={<Layout />}>
          <Route
            path="/dashboard"
            element={<LoadComponent component={HodDashboard} />}
          />
          <Route
            path="/leave/leave-create-update"
            element={<LoadComponent component={LeaveHodCreateUpdatePage} />}
          />
          <Route
            path="/leave/leave-list"
            element={<LoadComponent component={LeaveListHodPage} />}
          />
          <Route
            path="/leave/leave-list-pending"
            element={<LoadComponent component={LeaveListHodPending} />}
          />
          <Route
            path="/leave/leave-list-approved"
            element={<LoadComponent component={LeaveListHodApproved} />}
          />
          <Route
            path="/leave/leave-list-rejected"
            element={<LoadComponent component={LeaveListHodRejected} />}
          />
          <Route
            path="/account/profile"
            element={<LoadComponent component={ProfilePage} />}
          />
          <Route
            path="/account/setting"
            element={<LoadComponent component={ChangePasswordPage} />}
          />
          <Route
            path="/training/trainingmgmt"
            element={<LoadComponent component={TrainingMgmt} />}
          />
          <Route
            path="/training/traininglist"
            element={<LoadComponent component={TrainingMgmtList} />}
          />
          <Route
            path="/training/quiz"
            element={<LoadComponent component={Quiz} />}
          />
          <Route
            path="/Quiz/Quizlist"
            element={<LoadComponent component={QuizList} />}
          />
          <Route
            path="/training/questions"
            element={<LoadComponent component={Questions} />}
          />
          <Route
            path="/training/questionslist"
            element={<LoadComponent component={QuestionsList} />}
          />
          <Route
            path="/QandA/QandA-list"
            element={<LoadComponent component={QandAList} />}
          />
          <Route
            path="/Survey"
            element={<LoadComponent component={Survey} />}
          />
          <Route
            path="/Surveylist"
            element={<LoadComponent component={SurveyList} />}
          />
          <Route
            path="/SurveyQuestion"
            element={<LoadComponent component={SurveyQuestion} />}
          />
          <Route
            path="/SurveyQuestionList"
            element={<LoadComponent component={SurveyQuestionList} />}
          />
          <Route path="/Asset" element={<LoadComponent component={Asset} />} />
          <Route
            path="/AssetList"
            element={<LoadComponent component={AssetList} />}
          />
          <Route
            path="/AssetAssignment"
            element={<LoadComponent component={AssetAssignment} />}
          />
          <Route
            path="/AssetAssignmentList"
            element={<LoadComponent component={AssetAssignmentList} />}
          />
          <Route
            path="/AssetInventory"
            element={<LoadComponent component={AssetInventory} />}
          />
          <Route
            path="/AssetInventoryList"
            element={<LoadComponent component={AssetInventoryList} />}
          />
          <Route
            path="/VendorDetails"
            element={<LoadComponent component={VendorDetails} />}
          />
          <Route
            path="/VendorDetailsList"
            element={<LoadComponent component={VendorDetailsList} />}
          />
          <Route
            path="/VendorRisk"
            element={<LoadComponent component={VendorRisk} />}
          />
          <Route
            path="/VendorRiskList"
            element={<LoadComponent component={VendorRiskList} />}
          />
          <Route
            path="/VendorPerformanceRating"
            element={<LoadComponent component={VendorPerformanceRating} />}
          />
          <Route
            path="/VendorPerformanceRatingList"
            element={<LoadComponent component={VendorPerformanceRatingList} />}
          />
          <Route path="/Audit" element={<LoadComponent component={Audit} />} />
          <Route
            path="/AuditList"
            element={<LoadComponent component={AuditListing} />}
          />
          <Route
            path="/ClauseWiseDetailsList"
            element={<LoadComponent component={ClauseWiseDetailsListing} />}
          />
          <Route
            path="/AnnexWiseDetailsList"
            element={<LoadComponent component={AnnexWiseDetailsListing} />}
          />
          <Route
            path="/ClauseWiseAuditDetailUpdate"
            element={<LoadComponent component={ClauseWiseAuditDetailUpdate} />}
          />
          <Route
            path="/AnnexWiseAuditDetailUpdate"
            element={<LoadComponent component={AnnexWiseAuditDetailUpdate} />}
          />
          <Route path="/SOA" element={<LoadComponent component={SOA} />} />
          <Route
            path="/SOAList"
            element={<LoadComponent component={SOAListing} />}
          />
          <Route
            path="/SOAAnnexDetailsListing"
            element={<LoadComponent component={SOAAnnexDetailsList} />}
          />
          <Route
            path="/AnnexWiseSoaDetailUpdate"
            element={<LoadComponent component={AnnexWiseSoaDetailUpdate} />}
          />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Route>
      </Routes>
    );
  } else if (AccessToken) {
    return (
      <Routes>
        <Route to="/" element={<Layout />}>
          <Route
            path="/dashboard"
            element={<LoadComponent component={AdminDashboard} />}
          />
          <Route
            path="/department/department-create-update"
            element={<LoadComponent component={DepartmentCreateUpdatePage} />}
          />
          <Route
            path="/department/department-list"
            element={<LoadComponent component={DepartmentListPage} />}
          />
          <Route
            path="/framework/framework-create-update"
            element={<LoadComponent component={FrameworkCreateUpdatePage} />}
          />
          <Route
            path="/framework/framework-list"
            element={<LoadComponent component={FrameworkListPage} />}
          />

          <Route
            path="/clause/clause-create-update"
            element={<LoadComponent component={ClauseCreateUpdatePage} />}
          />
          <Route
            path="/clause/clause-list"
            element={<LoadComponent component={ClauseListPage} />}
          />

          <Route
            path="/subclause/subclause-create-update"
            element={<LoadComponent component={SubclauseCreateUpdatePage} />}
          />
          <Route
            path="/subclause/subclause-list"
            element={<LoadComponent component={SubclauseListPage} />}
          />

          <Route
            path="/control/control-create-update"
            element={<LoadComponent component={ControlCreateUpdatePage} />}
          />
          <Route
            path="/control/control-list"
            element={<LoadComponent component={ControlListPage} />}
          />

          <Route
            path="/subcontrol/subcontrol-create-update"
            element={<LoadComponent component={SubcontrolCreateUpdatePage} />}
          />
          <Route
            path="/subcontrol/subcontrol-list"
            element={<LoadComponent component={SubcontrolListPage} />}
          />

          <Route
            path="/leave-type/leave-type-create-update"
            element={<LoadComponent component={LeaveTypeCreateUpdatePage} />}
          />
          <Route
            path="/leave-type/leave-type-list"
            element={<LoadComponent component={LeaveTypeListPage} />}
          />
          <Route
            path="/employee/employee-create-update"
            element={<LoadComponent component={EmployeeCreateUpdatePage} />}
          />
          <Route
            path="/employee/employee-list"
            element={<LoadComponent component={EmployeeListPage} />}
          />
          <Route
            path="/users/users-create-update"
            element={<LoadComponent component={UsersCreateUpdatePage} />}
          />
          <Route
            path="/users/users-list"
            element={<LoadComponent component={UsersListPage} />}
          />
          <Route
            path="/roles/roles-create-update"
            element={<LoadComponent component={RolesCreateUpdatePage} />}
          />
          <Route
            path="/roles/roles-list"
            element={<LoadComponent component={RolesListPage} />}
          />

          <Route
            path="/policies/policy-list"
            element={<LoadComponent component={PolicyListPage} />}
          />
          <Route
            path="/policies/policy-version-list"
            element={<LoadComponent component={PolicyVersionListPage} />}
          />

          <Route
            path="/policies/policy-approver-list"
            element={<LoadComponent component={PolicyApproverListPage} />}
          />

          <Route
            path="/policies/approved-policy"
            element={<LoadComponent component={PolicyApprovedListPage} />}
          />

          <Route
            path="/policies/pending-policy"
            element={<LoadComponent component={PolicyPendingListPage} />}
          />

          <Route
            path="/policies/rejected-policy"
            element={<LoadComponent component={PolicyRejectListPage} />}
          />

          <Route
            path="/policies/policy-create-update"
            element={<LoadComponent component={PolicyCreateUpdatePage} />}
          />

          <Route
            path="/policies/policy-create-update-new"
            element={<LoadComponent component={PolicyCreateUpdatePageNew} />}
          />

          <Route
            path="/policies/policy-create-update-tab"
            element={<LoadComponent component={PolicyCreateUpdatePageTab} />}
          />
          <Route
            path="/permission/permission-list"
            element={<LoadComponent component={PermissionListPage} />}
          />
          <Route
            path="/permission/permission-create-update"
            element={<LoadComponent component={PermissionCreateUpdatePage} />}
          />
          <Route
            path="/leave/leave-create-update"
            element={<LoadComponent component={LeaveAdminUpdatePage} />}
          />
          <Route
            path="/leave/leave-list"
            element={<LoadComponent component={LeaveAdminListPage} />}
          />
          <Route
            path="/leave/leave-list-pending"
            element={<LoadComponent component={LeaveListAdminPending} />}
          />
          <Route
            path="/leave/leave-list-approved"
            element={<LoadComponent component={LeaveListAdminApproved} />}
          />
          <Route
            path="/leave/leave-list-rejected"
            element={<LoadComponent component={LeaveListAdminRejected} />}
          />
          <Route
            path="/account/profile"
            element={<LoadComponent component={ProfilePage} />}
          />
          <Route
            path="/account/setting"
            element={<LoadComponent component={ChangePasswordPage} />}
          />
          <Route
            path="/training/trainingmgmt"
            element={<LoadComponent component={TrainingMgmt} />}
          />
          <Route
            path="/training/traininglist"
            element={<LoadComponent component={TrainingMgmtList} />}
          />
          <Route
            path="/training/quiz"
            element={<LoadComponent component={Quiz} />}
          />
          <Route
            path="/Quiz/Quizlist"
            element={<LoadComponent component={QuizList} />}
          />
          <Route
            path="/training/questions"
            element={<LoadComponent component={Questions} />}
          />
          <Route
            path="/training/questionslist"
            element={<LoadComponent component={QuestionsList} />}
          />
          <Route
            path="/QandA/QandA-list"
            element={<LoadComponent component={QandAList} />}
          />
          <Route
            path="/Survey"
            element={<LoadComponent component={Survey} />}
          />
          <Route
            path="/Surveylist"
            element={<LoadComponent component={SurveyList} />}
          />
          <Route
            path="/SurveyQuestion"
            element={<LoadComponent component={SurveyQuestion} />}
          />
          <Route
            path="/SurveyQuestionList"
            element={<LoadComponent component={SurveyQuestionList} />}
          />
          <Route path="/Asset" element={<LoadComponent component={Asset} />} />
          <Route
            path="/AssetList"
            element={<LoadComponent component={AssetList} />}
          />
          <Route
            path="/AssetAssignment"
            element={<LoadComponent component={AssetAssignment} />}
          />
          <Route
            path="/AssetAssignmentList"
            element={<LoadComponent component={AssetAssignmentList} />}
          />
          <Route
            path="/AssetInventory"
            element={<LoadComponent component={AssetInventory} />}
          />
          <Route
            path="/AssetInventoryList"
            element={<LoadComponent component={AssetInventoryList} />}
          />
          <Route
            path="/VendorDetails"
            element={<LoadComponent component={VendorDetails} />}
          />
          <Route
            path="/VendorDetailsList"
            element={<LoadComponent component={VendorDetailsList} />}
          />
          <Route
            path="/VendorRisk"
            element={<LoadComponent component={VendorRisk} />}
          />
          <Route
            path="/VendorRiskList"
            element={<LoadComponent component={VendorRiskList} />}
          />
          <Route
            path="/VendorPerformanceRating"
            element={<LoadComponent component={VendorPerformanceRating} />}
          />
          <Route
            path="/VendorPerformanceRatingList"
            element={<LoadComponent component={VendorPerformanceRatingList} />}
          />
          <Route path="/Audit" element={<LoadComponent component={Audit} />} />
          <Route
            path="/AuditList"
            element={<LoadComponent component={AuditListing} />}
          />
          <Route
            path="/ClauseWiseDetailsList"
            element={<LoadComponent component={ClauseWiseDetailsListing} />}
          />
          <Route
            path="/AnnexWiseDetailsList"
            element={<LoadComponent component={AnnexWiseDetailsListing} />}
          />
          <Route
            path="/ClauseWiseAuditDetailUpdate"
            element={<LoadComponent component={ClauseWiseAuditDetailUpdate} />}
          />
          <Route
            path="/AnnexWiseAuditDetailUpdate"
            element={<LoadComponent component={AnnexWiseAuditDetailUpdate} />}
          />
          <Route path="/SOA" element={<LoadComponent component={SOA} />} />
          <Route
            path="/SOAList"
            element={<LoadComponent component={SOAListing} />}
          />
          <Route
            path="/SOAAnnexDetailsListing"
            element={<LoadComponent component={SOAAnnexDetailsList} />}
          />
          <Route
            path="/AnnexWiseSoaDetailUpdate"
            element={<LoadComponent component={AnnexWiseSoaDetailUpdate} />}
          />
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Route>
      </Routes>
    );
  } else {
    return (
      <Routes>
        <Route path="/" element={<DefaultLayout />}>
          <Route path="" element={<Navigate to="/account/login" />} />
          <Route path="*" element={<Navigate to="/account/login" />} />
          <Route
            path="/account/login"
            element={<LoadComponent component={Login} />}
          />
          <Route
            path="/account/logout"
            element={<LoadComponent component={Logout} />}
          />
          <Route
            path="/account/forget-password"
            element={<LoadComponent component={ForgetPassword} />}
          />
          <Route
            path="/account/verify-otp"
            element={<LoadComponent component={VerifyOtpPage} />}
          />
          <Route
            path="/account/reset-password"
            element={<LoadComponent component={ResetPasswordPage} />}
          />
          <Route
            path="/training/trainingmgmt"
            element={<LoadComponent component={TrainingMgmt} />}
          />
          <Route
            path="/training/traininglist"
            element={<LoadComponent component={TrainingMgmtList} />}
          />
          <Route
            path="/training/quiz"
            element={<LoadComponent component={Quiz} />}
          />
          <Route
            path="/Quiz/Quizlist"
            element={<LoadComponent component={QuizList} />}
          />
          <Route
            path="/training/questions"
            element={<LoadComponent component={Questions} />}
          />
          <Route
            path="/training/questionslist"
            element={<LoadComponent component={QuestionsList} />}
          />
          <Route
            path="/QandA/QandA-list"
            element={<LoadComponent component={QandAList} />}
          />
          <Route
            path="/Survey"
            element={<LoadComponent component={Survey} />}
          />
          <Route
            path="/Surveylist"
            element={<LoadComponent component={SurveyList} />}
          />
          <Route
            path="/SurveyQuestion"
            element={<LoadComponent component={SurveyQuestion} />}
          />
          <Route
            path="/SurveyQuestionList"
            element={<LoadComponent component={SurveyQuestionList} />}
          />
          <Route path="/Asset" element={<LoadComponent component={Asset} />} />
          <Route
            path="/AssetList"
            element={<LoadComponent component={AssetList} />}
          />
          <Route
            path="/AssetAssignment"
            element={<LoadComponent component={AssetAssignment} />}
          />
          <Route
            path="/AssetAssignmentList"
            element={<LoadComponent component={AssetAssignmentList} />}
          />
          <Route
            path="/AssetInventory"
            element={<LoadComponent component={AssetInventory} />}
          />
          <Route
            path="/AssetInventoryList"
            element={<LoadComponent component={AssetInventoryList} />}
          />
          <Route
            path="/VendorDetails"
            element={<LoadComponent component={VendorDetails} />}
          />
          <Route
            path="/VendorDetailsList"
            element={<LoadComponent component={VendorDetailsList} />}
          />
          <Route
            path="/VendorRisk"
            element={<LoadComponent component={VendorRisk} />}
          />
          <Route
            path="/VendorRiskList"
            element={<LoadComponent component={VendorRiskList} />}
          />
          <Route
            path="/VendorPerformanceRating"
            element={<LoadComponent component={VendorPerformanceRating} />}
          />
          <Route
            path="/VendorPerformanceRatingList"
            element={<LoadComponent component={VendorPerformanceRatingList} />}
          />
          <Route path="/Audit" element={<LoadComponent component={Audit} />} />
          <Route
            path="/AuditList"
            element={<LoadComponent component={AuditListing} />}
          />
          <Route
            path="/ClauseWiseDetailsList"
            element={<LoadComponent component={ClauseWiseDetailsListing} />}
          />
          <Route
            path="/AnnexWiseDetailsList"
            element={<LoadComponent component={AnnexWiseDetailsListing} />}
          />
          <Route
            path="/ClauseWiseAuditDetailUpdate"
            element={<LoadComponent component={ClauseWiseAuditDetailUpdate} />}
          />
          <Route
            path="/AnnexWiseAuditDetailUpdate"
            element={<LoadComponent component={AnnexWiseAuditDetailUpdate} />}
          />
          <Route path="/SOA" element={<LoadComponent component={SOA} />} />
          <Route
            path="/SOAList"
            element={<LoadComponent component={SOAListing} />}
          />
          <Route
            path="/SOAAnnexDetailsListing"
            element={<LoadComponent component={SOAAnnexDetailsList} />}
          />
          <Route
            path="/AnnexWiseSoaDetailUpdate"
            element={<LoadComponent component={AnnexWiseSoaDetailUpdate} />}
          />
        </Route>
      </Routes>
    );
  }
};

export default AllRoutes;
