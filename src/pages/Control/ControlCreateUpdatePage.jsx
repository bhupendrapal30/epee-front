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
import ControlRequest from "../../APIRequest/ControlRequest";

const ControlCreateUpdatePage = () => {
  let [ObjectID, SetObjectID] = useState(0);
  const { t } = useTranslation();
  const {ControlDetails,FrameworkDropDown } = useSelector((state) => state.Control);
  const { UserDetails } = useSelector(
    (state) => state.User,
  );

  const navigate = useNavigate();

  useEffect(() => {
    ControlRequest.FrameworkDropDown();
    let params = new URLSearchParams(window.location.search);
    let id = params.get("id");
    if (id !== null) {
      ControlRequest.ControlDetails(id);
      SetObjectID(id);
    }
  }, []);

  /*
   * form validation schema
   */
  const validationSchema = yup.object().shape({
    name: yup.string().required("Please Enter Control Name"),
    frameworkid: yup.string().required("Please Enter Framework Name"),
    
  })
  /*
   * form methods
   */

  /**
   * Handle the form submission
   */
  const CreateUpdateControl = (values) => {
    if (!ObjectID) {
      ControlRequest.ControlCreate({
        name: values.name,
        frameworkid: parseInt(values.frameworkid),
        status: values.status==true?1:0,
        createdby:UserDetails.id
      }).then((result) => {
        console.log(result);
        if (result) {
          navigate("/control/control-list");
        }
      });
    } else {
      ControlRequest.ControlUpdate(ObjectID, {
        name: values.name,
        frameworkid: parseInt(values.frameworkid),
        status: values.status==true?1:0,
        updatedby:UserDetails.id
      }).then((result) => {
        if (result) {
          navigate("/control/control-list");
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
              </span> Control  Add/Edit 
            </h3>
            <nav aria-label="breadcrumb">
              <ul className="breadcrumb">
                <li className="breadcrumb-item active" aria-current="page">
                  <span />
                  <PageTitle
        breadCrumbItems={[
          { label: "Control", path: "/control/control-list" },
          {
            label: !ObjectID ? "Create Control" : "Update Control",
            path: "/control/control-list",
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
                    onSubmit={CreateUpdateControl}
                    validationSchema={validationSchema}
                    defaultValues={ControlDetails}
                  >
                    <Row>
                      <Col>
                        <FormInput
                          name="name"
                          label={t("Control Name")}
                          placeholder={t("Enter Control Name")}
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
                            (i) => i.value === ControlDetails?.frameworkid,
                          )}
                        />

                      <FormInput
                          name="status"
                          label={t("Control Status")}
                          placeholder={t("Enter Control Status")}
                          containerClass={"mb-3"}
                          type="checkbox"
                        />
                      </Col>
                    </Row>

                    <Row className="mt-2">
                      <Col>
                        <Button type="submit" className="btn btn-gradient-primary me-2"  variant="success">
                          {!ObjectID ? "Add Control" : "Update Control"}
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
export default ControlCreateUpdatePage;
