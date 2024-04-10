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
import ClauseRequest from "../../APIRequest/ClauseRequest";

const ClauseCreateUpdatePage = () => {
  let [ObjectID, SetObjectID] = useState(0);
  const { t } = useTranslation();
  const { ClauseDetails,FrameworkDropDown } = useSelector((state) => state.Clause);
  const { UserDetails } = useSelector(
    (state) => state.User,
  );

  const navigate = useNavigate();

  useEffect(() => {
    ClauseRequest.FrameworkDropDown();
    let params = new URLSearchParams(window.location.search);
    let id = params.get("id");
    if (id !== null) {
      ClauseRequest.ClauseDetails(id);
      SetObjectID(id);
    }
  }, []);


 

  /*
   * form validation schema
   */
  const validationSchema = yup.object().shape({
    clause: yup.string().required("Please Enter Clause Name"),
    frameworkid: yup.string().required("Please Enter Framework Name"),
    
  })
  /*
   * form methods
   */

  /**
   * Handle the form submission
   */
  const CreateUpdateClause = (values) => {
    if (!ObjectID) {
      ClauseRequest.ClauseCreate({
        clause: parseInt(values.clause),
        frameworkid: values.frameworkid,
        status: values.status==true?1:0,
        createdby:UserDetails.id
      }).then((result) => {
        console.log(result);
        if (result) {
          navigate("/clause/clause-list");
        }
      });
    } else {
      ClauseRequest.ClauseUpdate(ObjectID, {
        clause: parseInt(values.clause),
        frameworkid: values.frameworkid,
        status: values.status==true?1:0,
        updatedby:UserDetails.id
      }).then((result) => {
        if (result) {
          navigate("/clause/clause-list");
        }
      });
    }
  };

  return (
    <>

      
     <div className="main-panel" style={{width:"80%",marginTop: "46px",minHeight:"681px;"}}>
        <div className="content-wrapper">
          <div className="page-header">
            <h3 className="page-title">
              <span className="page-title-icon bg-gradient-primary text-white me-2">
                <i className="mdi mdi-account-plus" />
              </span> Clause  Add/Edit 
            </h3>
            <nav aria-label="breadcrumb">
              <ul className="breadcrumb">
                <li className="breadcrumb-item active" aria-current="page">
                  <span />
                  <PageTitle
        breadCrumbItems={[
          { label: "Clause", path: "/clause/clause-list" },
          {
            label: !ObjectID ? "Create Clause" : "Update Clause",
            path: "/clause/clause-list",
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
                    onSubmit={CreateUpdateClause}
                    validationSchema={validationSchema}
                    defaultValues={ClauseDetails}
                  >
                    <Row>
                      <Col>
                        <FormInput
                          name="clause"
                          label={t("Clause Name")}
                          placeholder={t("Enter Clause Name")}
                          containerClass={"mb-3"}
                        />

                        <FormInput
                          name="frameworkid"
                          label={t("Framework")}
                          placeholder={t("Enter Framework ")}
                          containerClass={"mb-3"}
                          type="react-single-select"
                          options={FrameworkDropDown}
                          defaultValue={FrameworkDropDown.find(
                            (i) => i.value === ClauseDetails?.frameworkid,
                          )}
                        />

                      <FormInput
                          name="status"
                          label={t("Clause Status")}
                          placeholder={t("Enter Clause Status")}
                          containerClass={"mb-3"}
                          type="checkbox"
                        />
                      </Col>
                    </Row>

                    <Row className="mt-2">
                      <Col>
                        <Button type="submit" className="btn btn-gradient-primary me-2"  variant="success">
                          {!ObjectID ? "Add Clause" : "Update Clause"}
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
};
export default ClauseCreateUpdatePage;
