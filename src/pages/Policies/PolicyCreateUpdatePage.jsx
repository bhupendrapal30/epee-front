//External Lib Import
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ErrorMessage, Field } from "formik";

//Internal Lib Import
import PageTitle from "../../components/Ui/PageTitle";
import { FormInput } from "../../components/Ui";
import { VerticalForm } from "../../components/Ui";
import { defaultAvatarImg } from "../../helpers/Default";
import PolicyRequest from "../../APIRequest/PolicyRequest";

const PolicyCreateUpdatePage = () => {
  let [ObjectID, SetObjectID] = useState(0);
  const { t } = useTranslation();
  const { PolicyDetails,CategoryDropDown,StandardCatDropDown } = useSelector((state) => state.Policy);
 // const { CategoryDropDown } = useSelector((state) => state.Policy);

  let [PreviewImg, SetPreviewImg] = useState(defaultAvatarImg);
  let [showFile, SetshowFile] = useState(false);
  let [showDes, SetshowDes] = useState(true);

 
  
  const navigate = useNavigate();

  useEffect(() => {
    PolicyRequest.CategoryDropDown();
    PolicyRequest.StandardCatDropDown();
    let params = new URLSearchParams(window.location.search);
    let id = params.get("id");
    if (id !== null) {
      PolicyRequest.PolicyDetails(id);
      SetObjectID(id);
    }
  }, []);
  
  const handleChange = (e) => {
   
    if(e.currentTarget.value ==2){
       SetshowFile(true);
       SetshowDes(false);
    }else{
       SetshowFile(false);
       SetshowDes(true);
    }
 }

  /*
   * form validation schema
   */
  const validationSchema = yup.object().shape({
    title: yup.string().required("Please enter the policy name "),
    category_id: yup.string().required("Please enter the policy category "),
    standard_id: yup.string().required("Please enter the policy standard "),
  
    
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
       
        title: values.title,
        filename:filename,
        category_id:values.category_id,
        standard_id:values.standard_id,
        description: values.description,
        status: values.status,
      }).then((result) => {
        console.log(result);
        if (result) {
          navigate("/policies/policy-list");
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
        filename: filename,
        category_id:values.category_id,
        standard_id:values.standard_id,
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
          <Field as="select" containerClass={"mb-3"} 
           className="form-control"
          name="color" onClick={handleChange}>
             <option value="1">Add Policy Description</option>
             <option value="2">Upload Policy file</option>
             
           </Field>
          </div>
                        
                          
                       
                        <FormInput
                          name="title"
                          label={t("Policy Name")}
                          type="text"
                          placeholder={t("Enter Policy Name")}
                          containerClass={"mb-3"}
                          
                        />

                        <FormInput
                          name="category_id"
                          label={t("Category Name ")}
                          placeholder={t("Please select the Category ")}
                          containerClass={"mb-3"}
                          type="react-single-select"
                          options={CategoryDropDown}
                            defaultValue={CategoryDropDown?.find(
                            (i) => i.value == PolicyDetails?.category_id,
                          )}

                         
                        />

                        <FormInput
                          name="standard_id"
                          label={t(" Statndard Policy ")}
                          placeholder={t("Please select the policy statndard ")}
                          containerClass={"mb-3"}
                          type="react-single-select"
                          options={StandardCatDropDown}
                            defaultValue={StandardCatDropDown?.find(
                            (i) => i.value == PolicyDetails?.standard_id,
                          )}
                         
                        />
                        { showDes ?
                        <FormInput
                          name="description"
                          label={t("Policy Details")}
                          placeholder={t("Enter Policy Details")}
                          containerClass={"mb-3"}
                          type="simple-rich-edior"
                        />:

                        <FormInput
                          name="filename"
                          label={t("Upload policy file")}
                          type="file"
                          placeholder={t("Upload policy file")}
                          containerClass={"mb-3"}
                          
                        /> } 


                        

                        
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
