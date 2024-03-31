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
import DepartmentRequest from "../../APIRequest/DepartmentRequest";

const DepartmentCreateUpdatePage = () => {
  let [ObjectID, SetObjectID] = useState(0);
  const { t } = useTranslation();
  const { DepartmentDetails } = useSelector((state) => state.Department);
  const { UserDetails } = useSelector(
    (state) => state.User,
  );

  const navigate = useNavigate();

  useEffect(() => {
    let params = new URLSearchParams(window.location.search);
    let id = params.get("id");
    if (id !== null) {
      DepartmentRequest.DepartmentDetails(id);
      SetObjectID(id);
    }
  }, []);

  /*
   * form validation schema
   */
  const validationSchema = yup.object().shape({
    departmentname: yup.string().required("Please Enter Department Name"),
    DepartmentShortName: yup
      .string()
      .required("Please Enter Department Short Name"),
  });

  /*
   * form methods
   */

  /**
   * Handle the form submission
   */
  const CreateUpdateDepartment = (values) => {
    if (!ObjectID) {
      DepartmentRequest.DepartmentCreate({
        departmentname: values.departmentname,
        DepartmentShortName: values.DepartmentShortName,
        DepartmentDetails: values.DepartmentDetails,
        status: values.status,
        createdby:UserDetails.id
      }).then((result) => {
        console.log(result);
        if (result) {
          navigate("/department/department-list");
        }
      });
    } else {
      DepartmentRequest.DepartmentUpdate(ObjectID, {
        departmentname: values.departmentname,
        DepartmentShortName: values.DepartmentShortName,
        DepartmentDetails: values.DepartmentDetails,
        status: values.status,
        updatedby:UserDetails.id
      }).then((result) => {
        if (result) {
          navigate("/department/department-list");
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
              </span> Department  Add/Edit 
            </h3>
            <nav aria-label="breadcrumb">
              <ul className="breadcrumb">
                <li className="breadcrumb-item active" aria-current="page">
                  <span />
                  <PageTitle
        breadCrumbItems={[
          { label: "Department", path: "/department/department-list" },
          {
            label: !ObjectID ? "Create Department" : "Update Department",
            path: "/department/department-list",
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
                    onSubmit={CreateUpdateDepartment}
                    validationSchema={validationSchema}
                    defaultValues={DepartmentDetails}
                  >
                    <Row>
                      <Col>
                        <FormInput
                          name="departmentname"
                          label={t("Department Name")}
                          placeholder={t("Enter Department Name")}
                          containerClass={"mb-3"}
                        />
                        <FormInput
                          name="DepartmentShortName"
                          label={t("Department Short Name")}
                          placeholder={t("Enter Department Short Name")}
                          containerClass={"mb-3"}
                        />

                        <FormInput
                          name="DepartmentDetails"
                          label={t("Department Details")}
                          placeholder={t("Enter Department Details")}
                          containerClass={"mb-3"}
                          type="simple-rich-edior"
                        />

                        <FormInput
                          name="status"
                          label={t("Department Status")}
                          placeholder={t("Enter Department Status")}
                          containerClass={"mb-3"}
                          type="checkbox"
                        />
                      </Col>
                    </Row>

                    <Row className="mt-2">
                      <Col>
                        <Button type="submit" className="btn btn-gradient-primary me-2"  variant="success">
                          {!ObjectID ? "Add Department" : "Update Department"}
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
export default DepartmentCreateUpdatePage;
