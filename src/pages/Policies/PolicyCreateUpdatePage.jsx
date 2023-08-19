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
import { defaultAvatarImg } from "../../helpers/Default";
import PolicyRequest from "../../APIRequest/PolicyRequest";

const PolicyCreateUpdatePage = () => {
  let [ObjectID, SetObjectID] = useState(0);
  const { t } = useTranslation();
  const { PolicyDetails } = useSelector((state) => state.Policy);
  console.log(PolicyDetails);
  let [PreviewImg, SetPreviewImg] = useState(defaultAvatarImg);
  
  const navigate = useNavigate();

  useEffect(() => {
    let params = new URLSearchParams(window.location.search);
    let id = params.get("id");
    if (id !== null) {
      PolicyRequest.PolicyDetails(id);
      SetObjectID(id);
    }
  }, []);

  /*
   * form validation schema
   */
  const validationSchema = yup.object().shape({
    filename: yup.string().required("Please enter the policy name "),
    description: yup.string().required("Please Enter policy description "),
    
  });

  /*
   * form methods
   */

  /**
   * Handle the form submission
   */
  const CreateUpdatePolicy = (values) => {
    if (!ObjectID) {
      PolicyRequest.PolicyCreate({
        filename: values.filename,
        description: values.description,
        status: values.status,
      }).then((result) => {
        console.log(result);
        if (result) {
          navigate("/policies/policy-list");
        }
      });
    } else {
      PolicyRequest.PolicyUpdate(ObjectID, {
        filename: values.filename,
        description: values.description,
        status: values.status,
      }).then((result) => {
        if (result) {
          navigate("/policies/policy-list");
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
              </span> Permission Listing
            </h3>
            <nav aria-label="breadcrumb">
              <ul className="breadcrumb">
                <li className="breadcrumb-item active" aria-current="page">
                  <span />
                  <PageTitle
                    breadCrumbItems={[
                      { label: "Policies", path: "/permission/permission-list" },
                      {
                        label: !ObjectID ? "Create Policy" : "Update Policy",
                        path: "/policies/policy-create-update",
                        active: true,
                      },
                    ]} /> 
                  
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
                    onSubmit={CreateUpdatePolicy}
                    validationSchema={validationSchema}
                    defaultValues={PolicyDetails}
                  >
                    <Row>
                      <Col>
                       
                        <FormInput
                          name="filename"
                          label={t("Policy Name")}
                          type="text"
                          placeholder={t("Enter Policy Name")}
                          containerClass={"mb-3"}
                          
                        />
                        

                        <FormInput
                          name="description"
                          label={t("Policy Details")}
                          placeholder={t("Enter Policy Details")}
                          containerClass={"mb-3"}
                          type="simple-rich-edior"
                        />

                        
                        <FormInput
                          name="status"
                          label={t("Status")}
                          placeholder={t("Select Status")}
                          containerClass={"mb-3"}
                          type="react-single-select"
                          options={[
                            { value: "1", label: "Enabled" },
                            { value: "0", label: "Disbaled" },
                            
                          ]}
                          defaultValue={[
                            { value: "1", label: "Enabled" },
                            { value: "0", label: "Disbaled" },
                          ].find((i) => i.value == PolicyDetails?.status)}
                        />
                      </Col>
                    </Row>

                    <Row className="mt-2">
                      <Col>
                        <Button type="submit"  className="btn btn-gradient-primary me-2"  variant="success">
                          {!ObjectID ? "Add Policy" : "Update Policy"}
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

export default PolicyCreateUpdatePage;
