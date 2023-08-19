// External Lib Import
import React, { useEffect, useState } from "react";
import { Row, Col, Card, Table, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import ReactPaginate from "react-paginate";
import { GrDocumentCsv } from "react-icons/gr";
import { SiMicrosoftexcel } from "react-icons/si";

// Internal  Lib Import
import PageTitle from "../../components/Ui/PageTitle";
import { useSelector } from "react-redux";
import UserRequest from "../../APIRequest/UserRequest";
import AleartMessage from "../../helpers/AleartMessage";
import ExportDataJSON from "../../utils/ExportFromJSON";
import DateFormatter from "../../utils/DateFormatter";
import { useNavigate } from "react-router-dom";


const UserListPage = () => {
  const [pageNumber, setPageNumber] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [searchKey, setSearchKey] = useState(0);
  const permissionType = ['dashboard','files','roles','user','permission'];

  const { UserDetails,UserList, TotalUser } = useSelector(
    (state) => state.User,
  );
  let perMissArr = 0;
  const navigate = useNavigate();
  
  
   if (UserDetails.per.length > 0) {
    let perDataM= UserDetails.per;
      for (let index in perDataM) {
         if(perDataM[index].modulesname=='user'){
            perMissArr =1
         }
      }
   }
   if(perMissArr == 0){
      navigate("/dashborad");
   }

  useEffect(() => {

    UserRequest.UserList(pageNumber, perPage, searchKey);
  }, [pageNumber, perPage, searchKey]);
   

  
  if(UserDetails)
  console.log(UserDetails);
  const PerPageOnChange = (e) => {
    if (e.target.value === "All") {
      setPerPage(TotalUser);
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

  const DeleteUser = (id) => {
    AleartMessage.Delete(id, UserRequest.UserDelete).then((result) => {
      if (result) {
        UserRequest.UserList(pageNumber, perPage, searchKey);
      }
    });
  };

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: "Employee", path: "/employee/employee-list" },
          {
            label: "Create List",
            path: "/employee/employee-list",
            active: true,
          },
        ]}
        title={"Employee List " + TotalUser}
      />
      <div className="main-panel" style={{width:"80%",marginTop: "46px",minHeight:"681px;"}}>
        <div className="content-wrapper">
          <div className="page-header">
            <h3 className="page-title">
              <span className="page-title-icon bg-gradient-primary text-white me-2">
                <i className="mdi mdi-account-plus" />
              </span> Users Listing
            </h3>
            <nav aria-label="breadcrumb">
              <ul className="breadcrumb">
                <li className="breadcrumb-item active" aria-current="page">
                  <span />
                  <PageTitle
                    breadCrumbItems={[
                      { label: "Users", path: "/users/users-list" },
                      {
                        label: "Create List",
                        path: "/users/users-list",
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
                    to="/users/users-create-update"
                    className="btn btn-danger mb-2"
                  >
                    <i className="mdi mdi-plus-circle me-2"></i> Add User
                  </Link>
                </Col>

                <Col sm={7}>
                  <div className="text-sm-end">
                    {/*<Button variant="success" className="mb-2 me-1">
                      <i className="mdi mdi-cog-outline"></i>
                    </Button>*/}

                    {/*<Button
                      variant="light"
                      className="mb-2 me-1"
                      onClick={() =>
                        ExportDataJSON(UserList, "Employee", "xls")
                      }
                    >
                      <SiMicrosoftexcel /> Export
                    </Button>*/}

                    {/*<Button
                      variant="light"
                      className="mb-2"
                      onClick={() =>
                        ExportDataJSON(UserList, "Employee", "csv")
                      }
                    >
                      <GrDocumentCsv /> Export
                    </Button>*/}
                  </div>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div className="mb-2">
                    <span className="d-flex align-items-center">
                      Search :{" "}
                      <input
                        placeholder={TotalUser + " records..."}
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
                        <th>Name</th>
                        <th>Email</th>
                        <th>Mobile No</th>
                        <th>Roles</th>
                        <th>Status</th>
                        <th>Created On</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {UserList?.map((record, index) => {
                        return (
                          <tr key={index}>
                            <td>
                              <div className="d-flex px-2 py-1">
                                
                                <div className="d-flex flex-column justify-content-center">
                                  <h6 className="mb-0 text-sm">
                                    {record?.fname + " " + record?.lname}
                                  </h6>
                                 
                                </div>
                              </div>
                            </td>
                            <td>{record?.email}</td>
                            <td>{record?.mobileNo}</td>
                            <td>{record?.usertypename}</td>
                            <td>{record?.status==1?"Enabled":"Disbaled"}</td>
                            <td>{DateFormatter(record?.createddate)}</td>
                            <td>
                              <Link
                                to={`/users/users-create-update?id=${record?.id}`}
                                className="action-icon text-warning"
                              >
                                <i className="mdi mdi-square-edit-outline"></i>
                              </Link>
                              <Link
                                className="action-icon text-danger"
                                 onClick={() => DeleteUser(record?.id)}
                              >
                                <i className="mdi mdi-delete"></i>
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
                        {pageNumber} of {Math.ceil(TotalUser / perPage)}
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
                      pageCount={TotalUser / perPage}
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

export default UserListPage;
