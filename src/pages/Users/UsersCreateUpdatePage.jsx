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
import UserRequest from "../../APIRequest/UserRequest";
import { defaultAvatarImg } from "../../helpers/Default";
import ModuleRequest from "../../APIRequest/ModuleRequest";


// import DepartmentRequest from "../../APIRequest/DepartmentRequest";

const UsersCreateUpdatePage = () => {
  let [ObjectID, SetObjectID] = useState(0);
  const { t } = useTranslation();
  const { UserData } = useSelector((state) => state.User);
  const { UserDetails } = useSelector((state) => state.User);
  // const { DepartmentDropDown } = useSelector((state) => state.Department);
  const { RoleDropDown } = useSelector((state) => state.Module);

  // let [PreviewImg, SetPreviewImg] = useState(defaultAvatarImg);
  

  const navigate = useNavigate();
 

  useEffect(() => {
    // DepartmentRequest.DepartmentDropDown();
    ModuleRequest.RoleDropDown();
    let params = new URLSearchParams(window.location.search);
    let id = params.get("id");
   
    if (id !== null) {
      UserRequest.UserData(id).then((result) => {
       
      });

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





  /*
   * form methods
   */

  /**
   * Handle the form submission
   */
  const CreateUpdateUser = (values) => {
    console.log(UserRequest);
    
    // if (!values.EmployeeAvatar) values.EmployeeAvatar = defaultAvatarImg;
    if (!ObjectID) {
      UserRequest.UserCreate({
        fname: values.fname,
        lname: values.lname,
        mobileNo: values.mobileNo,
        email: values.email,
        password: values.password,
        usertype: values.usertype,
        status: values.status,
        createdby:UserDetails.id
       
      }).then((result) => {
        if (result) {
          navigate("/users/users-list");
        }
      });
    } else {
      UserRequest.UserUpdate(ObjectID, {
        fname: values.fname,
        lname: values.lname,
        mobileNo: values.mobileNo,
        email: values.email,
        password: values.password,
        usertype: values.usertype,
        status: values.status,
        createdby:UserDetails.id

      }).then((result) => {
        if (result) {
          navigate("/users/users-list");
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
              </span> Add/Edit User
            </h3>
            <nav aria-label="breadcrumb">
              <ul className="breadcrumb">
                <li className="breadcrumb-item active" aria-current="page">
                  <span />
                  <PageTitle
                    breadCrumbItems={[
                      { label: "Users", path: "/users/users-list" },
                      {
                        label: !ObjectID ? "Create User" : "Update User",
                        path: "/users/users-list",
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
                    onSubmit={CreateUpdateUser}
                    validationSchema={validationSchema}
                    defaultValues={UserData}
                  >
                    

                    <Row>
                      
                      <Col xl={6}>
                        <FormInput
                          name="fname"
                          label={t("First Name")}
                          placeholder={t("Enter First Name")}
                          containerClass={"mb-3"}
                        />
                      </Col>
                       <Col xl={6}>
                        <FormInput
                          name="lname"
                          label={t("Last Name")}
                          placeholder={t("Enter Last Name")}
                          containerClass={"mb-3"}
                        />
                    </Col>
                    </Row>

                   


                    <Row>
                      <Col xl={6}>
                        <FormInput
                         
                          name="mobileNo"
                          label={t("Phone")}
                          placeholder={t("Enter Phone")}
                          containerClass={"mb-3"}
                        />
                      </Col>
                      <Col xl={6}>
                        <FormInput
                          name="email"
                          label={t("Email")}
                          placeholder={t("Enter Email")}
                          containerClass={"mb-3"}
                          type="email"
                        />
                      </Col>
                    </Row>

                    <Row>
                      <Col xl={6}>
                        <FormInput
                          type="password"
                          name="password"
                          label={t("Password")}
                          placeholder={t("Enter Password")}
                          containerClass={"mb-3"}
                        />
                      </Col>
                      <Col xl={6}>
                         <FormInput
                            name="usertype"
                            label={t("Roles  ")}
                            placeholder="Please select roles"
                            containerClass={"mb-3"}
                            type="react-single-select"
                            options={RoleDropDown}
                             defaultValue={RoleDropDown?.find(
                            (i) => i.value == UserData?.usertype,
                          )}
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
                          ].find((i) => i.value == UserData?.status)}
                        />
                      </Col>
                    </Row>

                    <Row className="mt-2">
                      <Col>
                        <Button type="submit"  className="btn btn-gradient-primary me-2" variant="success">
                          {!ObjectID ? "Add User" : "Update User"}
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

export default UsersCreateUpdatePage;
