//External Lib Import
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
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
import AuditAndSOARequest from "../../APIRequest/AudiAndSOARequest";
import convertDate from "../../utils/convertDates";
import { defaultAvatarImg } from "../../helpers/Default";
import ModuleRequest from "../../APIRequest/ModuleRequest";

function SOA() {
  let [ObjectID, SetObjectID] = useState(0);
  const { t } = useTranslation();
  const { SOAList } = useSelector((state) => state.AuditAndSOA);

  //Form Related State Values
  const [standard, setStandard] = useState("");
  const [soaVersion, setSoaVersion] = useState("");
  const [soaScopeStartDate, setSoaScopeStartDate] = useState(dayjs(new Date()));
  const [soaScopeEndDate, setSoaScopeEndDate] = useState(dayjs(new Date()));

  const navigate = useNavigate();

  useEffect(() => {
    console.log("SOA LIST ---> ", SOAList);
    let params = new URLSearchParams(window.location.search);
    let id = params.get("id");

    if (id !== null) {
      // UserRequest.UserData(id).then((result) => {});

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

  //Onchange Function

  const handleStandardChange = (e) => {
    setStandard(e.target.value);
  };

  const handleSoaVersionChange = (e) => {
    console.log("soa version Change ----> ", e.target.value);
    setSoaVersion(e.target.value);
  };

  const handleSOAScopeStartDateChange = (e) => {
    console.log("Scope Start date chnage -----> ", e.target.value);
  };

  const handleSOAScopeEndDateChange = (e) => {
    console.log("Scope End date chnage -----> ", e.target.value);
  };

  /**
   * Handle the form submission
   */
  const CreateUpdateSOA = async () => {
    let convertedStartDate = await convertDate(soaScopeStartDate);
    let convertedEndDate = await convertDate(soaScopeEndDate);
    console.log("Creates SOA Create Values ----> ", {
      standard,
      soaVersion,
      convertedStartDate,
      convertedEndDate,
    });
    if (!ObjectID) {
      AuditAndSOARequest.SOACreate({
        soaversion: new Number(soaVersion),
        standardid: new Number(standard),
        soadate: "2024-01-01",
        Soascopeperiodstartdate: convertedStartDate,
        soascopeperiodenddate: convertedEndDate,
        createdby: 1,
      }).then((result) => {
        if (result) {
          navigate("/SOAList");
        }
      });
    } else {
      AuditAndSOARequest.SOAUpdate(ObjectID, {
        soaversion: new Number(soaVersion),
        standardid: new Number(standard),
        soadate: "2024-01-01",
        Soascopeperiodstartdate: convertedStartDate,
        soascopeperiodenddate: convertedEndDate,
        updatedby: 1,
        id: ObjectID,
      }).then((result) => {
        if (result) {
          navigate("/SOAList");
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
              {!ObjectID ? "Add SOA" : "Update SOA"}
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
                        label: !ObjectID ? "Create SOA" : "Update SOA",
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
            <Col>
              <Card>
                <Card.Body>
                  <Row>
                    <Col>
                      <VerticalForm
                        //onSubmit={CreateUpdateSOA}
                        validationSchema={validationSchema}
                        //defaultValues={SOAList}
                      >
                        <Row className="mt-3">
                          <Col xl={12}>
                            <InputLabel id="demo-simple-select-label">
                              Standard
                            </InputLabel>
                            <Select
                              style={{ width: "100%" }}
                              labelId="demo-simple-select-label"
                              id="demo-simple-select"
                              value={standard}
                              onChange={handleStandardChange}
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
                            <InputLabel id="demo-simple-select-label">
                              SOA Version
                            </InputLabel>
                            <TextField
                              style={{ width: "100%" }}
                              id="outlined-basic"
                              variant="outlined"
                              name="soaversion"
                              placeholder="Enter SOA Version"
                              value={soaVersion}
                              onChange={handleSoaVersionChange}
                            />
                          </Col>
                        </Row>
                        <Row className="mt-3">
                          <Col xl={6}>
                            <InputLabel id="demo-simple-select-label">
                              SOA Scope Start Date
                            </InputLabel>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DemoContainer components={["DateTimePicker"]}>
                                <DateTimePicker
                                  format="DD-MM-YYYY"
                                  value={soaScopeStartDate}
                                  selected={soaScopeStartDate}
                                  onChange={(date) =>
                                    setSoaScopeStartDate(date)
                                  }
                                />
                              </DemoContainer>
                            </LocalizationProvider>
                          </Col>
                          <Col xl={6}>
                            <InputLabel id="demo-simple-select-label">
                              SOA Scope End Date
                            </InputLabel>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                              <DemoContainer components={["DateTimePicker"]}>
                                <DateTimePicker
                                  format="DD-MM-YYYY"
                                  value={soaScopeEndDate}
                                  selected={soaScopeEndDate}
                                  onChange={(date) => setSoaScopeEndDate(date)}
                                />
                              </DemoContainer>
                            </LocalizationProvider>
                          </Col>
                        </Row>
                        <Row className="mt-3">
                          <Col>
                            <Button
                              type="submit"
                              className="btn btn-gradient-primary me-2"
                              variant="success"
                              onClick={CreateUpdateSOA}
                            >
                              {!ObjectID ? "Add SOA" : "Update SOA"}
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

export default SOA;
