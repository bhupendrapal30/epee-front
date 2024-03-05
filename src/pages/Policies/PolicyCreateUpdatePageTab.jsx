//External Lib Import
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Row, Col, Card, Button,Form } from "react-bootstrap";

import Select from "react-select";

import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ErrorMessage, Field } from "formik";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Axios from 'axios';

//Internal Lib Import
import PageTitle from "../../components/Ui/PageTitle";
import { Link } from "react-router-dom";
import { FormInput } from "../../components/Ui";
import { VerticalForm } from "../../components/Ui";
import { defaultAvatarImg } from "../../helpers/Default";
import PolicyRequest from "../../APIRequest/PolicyRequest";

const PolicyCreateUpdatePageTab = (props) => {
  let [ObjectID, SetObjectID] = useState(0);
  const { t } = useTranslation();
  
   var { PolicyDetails,CategoryDropDown,StandardCatDropDown,assignerDropdrown,
  departmentDropdrown,reccurenceDropdrown,frameworkDropDown,subclauseDropdrown,ownerDropdrown } = useSelector((state) => state.Policy);
 // const { CategoryDropDown } = useSelector((state) => state.Policy);

  let [PreviewImg, SetPreviewImg] = useState(defaultAvatarImg);
  let [showFile, SetshowFile] = useState(false);
  let [showDes, SetshowDes] = useState(true);
  let [policyTypeVal, SetpolicyTypeVal] = useState(0);
  let [SelectedFramework, setSelectedFramework] = useState(0);
  let [selectedClause, setselectedClause] = useState(0);
  let [selectedSubClause, setselectedSubClause] = useState(0);

  let [selectedControl, setselectedControl] = useState(false);
  let [selectedSubControl, setselectedSubControl] = useState(false);
  


  let params = new URLSearchParams(window.location.search);
  let id = params.get("id");
  
  if (id == null) {
    PolicyDetails= {
      title:"",
      policyType:"",
      filename:"",
      category_id:"",
      standard_id:"",
      description: "",
      status: "",
      file_version: "",
      
    };
  }
  
  const navigate = useNavigate();
  

  useEffect(() => {
    
    PolicyRequest.CategoryDropDown();
    PolicyRequest.StandardCatDropDown();
    PolicyRequest.assignerDropdrown();
    PolicyRequest.departmentDropdrown();
    PolicyRequest.reccurenceDropdrown();
    PolicyRequest.frameworkDropDown();
    PolicyRequest.ownerDropdrown();
    //PolicyRequest.clauseDropdrown();
    //PolicyRequest.subclauseDropdrown();
  
    let params = new URLSearchParams(window.location.search);
    let id = params.get("id");
    
    if (id !== null) {
      PolicyRequest.PolicyDetails(id);
      SetObjectID(id);
     //handleChangeValue(PolicyDetails.policyType);
      }
  }, []);

  const getPolicyData = async (id) => {
        
       const API_URL =process.env.REACT_APP_API_URL+"/api/user/";
       const catUrl = `${API_URL}getPolicyId`;
       const response = await Axios.post(catUrl,{"data":{"id":id}});
       console.log(response.data.data.policyType)
       handleChangeValue(response.data.data.policyType);
      
      
  }


  const getClauseData = async (id) => {
    
     // setFieldValue('frameworkid', e.target.value);
    
       const API_URL =process.env.REACT_APP_API_URL+"/api/user/";
       const catUrl = `${API_URL}clauselist`;
       const response = await Axios.post(catUrl,{"data":{"frameworkid":id}});
       if(response.data.data.length > 0) {
        setselectedClause(response.data.data);
        
       }else{
        setselectedClause([]);
       }
       
      
      
  }

  const getControlData = async (id) => {
        
       const API_URL =process.env.REACT_APP_API_URL+"/api/user/";
       const catUrl = `${API_URL}controlist`;
       const response = await Axios.post(catUrl,{"data":{"frameworkid":id}});
       if(response.data.data.length > 0) {
        setselectedControl(response.data.data);
       }else{
        setselectedControl([]);
       }
       
      
      
  }

  const getSubClauseData = async (id) => {
        
       const API_URL =process.env.REACT_APP_API_URL+"/api/user/";
       const catUrl = `${API_URL}subclauselist`;
       const response = await Axios.post(catUrl,{"data":{"clause_id":id}});
       if(response.data.data.length > 0) {
        setselectedSubClause(response.data.data);
       }else{
        setselectedSubClause([]);
       }
       
      
  }


const getSubControlData = async (id) => {
        
       const API_URL =process.env.REACT_APP_API_URL+"/api/user/";
       const catUrl = `${API_URL}subcontrolist`;
       const response = await Axios.post(catUrl,{"data":{"control_id":id}});
       if(response.data.data.length > 0) {
        setselectedSubControl(response.data.data);
       }else{
        setselectedSubControl([]);
       }
       
      
}

const handleChange = (val) => {
    getClauseData(val.value);
    getControlData(val.value);
    localStorage.setItem('frameworkid',val.value);
}


const handleChangeClause =(val)=>{
    getSubClauseData(val.value);
    localStorage.setItem('clauseid',val.value);
}

const handleChangeSubClause =(val)=>{
    localStorage.setItem('subclauseid',val.value);
}


const handleChangeControl =(val)=>{
    getSubControlData(val.value);
    localStorage.setItem('controlid',val.value);
}
 
const handleChangeSubControl =(val)=>{
    localStorage.setItem('subcontrolid',val.value);
}


const handleChangeValue = (e) => {
    if(e.target.value =="U"){
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
    
    
    
  });



  /*
   * form methods
   */

  /**
   * Handle the form submission
   */
  const CreateUpdatePolicy = (values) => {
    alert('fff')
    alert(ObjectID)
    if (!ObjectID) {
        if(localStorage.getItem('filename')){
          var filename1  = localStorage.getItem('filename');
          var filename  =filename1; 
          localStorage.removeItem('filename')
        }else{
           var filename='';
        }

      
       console.log(values) 
       
        console.log(values)
      // PolicyRequest.PolicyCreate({
       
      //   title: values.title,
      //   policyType: policyTypeVal,
      //   filename:filename,
      //   category_id:values.category_id,
      //   standard_id:values.standard_id,
      //   description: values.description,
      //   status: values.status,
      //   file_version: values.file_version,
      // }).then((result) => {
      //   console.log(result);
      //   if (result) {
      //     navigate("/policies/policy-list");
      //   }
      // });
    } else {
       if(localStorage.getItem('frameworkid')){
          var frameworkid  = localStorage.getItem('frameworkid');
          values.frameworkid  =parseInt(frameworkid); 
          localStorage.removeItem('frameworkid')
        }else{
          values.frameworkid = values.frameworkid;
        }
        if(localStorage.getItem('clauseid')){
          var clauseid  = localStorage.getItem('clauseid');
          var subclauseid  = localStorage.getItem('subclauseid');
          var cluse1 = {};
          cluse1['clauseid'] = parseInt(clauseid);
          cluse1['subclauseid'] = parseInt(subclauseid);
          var cluse =[cluse1];
          
          localStorage.removeItem('clauseid');
          localStorage.removeItem('subclauseid');
        }else{
          values.clauseid = values.cluse;
        }
        if(localStorage.getItem('controlid')){
          var controlid  = localStorage.getItem('controlid');
          var subcontrolid  = localStorage.getItem('subcontrolid');
          var control1 = {};
          control1['controlid'] = parseInt(controlid);
          control1['subcontrolid'] = parseInt(subcontrolid);
          
          var control =[control1];
          localStorage.removeItem('controlid');
          localStorage.removeItem('subcontrolid')
        }else{
          values.controlid = values.controlid;
        }

        
           
      
        
      PolicyRequest.PolicyUpdate(ObjectID, {
        policyname: values.policyname,
        primaryassignee: values.primaryassignee,
        reccurenceid: values.reccurenceid,
        policyrequirements:values.policyrequirements,
        ownerid:values.ownerid,
        approverid:values.approverid,
        departmentsid: values.departmentsid,
        frameworkid: values.frameworkid,
        cluse: cluse,
        control: control,
        subclauseid: values.subclauseid,
        subcontrolid: values.subcontrolid,
        status: values.status,
        updatedby:1,
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
                        
                          
                       
                    <Tabs
                      defaultActiveKey="policy"
                      transition={false}
                      id="noanim-tab-example"
                      className="mb-3"
                    >
      <Tab eventKey="policy" title="POLICY">
   
     

     


      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>PRIMARY ASSIGNEE</Form.Label>
          <div>
          <span className="nav-profile-text d-flex flex-column">
          
          <span class="font-weight-bold">
          <div className="row">
           
          <div className='col col-lg-10'>
          <FormInput
                          name="primaryassignee"
                          
                          placeholder={t("Please select the assignee ")}
                          containerClass={"test"}
                          type="react-single-select"
                          options={assignerDropdrown}
                            defaultValue={assignerDropdrown?.find(
                            (i) => i.value == PolicyDetails?.primaryassignee,
                          )}

                         
                        />
          </div></div>
                        </span>
          </span>
          </div>
        </Form.Group>
        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>Secondary Assignee</Form.Label>
          <div>
          <span className="nav-profile-text d-flex flex-column">
          
          <span class="font-weight-bold">
          <div className="row">
           <div className='col col-lg-2'>
          <img src="../../assets/images/faces-clipart/pic-1.png" alt="image"/>
          </div>
          <div className='col col-lg-10'>
          <FormInput
                          name="ownerid"
                          
                          placeholder={t("Please select the assignee ")}
                          containerClass={"test"}
                          type="react-multiple-select"
                          options={assignerDropdrown}
                            defaultValue={assignerDropdrown?.find(
                            (i) => i.value == PolicyDetails?.primaryassignee,
                          )}

                         
                        />
              </div>
            </div>
          </span>
          </span>
          </div>
        </Form.Group>

        <Form.Group as={Col} controlId="formGridState">
          <Form.Label>APPROVER</Form.Label>
         <div>
          <FormInput
                          name="approverid"
                          
                          placeholder={t("Please select the assignee ")}
                          containerClass={"mb-4"}
                          type="react-multiple-select"
                          options={ownerDropdrown}
                          />

          </div>
        </Form.Group>
      </Row>
      <Row className="mb-3">

        <Form.Group as={Col} controlId="formGridState">
          <FormInput
                          name="departmentsid"
                          label={t("Departments ")}
                          placeholder={t("Select departemnts")}
                          containerClass={"mb-3"}
                          type="react-single-select"
                          options={departmentDropdrown}
                          defaultValue={departmentDropdrown?.find(
                            (i) => i.value == PolicyDetails?.departmentsid,
                          )}
                        />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridZip">
          <FormInput
                          name="reccurenceid"
                          label={t(" Reccurence ")}
                          placeholder={t("Please select reccurence")}
                          containerClass={"mb-3"}
                          type="react-single-select"
                          options={reccurenceDropdrown}
                            defaultValue={reccurenceDropdrown?.find(
                            (i) => i.value == PolicyDetails?.reccurenceid,
                          )}
                         
                        />
        </Form.Group>
       
       
       </Row>

       <Row className="mb-2">
                       <Form.Group as={Col} controlId="formGridState">
                      <label>Framework</label> 
                  <Select
                      name="frameworkid"
                      className="react-select"
                      classNamePrefix="react-select"
                      options={frameworkDropDown}
                      onChange={handleChange}
                    />

                     {/*<Field id="frameworkid1" name="frameworkid" as="select"
              onChange={handleChange}
              >
              
              <option value="1">Select country</option>
              <option value="2">United States</option>
              <option value="3">Canada</option>
            </Field>*/}
              

                       {/*<FormInput
                          name="departmentsid"
                          type="select5"
                          label={t("FRAMEWORK ")}
                          placeholder={t("Select departemnts")}
                          containerClass={"mb-6"}
                          type="react-single-select"
                          onChange={handleChange}
                          options={frameworkDropDown}
                          
                        />*/}
                       </Form.Group>
      </Row>

      <Row className="mb-2">
                  <Form.Group as={Col} controlId="formGridState">
                    <label>CLAUSES</label>
                    <Select
                      name="clauseid"
                      className="react-multiple-select"
                      label={t("SUB CLAUSES ")}
                      classNamePrefix="react-select"
                      options={selectedClause}
                      onChange={handleChangeClause}
                      />
        </Form.Group>
        <Form.Group as={Col} controlId="formGridState222">
                  <label>SUB CLAUSES</label>
                    <Select
                        name="subclauseid"
                      className="react-multiple-select"
                       label={t("SUB CLAUSES ")}
                      classNamePrefix="react-select"
                      onChange={handleChangeSubClause}
                      options={selectedSubClause}
                      
                      />
        </Form.Group>
        </Row>
        <Row className="mb-2">
        <Form.Group as={Col} controlId="formGridState">

                    <label>CONTROLS</label>
                    <Select
                      name="controlid"
                      className="react-multiple-select"
                       label={t("SUB CLAUSES ")}
                      classNamePrefix="react-select"
                      options={selectedControl}
                      onChange={handleChangeControl}
                      
                      />
          {/*<FormInput
                          name="departmentsid"
                          label={t("CONTROLS ")}
                          placeholder={t("Select departemnts")}
                          containerClass={"mb-3"}
                          type="react-single-select"
                          options={[
                            { value: "1", label: "test" },
                            { value: "2", label: "test1" },
                            
                          
                          ]}
                        />*/}
        </Form.Group>
        <Form.Group as={Col} controlId="formGridState">
           <label>SUB CONTROLS</label>
                    <Select
                    name="subcontrolid"
                      className="react-multiple-select"
                       label={t("SUB CLAUSES ")}
                      classNamePrefix="react-select"
                      onChange={handleChangeSubControl}
                      options={selectedSubControl}
                      
                      />
        </Form.Group>
        </Row>
        <Row>
        <FormInput
                          name="policyrequirements"
                          label={t("Policy Requirements (Optional)")}
                          placeholder={t("Enter requirements ")}
                          containerClass={"mb-3"}
                          type="simple-rich-edior"
                        />
        </Row>

       <Row className="mt-2">
                      <Col>
                        <Button type="submit"  className="btn btn-gradient-primary me-2"  variant="success">
                           Update Policy
                        </Button>
                      </Col>
                    </Row>
     
        </Tab>
       <Tab eventKey="clauses" title="POLICY REQUIRMENTS OR UPLOAD POLICY">
        <Row className="mb-2">
           <div className="row" style={{ marginBottom: "15px" }}>
            <div className='col col-lg-2'>
             <input type="radio" value="E" name="editor" defaultChecked onChange={handleChangeValue}/> Editor
            </div>
           <div className='col col-lg-2'>
              <input type="radio" value="U" name="editor" onChange={handleChangeValue} /> Upload Policy
           </div>
          </div>
        

       { showDes  ?

       <FormInput
                          name="policyrequirements"
                          label={t("Policy Requirements")}
                          placeholder={t("Enter requirements ")}
                          containerClass={"mb-3"}
                          type="simple-rich-edior"
                        /> :

              <FormInput
                          name="filename"
                          label={t("Upload policy file")}
                          type="file"
                          placeholder={t("Upload policy file")}
                          containerClass={"mb-3"}
                          
                      /> } 


                      

                     </Row>
                      </Tab>
                      <Tab eventKey="audit" title="AUDIT LOG" >
                      AUDIT LOG TAB
                      </Tab>
                    </Tabs>

                        
                        
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

export default PolicyCreateUpdatePageTab;
