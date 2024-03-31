import React from "react";
//External Lib Import
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { Input, Modal } from "antd";

//Internal Lib Import
import PageTitle from "../../components/Ui/PageTitle";
import { FormInput } from "../../components/Ui";
import { VerticalForm } from "../../components/Ui";
import UserRequest from "../../APIRequest/UserRequest";
import QuestionAnswerRequest from "../../APIRequest/QuestionAndAnswer";
import { defaultAvatarImg } from "../../helpers/Default";
import ModuleRequest from "../../APIRequest/ModuleRequest";

const { TextArea } = Input;

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
  gap: "2vh",
  overflowY: "auto",
};

function Questions() {
  let [ObjectID, SetObjectID] = useState(0);
  let [quizIdSelected, setQuizId] = useState(0);
  let [questionValue, setQuestionValue] = useState("");
  let [editQuestionValue, setEditQuestionValue] = useState("");
  let [answerOne, setAnswerOne] = useState("");
  let [editAnswerOne, setEditAnswerOne] = useState("");
  let [answerTwo, setAnswerTwo] = useState("");
  let [editAnswerTwo, setEditAnswerTwo] = useState("");
  let [answerThree, setAnswerThree] = useState("");
  let [editAnswerThree, setEditAnswerThree] = useState("");
  let [answerFourth, setAnswerFourth] = useState("");
  let [editAnswerFourth, setEditAnswerFourth] = useState("");
  let [correctanswer, setCorrectAnswer] = useState("");
  let [editCorrectAnswer, setEditCorrectAnswer] = useState("");

  //For Edit Modal
  const [openModal, setOpenModal] = React.useState(false);
  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const { t } = useTranslation();
  const { UserData } = useSelector((state) => state.User);
  const { UserDetails } = useSelector((state) => state.User);
  const { List } = useSelector((state) => state.QuestionAnswer);
  // const { DepartmentDropDown } = useSelector((state) => state.Department);
  const { RoleDropDown } = useSelector((state) => state.Module);
  const [uploadFile, setShowUploadFile] = useState(false);
  const [questions, SetQuestions] = useState([]);

  // let [PreviewImg, SetPreviewImg] = useState(defaultAvatarImg);

  const navigate = useNavigate();

  useEffect(() => {
    // DepartmentRequest.DepartmentDropDown();
    // ModuleRequest.RoleDropDown();
    let params = new URLSearchParams(window.location.search);
    let id = params.get("id");

    if (id !== null) {
      // UserRequest.UserData(id).then((result) => {});

      SetObjectID(id);
    }
  }, [List]);

  const handleQuizId = (e) => {
    setQuizId(e.target.value);
  };
  const handleQuestionValue = (e) => {
    setQuestionValue(e.target.value);
  };
  const handleEditQuestionValue = (e) => {
    setEditQuestionValue(e.target.value);
  };
  const handleAnswerOneValue = (e) => {
    setAnswerOne(e.target.value);
  };
  const handleEditAnswerOneValue = (e) => {
    setEditAnswerOne(e.target.value);
  };
  const handleAnswerTwoValue = (e) => {
    setAnswerTwo(e.target.value);
  };
  const handleEditAnswerTwoValue = (e) => {
    setEditAnswerTwo(e.target.value);
  };
  const handleAnswerThreeValue = (e) => {
    setAnswerThree(e.target.value);
  };
  const handleEditAnswerThreeValue = (e) => {
    setEditAnswerThree(e.target.value);
  };
  const handleAnswerFourthValue = (e) => {
    setAnswerFourth(e.target.value);
  };
  const handleEditAnswerFourthValue = (e) => {
    setEditAnswerFourth(e.target.value);
  };
  const handleCorrectAnswerValue = (e) => {
    setCorrectAnswer(e.target.value);
  };
  const handleEditCorrectAnswerValue = (e) => {
    setEditCorrectAnswer(e.target.value);
  };
  const handleAddQuestions = () => {
    let dataOfUser = localStorage.getItem("UserDetails");
    let { fname, lname } = JSON.parse(dataOfUser);
    if (!ObjectID) {
      QuestionAnswerRequest.QuestionAndAnswerCreate({
        Quizid: quizIdSelected,
        Question: questionValue,
        ANSWER1: answerOne,
        ANSWER2: answerTwo,
        ANSWER3: answerThree,
        ANSWER4: answerFourth,
        CORRECTANSWER1: correctanswer,
        createdby: "1",
        createddate: new Date().toLocaleDateString(),
      }).then((result) => {
        if (result) {
          navigate("/QandA/QandA-list");
        }
      });
    } else {
      QuestionAnswerRequest.QuestionAndAnswerUpdate(ObjectID, {
        Quizid: quizIdSelected,
        Question: questionValue,
        ANSWER1: answerOne,
        ANSWER2: answerTwo,
        ANSWER3: answerThree,
        ANSWER4: answerFourth,
        CORRECTANSWER1: correctanswer,
        updatedby: "1",
        status: 1,
      }).then((result) => {
        if (result) {
          navigate("/QandA/QandA-list");
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
              {ObjectID ? "Edit Questions" : "Add Questions"}
            </h3>
            <nav aria-label="breadcrumb">
              <ul className="breadcrumb">
                <li className="breadcrumb-item active" aria-current="page">
                  <span />
                  <PageTitle
                    breadCrumbItems={[
                      {
                        label: "Questions",
                        path: "/training/questions",
                      },
                      {
                        label: !ObjectID
                          ? "Create Questions"
                          : "Update Questions",
                        path: "/training/questions",
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
                        // onSubmit={CreateUpdateUser}
                        // validationSchema={validationSchema}
                        defaultValues={List}
                      >
                        <Row className="mb-3">
                          <Col xl={6}>
                            <InputLabel id="demo-simple-select-label">
                              Quiz Id
                            </InputLabel>
                            <Select
                              style={{ width: "100%" }}
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              defaultValue={quizIdSelected}
                              value={quizIdSelected}
                              onChange={handleQuizId}
                            >
                              <MenuItem disabled value="">
                                <em>Please select Quiz Id</em>
                              </MenuItem>
                              <MenuItem value={1}>1</MenuItem>
                              <MenuItem value={2}>2</MenuItem>
                              <MenuItem value={3}>3</MenuItem>
                              <MenuItem value={4}>4</MenuItem>
                              <MenuItem value={5}>5</MenuItem>
                              <MenuItem value={6}>6</MenuItem>
                              <MenuItem value={7}>7</MenuItem>
                              <MenuItem value={8}>8</MenuItem>
                              <MenuItem value={9}>9</MenuItem>
                              <MenuItem value={10}>10</MenuItem>
                              <MenuItem value={11}>11</MenuItem>
                              <MenuItem value={12}>12</MenuItem>
                              <MenuItem value={13}>13</MenuItem>
                              <MenuItem value={14}>14</MenuItem>
                              <MenuItem value={15}>15</MenuItem>
                            </Select>
                          </Col>
                        </Row>
                        <Row>
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
                              <label className="mb-2">Question</label>
                              <TextField
                                containerClass="mb-3"
                                id="outlined-multiline-static"
                                multiline
                                rows={4}
                                onChange={handleQuestionValue}
                              />
                            </Box>
                          </Col>
                        </Row>
                        <Row>
                          <Col xl={6}>
                            <Box
                              className="mt-3"
                              component="form"
                              sx={{
                                "& > :not(style)": { width: "100%" },
                              }}
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                              noValidate
                              autoComplete="off"
                            >
                              <label className="mb-2">Answer One</label>
                              <TextField
                                id="outlined-basic"
                                variant="outlined"
                                name="anwer1"
                                placeholder="Enter First Answer"
                                value={answerOne}
                                onChange={handleAnswerOneValue}
                              />
                            </Box>
                          </Col>
                          <Col xl={6}>
                            <Box
                              className="mt-3"
                              component="form"
                              sx={{
                                "& > :not(style)": { width: "100%" },
                              }}
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                              noValidate
                              autoComplete="off"
                            >
                              <label className="mb-2">Answer Two</label>
                              <TextField
                                id="outlined-basic"
                                variant="outlined"
                                name="anwer2"
                                placeholder="Enter Second Answer"
                                value={answerTwo}
                                onChange={handleAnswerTwoValue}
                              />
                            </Box>
                          </Col>
                        </Row>
                        <Row>
                          <Col xl={6}>
                            <Box
                              className="mt-3"
                              component="form"
                              sx={{
                                "& > :not(style)": { width: "100%" },
                              }}
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                              noValidate
                              autoComplete="off"
                            >
                              <label className="mb-2">Answer Three</label>
                              <TextField
                                id="outlined-basic"
                                variant="outlined"
                                name="anwer3"
                                placeholder="Enter Third Answer"
                                value={answerThree}
                                onChange={handleAnswerThreeValue}
                              />
                            </Box>
                          </Col>
                          <Col xl={6}>
                            <Box
                              className="mt-3"
                              component="form"
                              sx={{
                                "& > :not(style)": { width: "100%" },
                              }}
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                              noValidate
                              autoComplete="off"
                            >
                              <label className="mb-2">Answer Four</label>
                              <TextField
                                id="outlined-basic"
                                variant="outlined"
                                name="anwer3"
                                placeholder="Enter Fourth Answer"
                                value={answerFourth}
                                onChange={handleAnswerFourthValue}
                              />
                            </Box>
                          </Col>
                        </Row>
                        <Row>
                          <Col xl={6}>
                            <Box
                              className="mt-3"
                              component="form"
                              sx={{
                                "& > :not(style)": { width: "100%" },
                              }}
                              style={{
                                display: "flex",
                                flexDirection: "column",
                              }}
                              noValidate
                              autoComplete="off"
                            >
                              {" "}
                              <label className="mb-2">Correct Answer</label>
                              <TextField
                                id="outlined-basic"
                                variant="outlined"
                                name="correctanswer"
                                placeholder="Enter Correct Answer"
                                value={correctanswer}
                                onChange={handleCorrectAnswerValue}
                              />
                            </Box>
                          </Col>
                        </Row>
                        <Row className="mt-2">
                          <Col>
                            <Button
                              type="submit"
                              className="btn btn-gradient-primary mt-4"
                              variant="success"
                              onClick={handleAddQuestions}
                            >
                              {!ObjectID ? "Add Questions" : "Update Questions"}
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

export default Questions;
