//External Lib Import
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ErrorMessage, Field } from "formik";


import Axios from 'axios';

//Internal Lib Import
import PageTitle from "../../components/Ui/PageTitle";
import { Link } from "react-router-dom";
import { FormInput } from "../../components/Ui";
import { VerticalForm } from "../../components/Ui";
import { defaultAvatarImg } from "../../helpers/Default";
import PolicyRequest from "../../APIRequest/PolicyRequest";

const PolicyCreateUpdatePageNew = () => {
  let [ObjectID, SetObjectID] = useState(0);
  const { t } = useTranslation();
  const { UserDetails } = useSelector((state) => state.User);
  var { PolicyDetails,CategoryDropDown,StandardCatDropDown,assignerDropdrown,
  departmentDropdrown,reccurenceDropdrown } = useSelector((state) => state.Policy);
 // const { CategoryDropDown } = useSelector((state) => state.Policy);

  let [PreviewImg, SetPreviewImg] = useState(defaultAvatarImg);
  let [showFile, SetshowFile] = useState(false);
  let [showDes, SetshowDes] = useState(true);
  let [policyTypeVal, SetpolicyTypeVal] = useState(0);

  let params = new URLSearchParams(window.location.search);
  let id = params.get("id");
  
  if (id == null) {
    PolicyDetails= {
      policyname:"",
      primaryassignee:"",
      reccurenceid:"",
      departmentsid:"",
      standard_id:"",
      policyrequirements: "",
      
      
    };
  }
  
  const navigate = useNavigate();


  

  useEffect(() => {
    
    PolicyRequest.CategoryDropDown();
    PolicyRequest.StandardCatDropDown();
    PolicyRequest.assignerDropdrown();
    PolicyRequest.departmentDropdrown();
    PolicyRequest.reccurenceDropdrown();
    let params = new URLSearchParams(window.location.search);
    let id = params.get("id");
    
    if (id !== null) {
      PolicyRequest.PolicyDetails(id);
      SetObjectID(id);
      getPolicyData(id);
      //handleChangeValue(PolicyDetails.policyType);

      
       console.log(showFile);
    }
  }, []);

  const getPolicyData = async (id) => {
        
       const API_URL =process.env.REACT_APP_API_URL+"/api/user/";
       const catUrl = `${API_URL}getPolicyId`;
       const response = await Axios.post(catUrl,{"data":{"id":id}});
       console.log(response.data.data.policyType)
       handleChangeValue(response.data.data.policyType);
      
      
  }
  
  const handleChange = (e) => {
    
    if(e.target.value ==2){
       SetshowFile(true);
       SetshowDes(false);
       SetpolicyTypeVal(e.target.value);
    }else{
       SetshowFile(false);
       SetshowDes(true);
       SetpolicyTypeVal(e.target.value);
    }
 }


 const handleChangeValue = (val) => {
   
    if(val ==2){
       SetshowFile(true);
       SetshowDes(false);
       SetpolicyTypeVal(val);
    }else{
       SetshowFile(false);
       SetshowDes(true);
       SetpolicyTypeVal(val);
    }
 }

 

  /*
   * form validation schema
   */
  const validationSchema = yup.object().shape({
    policyname: yup.string().required("Please enter the policy name "),

    policyrequirements:yup.string().required("Please enter the policy name "),
    
    
  });



  /*
   * form methods
   */

  /**
   * Handle the form submission
   */
  const CreateUpdatePolicy = (values) => {
    if (!ObjectID) {
        if(localStorage.getItem('filename')){
          var filename1  = localStorage.getItem('filename');
          var filename  =filename1; 
          localStorage.removeItem('filename')
        }else{
           var filename='';
        }

      
        
      PolicyRequest.PolicyCreate({
       
        policyname: values.policyname,
        primaryassignee: values.primaryassignee,
        reccurenceid:values.reccurenceid,
        departmentsid:values.departmentsid,
        policyrequirements:values.policyrequirements,
        createdby: UserDetails.id,
        status: 1
      }).then((result) => {
        console.log(result);
        if (result > 0 ) {
          navigate("/policies/policy-create-update-tab?id="+result);
        }
      });
    } else {
       
       if(localStorage.getItem('filename')){
         var filename1  = localStorage.getItem('filename');
         var filename  =filename1; 
         localStorage.removeItem('filename')
       }else{
        var filename =values.filename;
       }
        
      PolicyRequest.PolicyUpdate(ObjectID, {
        title: values.title,
        policyType: policyTypeVal,
        filename: filename,
        category_id:values.category_id,
        standard_id:values.standard_id,
        description: values.description,
        status: values.status,
        file_version: values.file_version,
      }).then((result) => {
        if (result) {
          navigate("/policies/policy-list");
        }
      });
    }
  };
  
 const downloadPolicy =(pdf)=> {
    
    const pdfLink = pdf;
    const anchorElement = document.createElement('a');

    const fileName = `policy-file.pdf`;
    anchorElement.href = pdfLink;
    anchorElement.download = fileName;

    anchorElement.click();
    
    
  };
 
  
  return (
    <>
      <div className="main-panel" style={{width:"80%",marginTop: "46px",minHeight:"681px;"}}>
        <div className="content-wrapper">
          <div className="page-header">
            <h3 className="page-title">
              <span className="page-title-icon bg-gradient-primary text-white me-2">
                <i className="mdi mdi-account-plus" />
              </span> Policies 
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
         <div className="form-group">
                 

                         {/*<FormInput
                          name="policyType"
                          label={t("Policy Type")}
                          placeholder={t("Select Policy")}
                          containerClass={"mb-3"}
                          type="react-single-select"
                          options={[
                            { value: "1", label: "Add Policy Description" },
                            { value: "2", label: "Upload Policy file" },
                            
                          ]}
                          defaultValue={[
                            { value: "1", label: "Add Policy Description" },
                            { value: "2", label: "Upload Policy file" },
                          ].find((i) => i.value == PolicyDetails?.policyType)}
                        />*/}
         
           
         
          </div>
                        
                          
                       
                        <FormInput
                          name="policyname"
                          label={t("Policy Name")}
                          type="text"
                          placeholder={t("Enter Policy Name")}
                          containerClass={"mb-3"}
                          
                        />

                        <FormInput
                          name="primaryassignee"
                          label={t("Assignee  ")}
                          placeholder={t("Please select the assignee ")}
                          containerClass={"mb-3"}
                          type="react-single-select"
                          options={assignerDropdrown}
                            defaultValue={assignerDropdrown?.find(
                            (i) => i.value == PolicyDetails?.user_id,
                          )}

                         
                        />

                        <FormInput
                          name="reccurenceid"
                          label={t(" Reccurence ")}
                          placeholder={t("Please select reccurence")}
                          containerClass={"mb-3"}
                          type="react-single-select"
                          options={reccurenceDropdrown}
                            defaultValue={reccurenceDropdrown?.find(
                            (i) => i.value == PolicyDetails?.standard_id,
                          )}
                         
                        />

                     <FormInput
                          name="departmentsid"
                          label={t("Departments ")}
                          placeholder={t("Select departemnts")}
                          containerClass={"mb-3"}
                          type="react-single-select"
                          options={departmentDropdrown}
                          defaultValue={departmentDropdrown?.find(
                            (i) => i.value == PolicyDetails?.standard_id,
                          )}
                        />
                        
                       
                        <FormInput
                          name="policyrequirements"
                          label={t("Policy Requirements (optional)")}
                          placeholder={t("Enter requirements (optional)")}
                          containerClass={"mb-3"}
                          type="simple-rich-edior"
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

export default PolicyCreateUpdatePageNew;
