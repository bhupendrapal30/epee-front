import React from "react";
//External Lib Import
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Row, Col, Card, Button } from "react-bootstrap";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import { Input, Modal } from "antd";

//Internal Lib Import
import PageTitle from "../../components/Ui/PageTitle";
import { FormInput } from "../../components/Ui";
import { VerticalForm } from "../../components/Ui";
import QuizRequest from "../../APIRequest/QuizRequest";
import { defaultAvatarImg } from "../../helpers/Default";
import ModuleRequest from "../../APIRequest/ModuleRequest";

//Slice
import {
  SetQuizLists,
  EditQuiz,
  DeleteQuizLists,
} from "../../redux/slices/Quiz";

function ClauseWiseAuditDetailUpdate() {
  const navigate = useNavigate();
  let dispatch = useDispatch();
  let [ObjectID, SetObjectID] = useState(0);
  const [quizName, setQuizName] = useState("");
  const [description, setDescription] = useState("");
  const [totalNoOfQuestion, setTotalNoOfQuestion] = useState("");
  const [totalNoOfRetake, setTotalNoOfRetake] = useState("");
  const [retakeAllowed, setRetakeAllowed] = useState("");
  const [passingMarks, setPassingMarks] = useState("");

  const { QuizList } = useSelector((state) => state.Quiz);

  //For Edit Modal
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  useEffect(() => {
    // DepartmentRequest.DepartmentDropDown();
    // ModuleRequest.RoleDropDown();
    let params = new URLSearchParams(window.location.search);
    let id = params.get("id");

    if (id !== null) {
      // QuizRequest.QuizData(id).then((result) => {
      //   console.log("Result of Quiz Details ",result)
      // });

      SetObjectID(id);
    }
  }, [QuizList]);

  const handleQuizNameChange = (e) => {
    setQuizName(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleTotalNoOfQuestion = (e) => {
    setTotalNoOfQuestion(e.target.value);
  };

  const handleNoOfRetakeAllowed = (e) => {
    setTotalNoOfRetake(e.target.value);
  };

  const handleRetakeAllowed = (e) => {
    setRetakeAllowed(e.target.value);
  };

  const handlePassingMarks = (e) => {
    setPassingMarks(e.target.value);
  };

  const handleAddQuiz = () => {
    let dataOfUser = localStorage.getItem("UserDetails");
    let { fname, lname } = JSON.parse(dataOfUser);
    if (!ObjectID) {
      QuizRequest.QuizCreate({
        quizname: quizName,
        description,
        Totalquestion: totalNoOfQuestion,
        NoofRetakeAllowed: totalNoOfRetake,
        Retakeallowedornot: "1",
        PassingMarks: passingMarks,
        createdby: "1",
      }).then((result) => {
        if (result) {
          navigate("/Quiz/Quizlist");
        }
      });
    } else {
      QuizRequest.QuizUpdate(ObjectID, {
        quizname: quizName,
        description,
        Totalquestion: totalNoOfQuestion,
        NoofRetakeAllowed: totalNoOfRetake,
        Retakeallowedornot: "1",
        PassingMarks: passingMarks,
        updatedby: "1",
        status: 1,
      }).then((result) => {
        if (result) {
          navigate("/Quiz/Quizlist");
        }
      });
    }
  };

  const handleDeleteQuiz = (id) => {
    console.log("Delete Id ---> ", id);
    dispatch(DeleteQuizLists(id));
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
              </span>
              Update Clause
            </h3>
            <nav aria-label="breadcrumb">
              <ul className="breadcrumb">
                <li className="breadcrumb-item active" aria-current="page">
                  <span />
                  <PageTitle
                    breadCrumbItems={[
                      {
                        label: "Audit",
                        path: "/Audit",
                      },
                      {
                        label: `Update Clause`,
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
                      <VerticalForm>
                        <Row>
                          <Col className="mt-2">
                            <InputLabel id="demo-simple-select-label">
                              Audit Name
                            </InputLabel>
                            <TextField
                              disabled="true"
                              style={{ width: "100%" }}
                              name="qname"
                              placeholder={"Audit Name"}
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col className="mt-2">
                            <InputLabel id="demo-simple-select-label">
                              Standard Name
                            </InputLabel>
                            <TextField
                              disabled="true"
                              style={{ width: "100%" }}
                              name="qname"
                              placeholder={"Standard Name"}
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col className="mt-2">
                            <InputLabel id="demo-simple-select-label">
                              Clause Name
                            </InputLabel>
                            <TextField
                              disabled="true"
                              style={{ width: "100%" }}
                              name="qname"
                              placeholder={"Clause Name"}
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col className="mt-2">
                            <InputLabel id="demo-simple-select-label">
                              Sub Clause Name
                            </InputLabel>
                            <TextField
                              disabled="true"
                              style={{ width: "100%" }}
                              name="qname"
                              placeholder={"Sub Clause Name"}
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col xl={12} className="mt-2">
                            <InputLabel id="demo-simple-select-label">
                              Result
                            </InputLabel>
                            <Select
                              style={{ width: "100%" }}
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              placeholder="Select Result"
                              value={totalNoOfQuestion}
                              onChange={handleTotalNoOfQuestion}
                            >
                              <MenuItem disabled value="">
                                <em>Please select Result</em>
                              </MenuItem>
                              <MenuItem value="MNC">MNC</MenuItem>
                              <MenuItem value="C">C</MenuItem>
                              <MenuItem value="O">O</MenuItem>
                            </Select>
                          </Col>
                        </Row>

                        <Row className="mt-2">
                          <Col>
                            <Box
                              component="form"
                              sx={{
                                "& .MuiTextField-root": {
                                  width: "100%",
                                },
                              }}
                              noValidate
                              autoComplete="off"
                            >
                              <label className="mb-2">Auditor Comments</label>
                              <TextField
                                placeholder="Enter Comments"
                                containerClass="mb-3"
                                id="outlined-multiline-static"
                                multiline
                                rows={4}
                                //onChange={handleQuestionValue}
                              />
                            </Box>
                          </Col>
                        </Row>
                        <Row className="mt-2">
                          <Col className="mt-2">
                            <Button
                              className="btn btn-gradient-primary mt-4"
                              variant="success"
                              onClick={handleAddQuiz}
                            >
                              Update Clause
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

export default ClauseWiseAuditDetailUpdate;
