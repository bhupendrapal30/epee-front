import React from "react";
//External Lib Import
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import InputLabel from "@mui/material/InputLabel";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
//Internal Lib Import
import PageTitle from "../../components/Ui/PageTitle";
import { FormInput } from "../../components/Ui";
import { VerticalForm } from "../../components/Ui";
import UserRequest from "../../APIRequest/UserRequest";
import { defaultAvatarImg } from "../../helpers/Default";
import ModuleRequest from "../../APIRequest/ModuleRequest";

function Audit() {
  let [ObjectID, SetObjectID] = useState(0);
  const { t } = useTranslation();
  const { UserData } = useSelector((state) => state.User);
  const { UserDetails } = useSelector((state) => state.User);
  // const { DepartmentDropDown } = useSelector((state) => state.Department);
  const { RoleDropDown } = useSelector((state) => state.Module);
  const [uploadFile, setShowUploadFile] = useState(true);

  // let [PreviewImg, SetPreviewImg] = useState(defaultAvatarImg);

  const navigate = useNavigate();

  useEffect(() => {
    // DepartmentRequest.DepartmentDropDown();
    ModuleRequest.RoleDropDown();
    let params = new URLSearchParams(window.location.search);
    let id = params.get("id");

    if (id !== null) {
      UserRequest.UserData(id).then((result) => {});

      SetObjectID(id);
    }
  }, []);

  /*
   * form validation schema
   */
  const validationSchema = yup.object().shape({
    fname: yup.string().required("Please Enter First Name"),
    lname: yup.string().required("Please Enter Last Name"),
    mobileNo: yup.string().required("Please Enter Mobile No"),
    email: yup.string().required("Please Enter Email Id"),
    password: yup.string().required("Please Enter Password"),
    usertype: yup.string().required("Please Select Roles"),
    status: yup.string().required("Please Select Status"),
  });

  const handleChangeValue = (e) => {
    console.log("E Target Value ---> ", e.target.value);
    setShowUploadFile(true);
    // if (e.target.value == "U") {
    //   setShowUploadFile(true);
    // } else {
    //   setShowUploadFile(false);
    // }
  };

  /*
   * form methods
   */

  /**
   * Handle the form submission
   */
  const CreateUpdateUser = (values) => {
    console.log(UserRequest);

    // if (!values.EmployeeAvatar) values.EmployeeAvatar = defaultAvatarImg;
    if (!ObjectID) {
      UserRequest.UserCreate({
        fname: values.fname,
        lname: values.lname,
        mobileNo: values.mobileNo,
        email: values.email,
        password: values.password,
        usertype: values.usertype,
        status: values.status,
        createdby: UserDetails.id,
      }).then((result) => {
        if (result) {
          navigate("/users/users-list");
        }
      });
    } else {
      UserRequest.UserUpdate(ObjectID, {
        fname: values.fname,
        lname: values.lname,
        mobileNo: values.mobileNo,
        email: values.email,
        password: values.password,
        usertype: values.usertype,
        status: values.status,
        createdby: UserDetails.id,
      }).then((result) => {
        if (result) {
          navigate("/users/users-list");
        }
      });
    }
  };
  return (
    <>
      {" "}
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
              {!ObjectID ? "Add Audit" : "Update Audit"}
            </h3>
            <nav aria-label="breadcrumb">
              <ul className="breadcrumb">
                <li className="breadcrumb-item active" aria-current="page">
                  <span />
                  <PageTitle
                    breadCrumbItems={[
                      {
                        label: "audit mgmt",
                        path: "/Audit",
                      },
                      {
                        label: !ObjectID ? "Create Audit" : "Update Audit",
                        path: "/Audit",
                        active: true,
                      },
                    ]}
                  />
                </li>
              </ul>
            </nav>
          </div>
          <Row>
            <Col>
              <Card>
                <Card.Body>
                  <Row>
                    <Col>
                      <VerticalForm
                        onSubmit={CreateUpdateUser}
                        validationSchema={validationSchema}
                        defaultValues={UserData}
                      >
                        <Row>
                          <Col xl={12}>
                            <InputLabel id="demo-simple-select-label">
                              Audit Name
                            </InputLabel>
                            <TextField
                              style={{ width: "100%" }}
                              id="outlined-basic"
                              variant="outlined"
                              name="auditname"
                              placeholder="Enter Audit Name"
                              // value={answerOne}
                              // onChange={handleAnswerOneValue}
                            />
                          </Col>
                        </Row>
                        <Row className="mt-3">
                          <Col xl={12}>
                            {/* <InputLabel id="demo-simple-select-label">
                              Standard
                            </InputLabel>
                            <TextField
                              style={{ width: "100%" }}
                              id="outlined-basic"
                              variant="outlined"
                              name="auditname"
                              placeholder="Enter Audit Name"
                              // value={answerOne}
                              // onChange={handleAnswerOneValue}
                            /> */}
                            <InputLabel id="demo-simple-select-label">
                              Standard
                            </InputLabel>
                            <Select
                              style={{ width: "100%" }}
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              // value={totalNoOfQuestion}
                              // onChange={handleTotalNoOfQuestion}
                            >
                              <MenuItem disabled value="">
                                <em>Please select Standard</em>
                              </MenuItem>
                              <MenuItem value="1">1</MenuItem>
                              <MenuItem value="2">2</MenuItem>
                              <MenuItem value="3">3</MenuItem>
                              <MenuItem value="4">4</MenuItem>
                              <MenuItem value="5">5</MenuItem>
                            </Select>
                          </Col>
                        </Row>
                        <Row className="mt-3">
                          <Col xl={12}>
                            {/* <InputLabel id="demo-simple-select-label">
                              Standard
                            </InputLabel>
                            <TextField
                              style={{ width: "100%" }}
                              id="outlined-basic"
                              variant="outlined"
                              name="auditname"
                              placeholder="Enter Audit Name"
                              // value={answerOne}
                              // onChange={handleAnswerOneValue}
                            /> */}
                            <InputLabel id="demo-simple-select-label">
                              SOA Applicable
                            </InputLabel>
                            <Select
                              style={{ width: "100%" }}
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              // value={totalNoOfQuestion}
                              // onChange={handleTotalNoOfQuestion}
                            >
                              <MenuItem disabled value="">
                                <em>Please select</em>
                              </MenuItem>
                              <MenuItem value="YES">YES</MenuItem>
                              <MenuItem value="NO">NO</MenuItem>
                            </Select>
                          </Col>
                        </Row>
                        <Row className="mt-3">
                          <Col xl={6}>
                            <InputLabel id="demo-simple-select-label">
                              Audit Start Date
                            </InputLabel>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DemoContainer components={["DateTimePicker"]}>
                                <DateTimePicker />
                              </DemoContainer>
                            </LocalizationProvider>
                          </Col>
                          <Col xl={6}>
                            <InputLabel id="demo-simple-select-label">
                              Audit End Date
                            </InputLabel>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DemoContainer components={["DateTimePicker"]}>
                                <DateTimePicker />
                              </DemoContainer>
                            </LocalizationProvider>
                          </Col>
                        </Row>
                        <Row className="mt-3">
                          <Col xl={12}>
                            <InputLabel id="demo-simple-select-label">
                              Audit Stage
                            </InputLabel>
                            <Select
                              style={{ width: "100%" }}
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              // value={totalNoOfQuestion}
                              // onChange={handleTotalNoOfQuestion}
                            >
                              <MenuItem disabled value="">
                                <em>Please select audit stage</em>
                              </MenuItem>
                              <MenuItem value="New">New</MenuItem>
                              <MenuItem value="Draft">Draft</MenuItem>
                              <MenuItem value="Pending">Pending</MenuItem>
                              <MenuItem value="Completed">Completed</MenuItem>
                              <MenuItem value="Overdue">Overdue</MenuItem>
                            </Select>
                          </Col>
                        </Row>
                        <Row className="mt-3">
                          <Col xl={6}>
                            <InputLabel id="demo-simple-select-label">
                              Scope Period Start Date
                            </InputLabel>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DemoContainer components={["DateTimePicker"]}>
                                <DateTimePicker />
                              </DemoContainer>
                            </LocalizationProvider>
                          </Col>
                          <Col xl={6}>
                            <InputLabel id="demo-simple-select-label">
                              Scope Period End Date
                            </InputLabel>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DemoContainer components={["DateTimePicker"]}>
                                <DateTimePicker />
                              </DemoContainer>
                            </LocalizationProvider>
                          </Col>
                        </Row>
                        <Row className="mt-3">
                          <Col xl={6}>
                            <InputLabel id="demo-simple-select-label">
                              Audit Completion Date
                            </InputLabel>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DemoContainer components={["DateTimePicker"]}>
                                <DateTimePicker />
                              </DemoContainer>
                            </LocalizationProvider>
                          </Col>
                          <Col xl={6}>
                            <InputLabel id="demo-simple-select-label">
                              Auditor Email
                            </InputLabel>
                            <TextField
                              id="outlined-basic"
                              variant="outlined"
                              name="auditoremail"
                              placeholder="Enter Auditor Email"
                              // value={answerOne}
                              // onChange={handleAnswerOneValue}
                            />
                          </Col>
                        </Row>
                        <Row className="mt-3">
                          <Col>
                            <Button
                              type="submit"
                              className="btn btn-gradient-primary me-2"
                              variant="success"
                            >
                              {!ObjectID ? "Add Audit" : "Update Audit"}
                            </Button>
                          </Col>
                        </Row>
                      </VerticalForm>
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

export default Audit;
