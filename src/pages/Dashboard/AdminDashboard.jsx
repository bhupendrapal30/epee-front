// @flow
import React, { useEffect, useState } from "react";
import { Row, Col } from "react-bootstrap";
import { useTranslation } from "react-i18next";

// components
import Statistics from "./Statistics";
import PerformanceChart from "./PerformanceChart";
import EmployeeRequest from "../../APIRequest/EmployeeRequest";
import { useSelector } from "react-redux";
// import SummaryRequest from "../../APIRequest/SummaryRequest";
// import DepartmentHead from "./DepartmentHead";
// import StaffListCom from "./StaffList";

const AdminDashboard = () => {
  const { t } = useTranslation();

  useEffect(() => {
    // EmployeeRequest.EmployeeList(1, 5, 0);
    // SummaryRequest.DashboardSummaryAdmin();
    // EmployeeRequest.DepartmentHeads();
    // EmployeeRequest.StaffList();
  }, []);

  // const { EmployeeLists, TotalEmployee, DepartmentHeadsList, StaffList } =
  //   useSelector((state) => state.Employee);

  // const { SummaryLists, TotalSummary } = useSelector((state) => state.Summary);

  return (
    <>
    <div className="main-panel" style={{width:"80%",marginTop: "46px",minHeight:"681px;"}}>
        <div className="content-wrapper">
          <div className="page-header">
            <h3 className="page-title">
              <span className="page-title-icon bg-gradient-primary text-white me-2">
                <i className="mdi mdi-home" />
              </span> Dashboard
            </h3>
            <nav aria-label="breadcrumb">
              <ul className="breadcrumb">
                <li className="breadcrumb-item active" aria-current="page">
                  <span />Overview <i className="mdi mdi-alert-circle-outline icon-sm text-primary align-middle" />
                </li>
              </ul>
            </nav>
          </div>
      <div className="row">
        <div className="col-md-4 stretch-card grid-margin">
          <div className="card bg-gradient-danger card-img-holder text-white">
            <div className="card-body">
              <img src="assets/images/dashboard/circle.svg" className="card-img-absolute" alt="circle-image" />
              <h4 className="font-weight-normal mb-3">Total Users <i className="mdi mdi-chart-line mdi-24px float-right" />
              </h4>
              <h2 className="mb-5">5</h2>
              <h6 className="card-text"></h6>
            </div>
          </div>
        </div>
        <div className="col-md-4 stretch-card grid-margin">
          <div className="card bg-gradient-info card-img-holder text-white">
            <div className="card-body">
              <img src="assets/images/dashboard/circle.svg" className="card-img-absolute" alt="circle-image" />
              <h4 className="font-weight-normal mb-3">Total Policy <i className="mdi mdi-bookmark-outline mdi-24px float-right" />
              </h4>
              <h2 className="mb-5">6</h2>
              <h6 className="card-text"></h6>
            </div>
          </div>
        </div>
        <div className="col-md-4 stretch-card grid-margin">
          <div className="card bg-gradient-success card-img-holder text-white">
            <div className="card-body">
              <img src="assets/images/dashboard/circle.svg" className="card-img-absolute" alt="circle-image" />
              <h4 className="font-weight-normal mb-3">Visitors Online <i className="mdi mdi-diamond mdi-24px float-right" />
              </h4>
              <h2 className="mb-5">95,5741</h2>
              <h6 className="card-text">Increased by 5%</h6>
            </div>
          </div>
        </div>
      </div>
         
          
         
         
        </div>
        
      </div>
    
 

    </>
  );
};

export default AdminDashboard;
