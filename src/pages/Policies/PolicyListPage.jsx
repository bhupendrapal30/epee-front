// External Lib Import
import React, { useEffect, useState } from "react";
import { Row, Col, Card, Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { GrDocumentCsv } from "react-icons/gr";
import { SiMicrosoftexcel } from "react-icons/si";
import classNames from "classnames";
import Axios from 'axios';


// Internal  Lib Import
import PageTitle from "../../components/Ui/PageTitle";
import { useSelector } from "react-redux";
import PolicyRequest from "../../APIRequest/PolicyRequest";
import AleartMessage from "../../helpers/AleartMessage";
import ExportDataJSON from "../../utils/ExportFromJSON";
import DateFormatter from "../../utils/DateFormatter";
import HtmlParser from "../../utils/HtmlParser";

import { useNavigate } from "react-router-dom";


const PolicyListPage = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [searchKey, setSearchKey] = useState(0);
  const [pdfURL, setpdfURL] = useState(null);

  useEffect(() => {
    PolicyRequest.PolicyList(pageNumber, perPage, searchKey);
  }, [pageNumber, perPage, searchKey]);

  const { PolicyLists, TotalPolicy } = useSelector((state) => state.Policy);
  
  const { UserDetails } = useSelector(
    (state) => state.User,
  );

  

  let perMissArr = 0;
  const navigate = useNavigate();
  
  
   if (UserDetails.per.length > 0) {
    let perDataM= UserDetails.per;
      for (let index in perDataM) {
         if(perDataM[index].modulesname=='files'){
            perMissArr =1
         }
      }
   }
   if(perMissArr == 0){
      navigate("/dashborad");
   }

   const downloadPDF =(pdf,id)=> {
    const pdfLink = pdf;
    const anchorElement = document.createElement('a');
    const fileName = 'policy-file'+id+'.pdf';
    anchorElement.href = pdfLink;
    anchorElement.download = fileName;
    anchorElement.click();
    //navigate("/policies/policy-list");
    
  }

  const createPolicypdf = async (filename,id) => {
    
       if(filename != null && filename.length> 0){
        downloadPDF(filename,id);
       }else{
        alert(id)
       const API_URL =process.env.REACT_APP_API_URL+"/api/user/";;
       const catUrl = `${API_URL}downloadpolicy`;
       const response = await Axios.post(catUrl,{"data":{"id":id}});
       console.log(response)
       downloadPDF(response.data.data.url,id);
     }
      
      
  }


  



  const PerPageOnChange = (e) => {
    if (e.target.value === "All") {
      setPerPage(TotalPolicy);
    } else {
      setPerPage(e.target.value);
    }
  };

  const SearchKeywordOnChange = (e) => {
    const key = e.target.value || 0;
    setSearchKey(key);
  };

  const HandlePageClick = (e) => {
    setPageNumber(e.selected + 1);
  };




  const GoToPage = (e) => {
    setPageNumber(e.target.value);
  };

  const DeletePolicy = (id) => {
    AleartMessage.Delete(id, PolicyRequest.PolicyDelete).then((result) => {
      if (result) {
        PolicyRequest.PolicyList(pageNumber, perPage, searchKey);
      }
    });
  };

  return (
    <>
      <div className="main-panel" style={{width:"80%",marginTop: "46px"}}>
        <div className="content-wrapper">
          <div className="page-header">
            <h3 className="page-title">
              <span className="page-title-icon bg-gradient-primary text-white me-2">
                <i className="mdi mdi-account-plus" />
              </span> Policy Listing
            </h3>
            <nav aria-label="breadcrumb">
              <ul className="breadcrumb">
                <li className="breadcrumb-item active" aria-current="page">
                  <span />
                  <PageTitle
                    breadCrumbItems={[
                      { label: "Policy", path: "/policies/policy-list" },
                      {
                        label: "Policy List",
                        path: "/policies/policy-list",
                        active: true,
                      },
                    ]} /> 
                </li>
              </ul>
            </nav>
          </div>
      <Row>
        <Col xs={12}>
          <Card>
            <Card.Body>
              <Row className="mb-2">
                <Col sm={5}>
                  <Link
                    to="/policies/policy-create-update-new"
                    className="btn btn-danger mb-2"
                  >
                    <i className="mdi mdi-plus-circle me-2"></i> Add Policy
                  </Link>
                </Col>

                <Col sm={7}>
                  <div className="text-sm-end">
                    

                    

                    
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div className="mb-2">
                    <span className="d-flex align-items-center">
                      Search :{" "}
                      <input
                        placeholder={TotalPolicy + " records..."}
                        className="form-control w-auto ms-1"
                        defaultValue=""
                        onChange={SearchKeywordOnChange}
                      />
                    </span>
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Table className="table-centered react-table" responsive>
                    <thead
                      className="table-light"
                      style={{ backgroundColor: "#eef2f7" }}
                    >
                      <tr>
                        <th>Policy Name</th>
                        <th>Framework Name</th>
                        <th>Department</th>
                        <th>Reccurence</th>
                        <th>Primary assignee</th>
                        <th>Description</th>
                        <th>file</th>
                        <th>Approvers</th>
                        <th>Created On</th>
                        <th>Version</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {PolicyLists?.map((record, index) => {
                        return (
                          <tr key={index}>
                            <td>{record?.policyname}</td>
                            <td>{record?.frameworkname}</td>
                            <td>{record?.Departmentname}</td>
                            <td>{record?.reccurencename}</td>
                            <td>{record?.primaryassignefname}</td>
                            <td>
                              {(record?.description &&
                                HtmlParser(
                                  record?.description.length > 500 ?record?.description.substring(0, 1000) :record?.description,
                                )) || "NA"}
                            </td>

                            <td>
                            {record?.filename ?
                              <Link
                                className="action-icon text-primary"
                                onClick={() => createPolicypdf(record.filename,record.id)}
                              >Download</Link>:
                               <>
                               {record?.pdflink?
                            <Link to={record?.pdflink} 
                                className="action-icon text-primary"
                               
                              > Download</Link>
                              :
                              <Link
                                className="action-icon text-primary"
                                onClick={() => createPolicypdf(record.filename,record.id)}
                              >Download</Link>
                               }
                              </>
                            }
                            
                           
                            </td>
                            <td>
                            <Link
                                to={`/policies/policy-approver-list?id=${record?.id}`}
                                className="action-icon text-primary"
                              >
                                Approver 
                              </Link>
                            </td>
                            <td>{DateFormatter(record?.createddate)}</td>
                            <td>
                            <Link
                                to={`/policies/policy-version-list?id=${record?.id}`}
                                className="action-icon text-warning"
                              >
                                {record?.file_version}
                              </Link>

                              
                              
                            </td>
                            <td>
                              <span
                                className={classNames("badge", {
                                  "bg-success": record?.status,
                                  "bg-danger": !record?.status,
                                })}
                              >
                                {record?.status ? "Enabled" : "Disbaled"}
                              </span>
                            </td>
                            <td>
                              <Link
                                to={`/policies/policy-create-update-tab?id=${record?.id}`}
                                className="action-icon text-warning"
                              >
                                <i className="mdi mdi-square-edit-outline"></i>
                              </Link>
                             
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </Table>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div className="d-lg-flex align-items-center text-center pb-1">
                    <div className="d-inline-block me-3">
                      <label className="me-1">Display :</label>
                      <select
                        className="form-select d-inline-block w-auto"
                        onChange={PerPageOnChange}
                      >
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                        <option value="All">All</option>
                      </select>
                    </div>
                    <span className="me-3">
                      Page
                      <strong>
                        {pageNumber} of {Math.ceil(TotalPolicy / perPage)}
                      </strong>
                    </span>
                    <span className="d-inline-block align-items-center text-sm-start text-center my-sm-0 my-2">
                      <label>Go to page : </label>
                      <input
                        type="number"
                        min={1}
                        className="form-control w-25 ms-1 d-inline-block"
                        defaultValue={1}
                        onChange={GoToPage}
                      />
                    </span>
                    <ReactPaginate
                      previousLabel="<"
                      nextLabel=">"
                      pageClassName="page-item d-none d-xl-inline-block"
                      pageLinkClassName="page-link"
                      previousClassName="page-item"
                      previousLinkClassName="page-link"
                      nextClassName="page-item"
                      nextLinkClassName="page-link"
                      breakLabel="..."
                      breakClassName="page-item"
                      breakLinkClassName="page-link"
                      pageCount={TotalPolicy / perPage}
                      marginPagesDisplayed={2}
                      pageRangeDisplayed={5}
                      containerClassName="pagination pagination-rounded d-inline-flex ms-auto align-item-center mb-0"
                      activeClassName="active"
                      onPageChange={HandlePageClick}
                      initialPage={pageNumber - 1}
                      forcePage={pageNumber - 1}
                    />
                  </div>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      </div>
      </div>
    </>
  );
};

export default PolicyListPage;
