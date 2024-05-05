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

function VendorDetails() {
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
              Add Vendor Details
            </h3>
            <nav aria-label="breadcrumb">
              <ul className="breadcrumb">
                <li className="breadcrumb-item active" aria-current="page">
                  <span />
                  <PageTitle
                    breadCrumbItems={[
                      {
                        label: "vendor mgmt",
                        path: "/vendorDetails",
                      },
                      {
                        label: !ObjectID
                          ? "Create Vendor Details"
                          : "Update Vendor Details",
                        path: "/vendorDetails",
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
                          <Col xl={6}>
                            <InputLabel id="demo-simple-select-label">
                              Vendor Name
                            </InputLabel>
                            <TextField
                              style={{ width: "100%" }}
                              name="qname"
                              placeholder={"Enter Vendor Name"}
                              containerClass={"mb-3"}
                            />
                          </Col>
                          <Col xl={6}>
                            <InputLabel id="demo-simple-select-label">
                              Primary Contact Name
                            </InputLabel>
                            <TextField
                              style={{ width: "100%" }}
                              name="qname"
                              placeholder={"Enter Primary Contact Name"}
                              containerClass={"mb-3"}
                            />
                          </Col>
                        </Row>
                        <Row className="mt-3">
                          <Col xl={6}>
                            <InputLabel id="demo-simple-select-label">
                              Onboarding Date
                            </InputLabel>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DemoContainer components={["DateTimePicker"]}>
                                <DateTimePicker />
                              </DemoContainer>
                            </LocalizationProvider>
                          </Col>
                          <Col xl={6}>
                            <InputLabel id="demo-simple-select-label">
                              Expiry Date
                            </InputLabel>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DemoContainer components={["DateTimePicker"]}>
                                <DateTimePicker />
                              </DemoContainer>
                            </LocalizationProvider>
                          </Col>
                        </Row>
                        <Row className="mt-3">
                          {uploadFile ? (
                            <FormInput
                              name="filename"
                              label={t("Contract")}
                              type="file"
                              placeholder={t("Upload File")}
                              containerClass={"mb-3"}
                            />
                          ) : (
                            <FormInput
                              name="Training URL"
                              label={t("Training URL")}
                              placeholder={t("Enter Training Url ")}
                              containerClass={"mb-3"}
                            />
                          )}
                        </Row>
                        <Row>
                          <Col xl={6}>
                            <InputLabel id="demo-simple-select-label">
                              Relationship Manager Email
                            </InputLabel>
                            <TextField
                              style={{ width: "100%" }}
                              name="qname"
                              placeholder={"Enter Relationship Manager Email"}
                              containerClass={"mb-3"}
                            />
                          </Col>
                          <Col xl={6}>
                            <InputLabel id="demo-simple-select-label">
                              Assessor Email
                            </InputLabel>
                            <TextField
                              style={{ width: "100%" }}
                              name="qname"
                              placeholder={"Enter Assessor Email"}
                              containerClass={"mb-3"}
                            />
                          </Col>
                        </Row>

                        <Row className="mt-3">
                          <Col xl={6}>
                            <InputLabel id="demo-simple-select-label">
                              Type Of Vendor
                            </InputLabel>
                            <Select
                              style={{ width: "100%" }}
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              // value={totalNoOfQuestion}
                              // onChange={handleTotalNoOfQuestion}
                            >
                              <MenuItem disabled value="">
                                <em>Please select Type Vendor</em>
                              </MenuItem>
                              <MenuItem value="Security">security</MenuItem>
                              <MenuItem value="Product">product</MenuItem>
                              <MenuItem value="Service">service</MenuItem>
                              <MenuItem value="Other">other</MenuItem>
                            </Select>
                          </Col>
                          <Col xl={6}>
                            <InputLabel id="demo-simple-select-label">
                              Status
                            </InputLabel>
                            <Select
                              style={{ width: "100%" }}
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              // value={totalNoOfQuestion}
                              // onChange={handleTotalNoOfQuestion}
                            >
                              <MenuItem disabled value="">
                                <em>Please select Status</em>
                              </MenuItem>
                              <MenuItem value="True">True</MenuItem>
                              <MenuItem value="False">False</MenuItem>
                            </Select>
                          </Col>
                        </Row>
                        {/* <Row className="mt-3">

                              Risk Asses Me
                            </InputLabel>
                            <TextField
                              style={{ width: "100%" }}
                              name="qname"
                              placeholder={"Enter riskassesme"}
                              containerClass={"mb-3"}
                            />
                          </Col>
                        </Row>
                        <Row className="mt-3">

                          <Col xl={6}>
                            <InputLabel id="demo-simple-select-label">
                              Status
                            </InputLabel>
                            <Select
                              style={{ width: "100%" }}
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              // value={totalNoOfQuestion}
                              // onChange={handleTotalNoOfQuestion}
                            >
                              <MenuItem disabled value="">
                                <em>Please select Status</em>
                              </MenuItem>
                              <MenuItem value="True">True</MenuItem>
                              <MenuItem value="False">False</MenuItem>
                            </Select>
                          </Col>
                        </Row> */}
                        {/* </Row> */}
                        <Row className="mt-3">
                          <Col>
                            <Button
                              type="submit"
                              className="btn btn-gradient-primary me-2"
                              variant="success"
                            >
                              {!ObjectID ? "Add Vendor" : "Update Vendor"}
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

export default VendorDetails;
