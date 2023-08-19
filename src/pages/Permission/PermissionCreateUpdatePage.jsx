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
import PermissionRequest from "../../APIRequest/PermissionRequest";
// // import CategoryRequest from "../../APIRequest/CategoryRequest";
// import SubCategoryRequest from "../../APIRequest/SubCategoryRequest";
import ModuleRequest from "../../APIRequest/ModuleRequest";

const PermissionCreateUpdatePage = () => {
  let [ObjectID, SetObjectID] = useState(0);
  const { t } = useTranslation();
  const { PermissionDetails } = useSelector((state) => state.Permission);
  // const { SubCategoryDropDown } = useSelector((state) => state.SubCategory);
  const { ModuleDropDown,RoleDropDown } = useSelector((state) => state.Module);
  const navigate = useNavigate();
  useEffect(() => {
   
    ModuleRequest.ModuleDropDown();
    ModuleRequest.RoleDropDown();
    let params = new URLSearchParams(window.location.search);
    let id = params.get("id");
    if (id !== null) {
      PermissionRequest.PermissionDetails(id);
      SetObjectID(id);
    }
  }, []);

  /*
   * form validation schema
   */
 
  const validationSchema = yup.object().shape({
    roleid: yup.string().required("Please select the role"),
    
   
  });

  console.log(PermissionDetails);

  /*
   * form methods
   */

  /**
   * Handle the form submission
   * 
   * 
   */

   const CreateUpdatePermission = (values) => {
   
    
    
    // if (!values.EmployeeAvatar) values.EmployeeAvatar = defaultAvatarImg;
    if (!ObjectID) {
      PermissionRequest.PermissionCreate({
        roleid: values.roleid,
        moduleid: values.moduleid,
        addedit: values.addedit,
        view: values.view,
        status: values.status,
       
      }).then((result) => {
        if (result) {
          navigate("/permission/permission-list");
        }
      });
    } else {
        PermissionRequest.PermissionUpdate(ObjectID,{
        roleid: values.roleid,
        moduleid: values.moduleid,
        addedit: values.addedit,
        view: values.view,
        status: values.status,
       
      }).then((result) => {
        if (result) {
          navigate("/permission/permission-list");
        }
      });
      
    }
  };
  

  return (
    <>
     
    <div className="main-panel" style={{width:"80%",marginTop: "46px",minHeight:"700px;"}}>
        <div className="content-wrapper">
          <div className="page-header">
            <h3 className="page-title">
              <span className="page-title-icon bg-gradient-primary text-white me-2">
                <i className="mdi mdi-account-key" />
              </span> {!ObjectID ? "Add Permission" : "Update Permission"}
            </h3>
            <nav aria-label="breadcrumb">
              <ul className="breadcrumb">
                <li className="breadcrumb-item active" aria-current="page">
                  <span />
                   <PageTitle
                      breadCrumbItems={[
                        { label: "Permission", path: "/permission/permission-list" },
                        {
                          label: !ObjectID ? "Add Permission" : "Update Permission",
                          path: "/permission/permission-create-update",
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
                    onSubmit={CreateUpdatePermission}
                    validationSchema={validationSchema}
                    defaultValues={PermissionDetails}
                  >
                    <Row>
                      <Col>

                         <FormInput
                            name="roleid"
                            label={t("Roles  ")}
                            placeholder="Please select roles"
                            containerClass={"mb-3"}
                            type="react-single-select"
                            options={RoleDropDown}
                             defaultValue={RoleDropDown?.find(
                            (i) => i.value == PermissionDetails?.roleid,
                          )}
                          />

                         <FormInput
                          name="moduleid"
                          label={t("Module Name ")}
                          placeholder={t("Please select the module ")}
                          containerClass={"mb-3"}
                          type="react-single-select"
                          options={ModuleDropDown}
                          defaultValue={ModuleDropDown?.find(
                            (i) => i.value == PermissionDetails?.moduleid,
                          )}
                        />
                      <div className="row">
                        <div className="col-md-2">
                          <div className="form-group">
                            <FormInput
                              name="addedit"
                              label={t("Add/Edit")}
                              placeholder={t("EnterStatus")}
                              containerClass={"mb-1"}
                              type="checkbox"
                            />
                            
                          </div>
                        </div>
                        <div className="col-md-2">
                          <div className="form-group">
                           
                            <FormInput
                              name="view"
                              label={t("View")}
                              placeholder={t("EnterStatus")}
                              containerClass={"mb-1"}
                              type="checkbox"
                            />
                            
                          </div>
                        </div>
                      </div>
                        
                        
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
                          ].find((i) => i.value == PermissionDetails?.status)}
                        />
                      </Col>
                    </Row>

                    <Row className="mt-2">
                      <Col>
                         <Button type="submit"  className="btn btn-gradient-primary me-2" variant="success">
                          {!ObjectID ? "Add Permission" : "Update Permission"}
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

export default PermissionCreateUpdatePage;
