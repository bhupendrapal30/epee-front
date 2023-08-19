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
import RoleRequest from "../../APIRequest/RoleRequest";

const RolesCreateUpdatePage = () => {
  let [ObjectID, SetObjectID] = useState(0);
  const { t } = useTranslation();
  const { RoleDetails } = useSelector((state) => state.Role);

  const navigate = useNavigate();

  useEffect(() => {
    let params = new URLSearchParams(window.location.search);
    let id = params.get("id");
    if (id !== null) {
      RoleRequest.RoleDetails(id);
      SetObjectID(id);
    }
  }, []);

  /*
   * form validation schema
   */
  const validationSchema = yup.object().shape({
    name: yup.string().required("Please Enter Role Name"),
    
  });

  /*
   * form methods
   */

  /**
   * Handle the form submission
   */
  const CreateUpdateRole = (values) => {
    if (!ObjectID) {
      RoleRequest.RoleCreate({
        name: values.name,
        createdby: 1,
        status: values.status,
      }).then((result) => {
        console.log(result);
        if (result) {
          navigate("/Roles/roles-list");
        }
      });
    } else {
      RoleRequest.RoleUpdate(ObjectID, {
        name: values.name,
        createdby: 1,
        status: values.status,
      }).then((result) => {
        if (result) {
          navigate("/Roles/roles-list");
        }
      });
    }
  };

  return (
    <>
      <PageTitle
        breadCrumbItems={[
          { label: "Department", path: "/department/department-list" },
          {
            label: !ObjectID ? "Create Department" : "Update Department",
            path: "/department/department-list",
            active: true,
          },
        ]}
        title={!ObjectID ? "Create Department" : "Update Department"}
      />
     <div className="main-panel" style={{width:"80%",marginTop: "46px",minHeight:"700px;"}}>
        <div className="content-wrapper">
          <div className="page-header">
            <h3 className="page-title">
              <span className="page-title-icon bg-gradient-primary text-white me-2">
                <i className="mdi mdi-access-point-network" />
              </span> Add/Edit Roles
            </h3>
            <nav aria-label="breadcrumb">
              <ul className="breadcrumb">
                <li className="breadcrumb-item active" aria-current="page">
                  <span />
                   <PageTitle
                      breadCrumbItems={[
                        { label: "Roles", path: "/roles/roles-list" },
                        {
                          label: !ObjectID ? "Create Role" : "Update Role",
                          path: "/roles/roles-create-update",
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
                    onSubmit={CreateUpdateRole}
                    validationSchema={validationSchema}
                    defaultValues={RoleDetails}
                  >
                    <Row>
                      <Col xl={6}>
                        <FormInput
                          name="name"
                          label={t("Role Name")}
                          placeholder={t("Enter Role Name")}
                          containerClass={"mb-3"}
                        />
                       
                        
                      
                      </Col>
                    </Row>
                    <Row>
                      
                      <Col xl={6}>
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
                          ].find((i) => i.value == RoleDetails?.status)}
                        />
                      </Col>
                    </Row>

                    <Row className="mt-2">
                      <Col>
                        <Button type="submit" className="btn btn-gradient-primary me-2" variant="success">
                          {!ObjectID ? "Add Role" : "Update Role"}
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

export default RolesCreateUpdatePage;
