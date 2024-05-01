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
import AuditAndSOARequest from "../../APIRequest/AudiAndSOARequest";
import AleartMessage from "../../helpers/AleartMessage";
import ExportDataJSON from "../../utils/ExportFromJSON";
import DateFormatter from "../../utils/DateFormatter";
import { useNavigate } from "react-router-dom";

function SOAList() {
  const [currentItems, setCurrentItems] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const [soaListing, setSOAListing] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [perPage, setPerPage] = useState(5);
  const [searchKey, setSearchKey] = useState(0);
  const permissionType = ["dashboard", "files", "roles", "user", "permission"];

  const { SOAList, SOAListLength } = useSelector((state) => state.AuditAndSOA);
  let perMissArr = 0;
  const navigate = useNavigate();

  useEffect(() => {
    AuditAndSOARequest.SOALists().then((res) => {
      console.log("SOA LIST Request -----> ", res);
      setSOAListing(res);
    });
    console.log(
      "SOALiST Length -----> ",
      SOAListLength,
      Math.ceil(soaListing / perPage)
    );
  }, []);

  React.useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(SOAList?.slice(itemOffset, endOffset));
    setPageCount(Math.ceil(SOAList?.length / itemsPerPage));
  }, [itemOffset, itemsPerPage, SOAList]);

  // Invoke when user click to request another page.
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % SOAList.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    console.log("Page Count --->", event.selected);
    setItemOffset(newOffset);
    setPageNumber(event.selected + 1);
  };
  // useEffect(() => {
  //   AuditAndSOARequest.SOALists(pageNumber, perPage, searchKey);
  //   // QuizRequest.QuizLists(pageNumber, perPage, searchKey);
  // }, [pageNumber, perPage, searchKey]);

  const PerPageOnChange = (e) => {
    if (e.target.value === "All") {
      setItemsPerPage(SOAList.length);
    } else {
      setItemsPerPage(e.target.value);
    }
  };

  const SearchKeywordOnChange = (e) => {
    const key = e.target.value || 0;
    setSearchKey(key);
  };

  const HandlePageClick = (e) => {
    setPageNumber(e.selected + 1);
  };

  const GoToPage = (event) => {};
  return (
    <>
      <div
        className="main-panel"
        style={{ width: "80%", marginTop: "46px", minHeight: "681px;" }}
      >
        <div className="content-wrapper">
          <div className="page-header">
            <h3 className="page-title">
              <span className="page-title-icon bg-gradient-primary text-white me-2">
                <i className="mdi mdi-account-plus" />
              </span>{" "}
              SOA Listing
            </h3>
            <nav aria-label="breadcrumb">
              <ul className="breadcrumb">
                <li className="breadcrumb-item active" aria-current="page">
                  <span />
                  <PageTitle
                    breadCrumbItems={[
                      {
                        label: "SOA",
                        path: "/SOA",
                      },
                      {
                        label: "SOA",
                        path: "/SOA",
                        active: true,
                      },
                    ]}
                  />
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
                      <Link to="/SOA" className="btn btn-danger mb-2">
                        <i className="mdi mdi-plus-circle me-2"></i> Add SOA
                      </Link>
                    </Col>
                  </Row>
                  {/* <Row>
                    <Col>
                      <div className="mb-2">
                        <span className="d-flex align-items-center">
                          Search :{" "}
                          <input
                            // placeholder={TotalUser + " records..."}
                            className="form-control w-auto ms-1"
                            defaultValue=""
                            onChange={SearchKeywordOnChange}
                          />
                        </span>
                      </div>
                    </Col>
                  </Row> */}
                  <Row>
                    <Col>
                      <Table className="table-centered react-table" responsive>
                        <thead
                          className="table-light"
                          style={{ backgroundColor: "#eef2f7" }}
                        >
                          <tr>
                            <th>Id</th>
                            <th>SOA Version</th>
                            <th>Standard</th>
                            <th>Date Of SOA</th>
                            <th>SOA Scope Period Start Date</th>
                            <th>SOA Scope Period End Date</th>
                            <th>Action</th>
                            <th>Annex List</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentItems &&
                            currentItems?.map((record, index) => {
                              return (
                                <tr key={index}>
                                  <td>
                                    <div className="d-flex px-2 py-1">
                                      <div className="d-flex flex-column justify-content-center">
                                        <h6 className="mb-0 text-sm">
                                          {record?.soaid !== undefined
                                            ? record.soaid
                                            : ""}
                                        </h6>
                                      </div>
                                    </div>
                                  </td>
                                  <td>
                                    {record?.soaversion !== undefined
                                      ? record.soaversion
                                      : ""}
                                  </td>
                                  <td>
                                    {record?.standardid !== undefined
                                      ? record.standardid
                                      : ""}
                                  </td>
                                  <td>
                                    {record?.soadate !== undefined
                                      ? record.soadate
                                      : ""}
                                  </td>
                                  <td>
                                    {record?.Soascopeperiodstartdate !==
                                    undefined
                                      ? record.Soascopeperiodstartdate
                                      : ""}
                                  </td>
                                  <td>
                                    {record?.soascopeperiodenddate !== undefined
                                      ? record.soascopeperiodenddate
                                      : ""}
                                  </td>
                                  <td>
                                    <Link
                                      to={`/SOA?id=${record?.soaid}`}
                                      className="action-icon text-warning"
                                    >
                                      <i className="mdi mdi-square-edit-outline"></i>
                                    </Link>
                                    <Link
                                      className="action-icon text-danger"
                                      //onClick={() => DeleteUser(record?.id)}
                                    >
                                      <i className="mdi mdi-delete"></i>
                                    </Link>
                                  </td>
                                  <td>
                                    <Link
                                      to={`/SOAAnnexDetailsListing?id=${record?.soaid}`}
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
                  <Row className="mt-3">
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
                            {pageNumber} of {pageCount}
                          </strong>
                        </span>
                        {/* <span className="d-inline-block align-items-center text-sm-start text-center my-sm-0 my-2">
                          <label>Go to page : </label>
                          <input
                            type="number"
                            min={1}
                            className="form-control w-25 ms-1 d-inline-block"
                            defaultValue={1}
                            onChange={GoToPage}
                          />
                        </span> */}
                        {/* <ReactPaginate
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
                          pageCount={Math.ceil(soaListing / perPage)}
                          marginPagesDisplayed={2}
                          pageRangeDisplayed={5}
                          containerClassName="pagination pagination-rounded d-inline-flex ms-auto align-item-center mb-0"
                          activeClassName="active"
                          onPageChange={HandlePageClick}
                          initialPage={pageNumber - 1}
                          forcePage={pageNumber - 1}
                        /> */}
                        <ReactPaginate
                          breakLabel="..."
                          previousLabel="<"
                          nextLabel=">"
                          onPageChange={handlePageClick}
                          pageRangeDisplayed={5}
                          pageCount={pageCount}
                          renderOnZeroPageCount={null}
                          containerClassName="pagination pagination-rounded d-inline-flex ms-auto align-item-center mb-0"
                          pageLinkClassName="page-link"
                          previousLinkClassName="page-link"
                          nextLinkClassName="page-link"
                          activeLinkClassName="active"
                          breakLinkClassName="page-link"
                          breakClassName="page-item"
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
}

export default SOAList;
