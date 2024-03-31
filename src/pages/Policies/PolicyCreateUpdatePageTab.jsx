//External Lib Import
import { useSelector } from "react-redux";
import { React,useEffect, useState } from "react";
//import React from "react";
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

import  FormInput1  from "../../components/Ui/FormInput";
import { defaultAvatarImg } from "../../helpers/Default";
import PolicyRequest from "../../APIRequest/PolicyRequest";


const PolicyCreateUpdatePageTab = (props) => {
let [ObjectID, SetObjectID] = useState(0);
 
const [dataFromChild, setDataFromChild] = useState("");
const [checkededitor, setcheckededitor] = useState(true);
const [checkeupload, setcheckeupload] = useState(false);

  

 
  const { t } = useTranslation();
  
   var { PolicyDetails,CategoryDropDown,StandardCatDropDown,assignerDropdrown,
  departmentDropdrown,reccurenceDropdrown,frameworkDropDown,subclauseDropdrown,ownerDropdrown } = useSelector((state) => state.Policy);
 // const { CategoryDropDown } = useSelector((state) => state.Policy);

  let [PreviewImg, SetPreviewImg] = useState(defaultAvatarImg);
  let [showFile, SetshowFile] = useState(false);
  let [showDes, SetshowDes] = useState(true);
  let [policyTypeVal, SetpolicyTypeVal] = useState(0);
  let [SelectedFramework, setSelectedFramework] = useState([]);
  let [selectedClause, setselectedClause] = useState([]);
  let [selectedSubClause, setselectedSubClause] = useState([]);

  let [selectedControl, setselectedControl] = useState([]);
  let [selectedSubControl, setselectedSubControl] = useState(false);
  let [policyData, setpolicyData] = useState("");
  
  

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
    let params1 = new URLSearchParams(window.location.search);
    let id1 = params1.get("id");
    PolicyRequest.PolicyDetails(id1);
    
    PolicyRequest.CategoryDropDown();
    PolicyRequest.StandardCatDropDown();
    PolicyRequest.assignerDropdrown();
    PolicyRequest.departmentDropdrown();
    PolicyRequest.reccurenceDropdrown();
    PolicyRequest.frameworkDropDown();
   //PolicyRequest.clauseDropdrown();
    //PolicyRequest.subclauseDropdrown();

  
    let params = new URLSearchParams(window.location.search);
    let id = params.get("id");
    
    if (id !== null) {
       PolicyRequest.PolicyDetails(id);
       SetObjectID(id);
       getPolicyData(id);
       PolicyRequest.ownerDropdrown();
       if(PolicyDetails.frameworkid!==null){
         handleChange(PolicyDetails.frameworkid)
       }
       if(PolicyDetails.policyType!=""){
         handleChangeValueEdit(PolicyDetails.policyType)
           if(PolicyDetails.policyType=='E')
           {
            setcheckededitor(true);
            setcheckeupload(false)
           }else{
            setcheckededitor(false);
            setcheckeupload(true)
           }
            
       }else{
        setcheckededitor(true);
        setcheckeupload(false)
       }
       

 
      }
  }, []);

  const getPolicyData = async (id) => {
      
       const API_URL =process.env.REACT_APP_API_URL+"/api/user/";
       const catUrl = `${API_URL}policydetails`;
       const data = await Axios.post(catUrl,{"data":{"policyid":id}});
       if (data) {
       
       let data1 =data.data;
       let approveData = data1.approver_mapping;
       let ownerData =data1.owner_mapping;
       let cData = {...data1.data[0],...data1.cluse_mapping[0],...data1.control_mapping[0]}
           cData.approverid =approveData;
           cData.ownerid =ownerData;
       
       
       setpolicyData(cData);
        console.log(cData);
        console.log(data);
        if(cData.frameworkid > 0){
         handleChange(cData.frameworkid)
        }
        if(cData.clause_id > 0){
         getSubClauseData(cData.clause_id)
        }
        if(cData.controlid >0){
         getSubControlData(cData.controlid)
        }
       

        
      }
       
      
  }




   

 var handleDataFromChild=(data)=> {
      //setDataFromChild(data);
     
      if(data.name=="frameworkid"){
        handleChange(data.value)
      }
      if(data.name=="clause_id"){
        
        handleChangeClause(data.value)
      }
      if(data.name=="controlid"){
        handleChangeControl(data.value)
      }


  };


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
  
    getClauseData(val);
    //getControlData(val);
    
}


const handleChangeClause =(e, setFieldValue)=>{
   var value = e.target.value;
   setFieldValue('clause_id', value)
   getSubClauseData(value);
    
}

const handleChangeSubClause =(e, setFieldValue)=>{
    var value = e.target.value;
    setFieldValue('subclauseid', value)
}


const handleChangeControl =(val)=>{
    getSubControlData(val);

}

const handleChangeControl1 =(e, setFieldValue)=>{
   var value = e.target.value;
    setFieldValue('controlid', value)
    getSubControlData(value);
}
 
const handleChangeSubControl =(e, setFieldValue)=>{
    var value = e.target.value;
    setFieldValue('subcontrolid', value)
}


const handleChangeframework = (e, setFieldValue) => {
  var value = e.target.value;
  setFieldValue('frameworkid', value)
  if(value > 0){
    getClauseData(value);
    getControlData(value);
  }
}


const handleChangeValueEdit = (val) => {
  //setFieldValue('policyType', val)
    if(val =="U"){
       SetshowFile(true);
       SetshowDes(false);
       
    }else{
       SetshowFile(false);
       SetshowDes(true);
    }
}


const handleChangeValue = (e,setFieldValue) => {
  setFieldValue('policyType', e.target.value)
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
              
            primaryassignee:yup.string().required("Please select the assignee"),
            
            clause_id:yup.string().required("Please select the clause"),
            subclauseid:yup.string().required("Please select the subclause"),
            controlid:yup.string().required("Please select the control"),
            subcontrolid:yup.string().required("Please select the sub control"),

            approverid: yup.array()
                .of(yup.string())
                .required("approver is required"),
             ownerid: yup.array()
                .of(yup.string())
                .required(" approver is required"),
    
    
    
  });

   const validationSchema1 = yup.object().shape({

            policyType:yup.string().required("Please select the policy type"),
            file_version:yup.string().required("Please enter the version"),
           
   });



  /*
   * form methods
   */

  /**
   * Handle the form submission
   */


   const CreateUpdatePolicy1 = (values,event) => {
    
     console.log(values)
   
     if (ObjectID) {
        
         PolicyRequest.PolicyFileUpdate(ObjectID, {
        policyid: values.policyid,
        filename:values.filename ,
        policyType:values.policyType,
        file_version:values.file_version,
        description:values.description,
        status: values.status,
        updatedby:1,
       }).then((result) => {
        if (result) {
          navigate("/policies/policy-list");
        }
      });
     }
   }
  const CreateUpdatePolicy = (values) => {
    
    if (!ObjectID) {
        if(localStorage.getItem('filename')){
          var filename1  = localStorage.getItem('filename');
          var filename  =filename1; 
          localStorage.removeItem('filename')
        }else{
           var filename='';
        }

      
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
       console.log(values);
      
        if(values.clause_id){
          var clauseid  = values.clause_id
          var subclauseid  = values.subclauseid
          var cluse1 = {};
          cluse1['clauseid'] = parseInt(clauseid);
          cluse1['subclauseid'] = parseInt(subclauseid);
          var cluse =[cluse1];

        }
          
    
        if(values.controlid){
          var controlid  = values.controlid;
          var subcontrolid  = values.subcontrolid
          var control1 = {};
          control1['controlid'] = parseInt(controlid);
          control1['subcontrolid'] = parseInt(subcontrolid);
          
          var control =[control1];
          
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

  function testData(data){
      alert(data)

  }
  
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
   
     <VerticalForm
                    onSubmit={CreateUpdatePolicy}
                    validationSchema={validationSchema}
                    defaultValues={PolicyDetails}
                  >

     
      <Row className="mb-2">
                       <Form.Group as={Col} controlId="formGridState">
                        <label>Framework</label> 
                        {/*<FormInput
                          name="frameworkid"
                          sendDataToParent={handleDataFromChild}
                          placeholder={t("Please select framework")}
                          containerClass={"mb-3"}
                          type="react-single-select1"
                          options={frameworkDropDown}
                          defaultValue={frameworkDropDown?.find(
                            (i) => i.value == PolicyDetails?.frameworkid,
                          )}
                        />*/}

                                <Field>
          {({ field, form: { touched, errors,setFieldValue, values } }) => (
            <>

            <Field as="select" name="frameworkid" className="form-select" onChange={ev => handleChangeframework(ev, setFieldValue)} >
                        <option disabled value="0">(Select a framework )</option>
                        {frameworkDropDown && frameworkDropDown.map(frame => {
                            return (
                                    <option value={frame.value}>{frame.label} </option>
                              )
                            
                        }) }
                    </Field>
              

              <ErrorMessage name="frameworkid" />
            </>
          )}
        </Field>
                        
        </Form.Group>
      </Row>

      <Row className="mb-2">
                  <Form.Group as={Col} controlId="formGridState">
                    <label>CLAUSES</label>
                     <Field>
          {({ field, form: { touched, errors,setFieldValue, values } }) => (
            <>

            <Field as="select" className="form-select"  name="clause_id" onChange={ev => handleChangeClause(ev, setFieldValue)} >
                        <option disabled value="">(Select a clause )</option>
                        {selectedClause && selectedClause.map(frame => {
                            return (
                                    <option value={frame.value}>{frame.label} </option>
                              )
                            
                        }) }
                    </Field>
              

              <ErrorMessage name="clause_id" />
            </>
          )}
        </Field>
                  
                    
        </Form.Group>
        <Form.Group as={Col} controlId="formGridState222">
                  <label>SUB CLAUSES</label>

                   <Field>
          {({ field, form: { touched, errors,setFieldValue, values } }) => (
            <>

            <Field as="select" className="form-select"  name="subclauseid" onChange={ev => handleChangeSubClause(ev, setFieldValue)} >
                        <option disabled value="">(Select a subclause )</option>
                        {selectedSubClause && selectedSubClause.map(frame => {
                            return (
                                    <option value={frame.value}>{frame.label} </option>
                              )
                            
                        }) }
                    </Field>
              

              <ErrorMessage name="subclauseid" />
            </>
          )}
        </Field>
                  
                    {/*<FormInput
                          name="subclauseid"
                          sendDataToParent={handleDataFromChild}
                          placeholder={t("Please select the sub clause ")}
                          containerClass={"test"}
                          type="react-single-select3"
                          options={selectedSubClause}
                          defaultValue={selectedSubClause?.find(
                            (i) => i.value == PolicyDetails?.clauseid,
                          )}
                          
                  />*/}
                    
        </Form.Group>
        </Row>
        <Row className="mb-2">
        <Form.Group as={Col} controlId="formGridState">

                    <label>CONTROLS</label>

                   <Field>
          {({ field, form: { touched, errors,setFieldValue, values } }) => (
            <>

            <Field as="select" className="form-select"  name="controlid" onChange={ev => handleChangeControl1(ev, setFieldValue)} >
                        <option disabled value="">(Select a Control )</option>
                        {selectedControl && selectedControl.map(frame => {
                            return (
                                    <option value={frame.value}>{frame.label} </option>
                              )
                            
                        }) }
                    </Field>
              

              <ErrorMessage name="controlid" />
            </>
          )}
        </Field>
                    {/* <FormInput
                          name="controlid"
                          sendDataToParent={handleChangeSubControl}
                          placeholder={t("Please select the control ")}
                          containerClass={"test"}
                          type="react-single-select3"
                          options={selectedControl}
                          defaultValue={selectedControl?.find(
                            (i) => i.value == PolicyDetails?.clauseid,
                          )}
                         
                          


                  />*/}
         
        </Form.Group>
        <Form.Group as={Col} controlId="formGridState">
           <label>SUB CONTROLS</label>
           <Field>
            {({ field, form: { touched, errors,setFieldValue, values } }) => (
              <>

              <Field as="select" className="form-select"  name="subcontrolid" onChange={ev => handleChangeSubControl(ev, setFieldValue)} >
                          <option disabled value="">(Select a Sub Control )</option>
                          {selectedSubControl && selectedSubControl.map(frame => {
                              return (
                                      <option value={frame.value}>{frame.label} </option>
                                )
                              
              }) }
            </Field>
              

              <ErrorMessage name="subcontrolid" />
            </>
          )}
        </Field>
        </Form.Group>
        </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridCity1">
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
          </div>

      
          </div>
                        </span>
          </span>
          </div>
        </Form.Group>
        <Form.Group as={Col} controlId="formGridCity2">
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
                          defaultValue={policyData.approverid}

                         
                        />
              </div>
            </div>
          </span>
          </span>
          </div>
        </Form.Group>

        

        <Form.Group as={Col} controlId="formGridState4">
          <Form.Label>APPROVER</Form.Label>
         <div>
          <FormInput
                          name="approverid"
                          
                          placeholder={t("Please select the assignee ")}
                          containerClass={"mb-4"}
                          type="react-multiple-select"
                          options={ownerDropdrown}
                          defaultValue={policyData.approverid}
                          />

          </div>
        </Form.Group>
      </Row>
      <Row className="mb-3">

        <Form.Group as={Col} controlId="formGridState5">
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
           </VerticalForm>
     
        </Tab>
       <Tab eventKey="clauses" title="POLICY REQUIRMENTS OR UPLOAD POLICY">
       <VerticalForm
                    onSubmit={CreateUpdatePolicy1}
                    validationSchema={validationSchema1}
                    defaultValues={PolicyDetails}
                  >
        <Row className="mb-2">
         <Field>
          {({ field, form: { touched, errors,setFieldValue, values } }) => (
            <>
           <div className="row" style={{ marginBottom: "15px" }}>
            <div className='col col-lg-2'>
             <input type="radio" value="E" name="policyType" defaultChecked={checkededitor} onChange={e=>handleChangeValue(e,setFieldValue)}/> Editor
            </div>
           <div className='col col-lg-2'>
              <input type="radio" value="U" name="policyType" defaultChecked={checkeupload} onChange={e=>handleChangeValue(e,setFieldValue)} /> Upload Policy
           </div>
          </div>
           </>
          )}
          </Field>
        

       { showDes  ?

       <FormInput
                          name="description"
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


                  <FormInput
                          name="file_version"
                          label={t("Version")}
                          type="text"
                          placeholder={t("ex : 1")}
                          containerClass={"mb-3"}
                          
                        />    

                     </Row>
                     <Row className="mt-2">
                      <Col>
                        <Button type="submit"  className="btn btn-gradient-primary me-2"  variant="success">
                           Update 
                        </Button>
                      </Col>
                    </Row>
                      </VerticalForm>
                      </Tab>
                      <Tab eventKey="audit" title="AUDIT LOG" >
                      HISTORY LOG TAB
                      </Tab>
                    </Tabs>

                        
                        
                      </Col>
                     
                    </Row>


                    
                 
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
