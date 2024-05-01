import React from "react";
//External Lib Import
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

//Internal Lib Import
import PageTitle from "../../components/Ui/PageTitle";
import { FormInput } from "../../components/Ui";
import { VerticalForm } from "../../components/Ui";
import UserRequest from "../../APIRequest/UserRequest";
import { defaultAvatarImg } from "../../helpers/Default";
import ModuleRequest from "../../APIRequest/ModuleRequest";

function TrainingMgmt() {
  let [ObjectID, SetObjectID] = useState(0);
  const { t } = useTranslation();
  const { UserData } = useSelector((state) => state.User);
  const { UserDetails } = useSelector((state) => state.User);
  // const { DepartmentDropDown } = useSelector((state) => state.Department);
  const { RoleDropDown } = useSelector((state) => state.Module);
  const [uploadFile, setShowUploadFile] = useState(false);

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
    if (e.target.value == "U") {
      setShowUploadFile(false);
    } else {
      setShowUploadFile(true);
    }
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
              Add Training
            </h3>
            <nav aria-label="breadcrumb">
              <ul className="breadcrumb">
                <li className="breadcrumb-item active" aria-current="page">
                  <span />
                  <PageTitle
                    breadCrumbItems={[
                      {
                        label: "Training Mgmt",
                        path: "/training/trainingmgmt",
                      },
                      {
                        label: !ObjectID
                          ? "Create Training"
                          : "Update Training",
                        path: "/training/trainingmgmt",
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
                            <FormInput
                              name="tname"
                              label={t("Training Name")}
                              placeholder={t("Enter Training Name")}
                              containerClass={"mb-3"}
                            />
                          </Col>
                          <Col xl={6}>
                            <FormInput
                              name="descname"
                              label={t("Description")}
                              placeholder={t("Enter Description")}
                              containerClass={"mb-3"}
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col xl={12}>
                            <div
                              className="row"
                              style={{ marginBottom: "15px" }}
                            >
                              <div className="col col-lg-2">
                                <input
                                  type="radio"
                                  value="U"
                                  name="file"
                                  defaultChecked
                                  onChange={handleChangeValue}
                                />{" "}
                                URL
                              </div>
                              <div className="col col-lg-2">
                                <input
                                  type="radio"
                                  value="F"
                                  name="file"
                                  onChange={handleChangeValue}
                                />{" "}
                                File
                              </div>
                            </div>
                          </Col>
                        </Row>
                        {uploadFile ? (
                          <FormInput
                            name="filename"
                            label={t("Upload File")}
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
                        <Row>
                          <Col xl={6}>
                            <FormInput
                              name="Quiz Name"
                              label={t("Quiz Name  ")}
                              placeholder="Please select Quiz Name"
                              containerClass={"mb-3"}
                              type="react-single-select"
                              options={[
                                { value: "Quiz One", label: "Quiz Three" },
                                { value: "Quiz Two", label: "Quiz Two" },
                                { value: "Quiz Three", label: "Quiz Three" },
                                { value: "Quiz Four", label: "Quiz Four" },
                              ]}
                            />
                          </Col>
                          <Col xl={6}>
                            <FormInput
                              name="FeedBackSurveyId"
                              label={t("Feedback Survey Name")}
                              placeholder={t("Select Feedback Survey Id")}
                              containerClass={"mb-3"}
                              type="react-single-select"
                              options={[
                                { value: "Survey One", label: "Survey One" },
                                { value: "Suvey Two", label: "Survey Two" },
                                {
                                  value: "Survey Three",
                                  label: "Survey Three",
                                },
                                { value: "Survey Four", label: "Survey Four" },
                              ]}
                            />
                          </Col>
                        </Row>
                        <Row className="mt-2">
                          <Col>
                            <Button
                              type="submit"
                              className="btn btn-gradient-primary me-2"
                              variant="success"
                            >
                              {!ObjectID ? "Add Training" : "Update Training"}
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

export default TrainingMgmt;
