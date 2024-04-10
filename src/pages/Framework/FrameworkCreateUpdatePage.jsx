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
import FrameworkRequest from "../../APIRequest/FrameworkRequest";

const FrameworkCreateUpdatePage = () => {
  let [ObjectID, SetObjectID] = useState(0);
  const { t } = useTranslation();
  const { FrameworkDetails } = useSelector((state) => state.Framework);
  const { UserDetails } = useSelector(
    (state) => state.User,
  );

  const navigate = useNavigate();

  useEffect(() => {
    let params = new URLSearchParams(window.location.search);
    let id = params.get("id");
    if (id !== null) {
      FrameworkRequest.FrameworkDetails(id);
      SetObjectID(id);
    }
  }, []);

  /*
   * form validation schema
   */
  const validationSchema = yup.object().shape({
    name: yup.string().required("Please Enter Framework Name"),
    
  })
  /*
   * form methods
   */

  /**
   * Handle the form submission
   */
  const CreateUpdateFramework = (values) => {
    if (!ObjectID) {
      FrameworkRequest.FrameworkCreate({
        name: values.name,
        status: values.status,
        createdby:UserDetails.id
      }).then((result) => {
        console.log(result);
        if (result) {
          navigate("/framework/framework-list");
        }
      });
    } else {
      FrameworkRequest.FrameworkUpdate(ObjectID, {
        name: values.name,
        status: values.status,
        updatedby:UserDetails.id
      }).then((result) => {
        if (result) {
          navigate("/framework/framework-list");
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
              </span> Framework  Add/Edit 
            </h3>
            <nav aria-label="breadcrumb">
              <ul className="breadcrumb">
                <li className="breadcrumb-item active" aria-current="page">
                  <span />
                  <PageTitle
        breadCrumbItems={[
          { label: "Framework", path: "/framework/framework-list" },
          {
            label: !ObjectID ? "Create Framework" : "Update Framework",
            path: "/framework/framework-list",
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
                    onSubmit={CreateUpdateFramework}
                    validationSchema={validationSchema}
                    defaultValues={FrameworkDetails}
                  >
                    <Row>
                      <Col>
                        <FormInput
                          name="name"
                          label={t("Framework Name")}
                          placeholder={t("Enter Framework Name")}
                          containerClass={"mb-3"}
                        />
                        
                        <FormInput
                          name="status"
                          label={t("Framework Status")}
                          placeholder={t("Enter Framework Status")}
                          containerClass={"mb-3"}
                          type="checkbox"
                        />
                      </Col>
                    </Row>

                    <Row className="mt-2">
                      <Col>
                        <Button type="submit" className="btn btn-gradient-primary me-2"  variant="success">
                          {!ObjectID ? "Add Framework" : "Update Framework"}
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
export default FrameworkCreateUpdatePage;
