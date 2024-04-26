//External Lib Import
import { useSelector } from "react-redux";
import { React,useEffect, useState,useRef } from "react";
//import React from "react";
import { Row, Col, Card, Button,Form,Modal  } from "react-bootstrap";

import Select from "react-select";

import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ErrorMessage, Field } from "formik";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import Axios from 'axios';
import moment from 'moment';
import DateFormatter from "../../utils/DateFormatter";
import AleartMessage from "../../helpers/AleartMessage";





//Internal Lib Import
import PageTitle from "../../components/Ui/PageTitle";
import { Link } from "react-router-dom";
import { FormInput } from "../../components/Ui";
import { VerticalForm } from "../../components/Ui";

import  FormInput1  from "../../components/Ui/FormInput";
import { defaultAvatarImg } from "../../helpers/Default";
import PolicyRequest from "../../APIRequest/PolicyRequest";
import RiskRequest from "../../APIRequest/RiskRequest";


const RiskCreateUpdatePageTab = (props) => {
let [ObjectID, SetObjectID] = useState(0);
 
const [dataFromChild, setDataFromChild] = useState("");
const [checkededitor, setcheckededitor] = useState(true);
const [checkeupload, setcheckeupload] = useState(false);

const { UserDetails } = useSelector(
    (state) => state.User,
  );
const [key, setKey] = useState('risks');

const [show, setShow] = useState(false);
const [show1, setShow1] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleShow1 = () => setShow1(true);
  const handleClose1 = () => setShow1(false);


  const [BtnClicked, setBtnClicked] = useState('');
  const inputRef = useRef(null);
 
  

 
  const { t } = useTranslation();
  
  var { departmentDropdrown,reccurenceDropdrown,PolicyDetails } = useSelector((state) => state.Policy);
  const { RiskDetails,RiskownerDropDown,RiskMitigationLists, RiskControlLists } = useSelector((state) => state.Risk);

  

   let [selectedRiskCat, setselectedRiskCat] = useState([]);
   let [RiskCatId, setRiskCatId] = useState(0);
   let [selectedVulnerabilityGroup, setselectedVulnerabilityGroup] = useState(
      []
   );
   let [selectedVulnerabilityName, setselectedVulnerabilityName] = useState([]);
   let [selectedVulnerabilityGroupId, setselectedVulnerabilityGroupId] =
      useState(0);
   let [selectedThreatnameid, setselectedThreatnameid] = useState([]);
   let [riskData, setriskData] = useState("");



  
  

  let params = new URLSearchParams(window.location.search);
   let id = params.get("id");
   if (id == null) {
      // PolicyDetails= {
      //   title:"",
      //   policyType:"",
      //   filename:"",
      //   category_id:"",
      //   standard_id:"",
      //   description: "",
      //   status: "",
      //   file_version: "",
      // };
   }

   const navigate = useNavigate();

   useEffect(() => {
      let params1 = new URLSearchParams(window.location.search);
      let id1 = params1.get("id");
      RiskRequest.RiskMitigationList(id1);
      RiskRequest.RiskControlList(id1);

      

  
      PolicyRequest.departmentDropdrown();
      RiskRequest.RiskownerDropDown();
      getRiskCatData();
      //PolicyRequest.clauseDropdrown();
      //PolicyRequest.subclauseDropdrown();

      let params = new URLSearchParams(window.location.search);
      let id = params.get("id");

      if (id !== null) {
         RiskRequest.RiskDetails(id);
         getRiskData(id);
         SetObjectID(id);
         //alert(RiskDetails.Vulnerabilitygroupid)
         

      }
   }, []);

   const getRiskCatData = async (id) => {
      // setFieldValue('frameworkid', e.target.value);

      const API_URL = process.env.REACT_APP_API_URL + "/api/user/";
      const catUrl = `${API_URL}riskcategoryidlist`;
      const response = await Axios.get(catUrl);
      if (response.data.data.length > 0) {
         setselectedRiskCat(response.data.data);
      } else {
         setselectedRiskCat([]);
      }
   };

   const getRiskData = async (id) => {
      
       const API_URL =process.env.REACT_APP_API_URL+"/api/user/";
       const catUrl = `${API_URL}riskdetails`;
       const data = await Axios.post(catUrl,{"data":{"id":id}});
       var riskData1 ='';
       if (data) {
          riskData1 =data?.data.data[0];
          setriskData(riskData1);
        }
        console.log(riskData1)
        if(riskData1.riskcategoryid > 0){
            getvulnerabilitygroupidlist(riskData1.riskcategoryid)
            getvulnerabilitynamelist(riskData1.Vulnerabilitygroupid);
            getthreatnameidlist(riskData1.Vulnerabilitynameid);

        }
       
       
      
  }

   const getvulnerabilitygroupidlist = async (id) => {
      // setFieldValue('frameworkid', e.target.value);

      const API_URL = process.env.REACT_APP_API_URL + "/api/user/";
      const catUrl = `${API_URL}vulnerabilitygroupidlist`;
      const response = await Axios.post(catUrl, {
         data: { riskcategoryid: id },
      });
      //console.log(response.data.data)
      if (response.data.data.length > 0) {
         setselectedVulnerabilityGroup(response.data.data);
         setRiskCatId(id);
         localStorage.setItem('RiskCatIds',id);
      } else {
         setselectedVulnerabilityGroup([]);
         setRiskCatId(0);
      }
      
   };

   const getvulnerabilitynamelist = async (id) => {
      // setFieldValue('frameworkid', e.target.value);
      var riskcategoryid = 0;
     RiskCatId = parseInt(localStorage.getItem('RiskCatIds'));
      if (RiskCatId > 0) {
         riskcategoryid = RiskCatId;
      }

      const API_URL = process.env.REACT_APP_API_URL + "/api/user/";
      const catUrl = `${API_URL}vulnerabilitynameidlist`;
      const response = await Axios.post(catUrl, {
         data: { Riskcategoryid: riskcategoryid, Vulnerabilitygroupid: id },
      });
      if (response.data.data.length > 0) {
         setselectedVulnerabilityName(response.data.data);
         setselectedVulnerabilityGroupId(id);
         localStorage.setItem('VulnerabilityGroupIds',id);
      } else {
         setselectedVulnerabilityName([]);
         setselectedVulnerabilityGroupId(0);
      }
   };

   const getthreatnameidlist = async (id) => {
      // setFieldValue('frameworkid', e.target.value);
      var riskcategoryid = 0;
      var VulnerabilityGroupId = 0;
      RiskCatId = parseInt(localStorage.getItem('RiskCatIds'));
      VulnerabilityGroupId = parseInt(localStorage.getItem('VulnerabilityGroupIds'));
      if (RiskCatId > 0) {
         riskcategoryid = RiskCatId;
      }

      

      const API_URL = process.env.REACT_APP_API_URL + "/api/user/";
      const catUrl = `${API_URL}threatnameidlist`;
      const response = await Axios.post(catUrl, {
         data: {
            Riskcategoryid: riskcategoryid,
            Vulnerabilitygroupid: VulnerabilityGroupId,
            VulnerabilityNameid: id,
         },
      });
      if (response.data.data.length > 0) {
         setselectedThreatnameid(response.data.data);
      } else {
         setselectedThreatnameid([]);
      }
   };

   const handleChangeVulnerabilitygroup = (e, setFieldValue) => {
      var value = e.target.value;
      setFieldValue("Vulnerabilitygroupid", value);
      getvulnerabilitynamelist(value);
   };

   const handleChangeVulnerabilityname = (e, setFieldValue) => {
      var value = e.target.value;

      setFieldValue("Vulnerabilitynameid", value);
      getthreatnameidlist(value);
   };

   const handleChangeControl1 = (e, setFieldValue) => {
      var value = e.target.value;
      setFieldValue("controlid", value);
   };

   const handleChangeThreatname = (e, setFieldValue) => {
      var value = e.target.value;
      setFieldValue("Threatnameid", value);
   };
   
   const handleChangeAssetsTypes = (e, setFieldValue) => {
      var value = e.target.value;
      setFieldValue("Assettypeid", value);
   };

   const handleChangeRisk = (e, setFieldValue) => {
      var value = e.target.value;
      setFieldValue("riskcategoryid", value);
      if (value > 0) {
         getvulnerabilitygroupidlist(value);
         //getControlData(value);
      }
   };
   const handleChangeTab = (e) => {
      //var value = e.target.value;
      setKey(e)
   };


   const DeleteControl =(id)=>{
     AleartMessage.Delete(id, RiskRequest.RiskControlDelete).then((result) => {
      if (result) {
        let params = new URLSearchParams(window.location.search);
        let id1 = params.get("id");
        RiskRequest.RiskControlList(id1);
      }
    });
   }

    /******* Assesment Risk *******/

   const validationSchema6 = yup.object().shape({
      riskcategoryid: yup.string().required("Please select the risk category"),
      
   });

   const calculateAssrisk = (values) => {
     let calRisk = parseInt(values.Assetscore)*parseInt(values.Vulnerabilityscore)*parseInt(values.threatscore)
     *parseInt(values.Likelihoodscore);
     
     values.inheritriskscore= calRisk;
      console.log(values.inheritriskscore)

  }

  




  const CreateUpdateAssesRisk = (values) => {
    console.log(values)
     if (ObjectID) {
        let params = new URLSearchParams(window.location.search);
        let id1 = params.get("id");
         RiskRequest.RiskAssesControl(ObjectID,{
            riskid: parseInt(id1),
            Massetscore: parseInt(values.Massetscore),
            riskcategoryid: parseInt(values.riskcategoryid),
            Vulnerabilitygroupid: parseInt(values.Vulnerabilitygroupid),
            Vulnerabilitynameid: parseInt(values.Vulnerabilitynameid),
            Threatnameid: parseInt(values.Threatnameid),
            Mvulnerabilityscore: parseInt(values.Massetscore),
            Vulnerabilityscore: parseInt(values.Mvulnerabilityscore),
            mthreatscore: parseInt(values.mthreatscore),
            mlikelihoodscore: parseInt(values.mlikelihoodscore),
            residualriskscore : parseInt(values.residualriskscore),
         }).then((result) => {
            console.log(result);
            if (result) {
               handleChangeTab('mitigation')
               //navigate("/policies/policy-list");
            }
         });



         
      }
       
  }

   

   /************end*******************/


   /******* Inherited Risk *******/

   const validationSchema1 = yup.object().shape({
      riskcategoryid: yup.string().required("Please select the risk category"),
      
   });

   const calculateinheritrisk = (values) => {
     let calRisk = parseInt(values.Assetscore)*parseInt(values.Vulnerabilityscore)*parseInt(values.threatscore)
     *parseInt(values.Likelihoodscore);
     
     values.inheritriskscore= calRisk;
      console.log(values.inheritriskscore)

  }

  




  const CreateUpdateInheritRisk = (values) => {
    console.log(values)
     if (ObjectID) {
        let params = new URLSearchParams(window.location.search);
        let id1 = params.get("id");
         RiskRequest.RiskUpdateInherit(ObjectID,{
            riskid: parseInt(id1),
            riskcategoryid: parseInt(values.riskcategoryid),
            Vulnerabilitygroupid: parseInt(values.Vulnerabilitygroupid),
            Vulnerabilitynameid: parseInt(values.Vulnerabilitynameid),
            Threatnameid: parseInt(values.Threatnameid),
            Assetscore: parseInt(values.Assetscore),
            Vulnerabilityscore: parseInt(values.Vulnerabilityscore),
            Threatscore: parseInt(values.threatscore),
            Likelihoodscore: parseInt(values.Likelihoodscore),
            inheritriskscore : parseInt(values.inheritriskscore),
         }).then((result) => {
            console.log(result);
            if (result) {
               handleChangeTab('ApplicableControls')
               //navigate("/policies/policy-list");
            }
         });



         
      }
       
  }

   

   /************end*******************/
    
   /******* Control Applicable *******/

   const validationSchema3 = yup.object().shape({
      
      
   });

  const CreateUpdateControls = (values) => {
    
     if (ObjectID) {
        let params = new URLSearchParams(window.location.search);
        let id1 = params.get("id");
         RiskRequest.RiskUpdateControl(ObjectID,{
            riskid: parseInt(id1),
            controlid:values.controlid1,
            subcontrolid: values.subcontrolid1,
            Details: values.Details1,
            addedby: UserDetails.id,
            createdby: UserDetails.id,
            
         }).then((result) => {
            console.log(result);
            if (result) {
             setTimeout(() => {
                handleClose();
              }, 700);
                RiskRequest.RiskControlList(id1);
               //navigate("/policies/policy-list");
              
            }
         });



         
      }
       
  }

   

   /************end*******************/
   
    
  /******* Mitigation Applicable *******/

   const validationSchema4 = yup.object().shape({
      
      
   });

  const CreateUpdateMitigation = (values) => {
    if (ObjectID) {
        let params = new URLSearchParams(window.location.search);
        let id1 = params.get("id");
         RiskRequest.RiskUpdateMitigation(ObjectID,{
            riskid: parseInt(id1),
            itigationtaskname:values.itigationtaskname1,
            targetdate: moment(values.targetdate1).format('YYYY-MM-DD'),
            assignedto: values.assignedto1,
            taskdetails: values.taskdetails1,
            addedby: UserDetails.id,
            createdby: UserDetails.id,
            
         }).then((result) => {
            console.log(result);
            if (result) {
              setTimeout(() => {
                handleClose1();
              }, 700);
             
              RiskRequest.RiskMitigationList(id1);
            }
         });



         
      }
       
  }

   

   /************end*******************/
   





   //alert(checkededitor);

   /*
    * form validation schema
    */
   const validationSchema = yup.object().shape({
      riskcategoryid: yup.string().required("Please select the risk category"),
      Vulnerabilitygroupid: yup
         .string()
         .required("Please select the Vulnerability group"),
      Vulnerabilitynameid: yup
         .string()
         .required("Please select the Vulnerability name"),
      departmentid: yup.string().required("Please select the departments"),
      Threatnameid: yup.string().required("Please select the Threat name"),
      Assettypeid: yup.string().required("Please select the Asset type"),
      riskowneremail: yup.string().required("Please select the risk owner"),
   });

   /*
    * form methods
    */

   /**
    * Handle the form submission
    */

   const CreateUpdateRisk = (values) => {
      if (ObjectID) {
         RiskRequest.RiskUpdate(ObjectID,{
            riskcategoryid: parseInt(values.riskcategoryid),
            Vulnerabilitygroupid: parseInt(values.Vulnerabilitygroupid),
            Vulnerabilitynameid: parseInt(values.Vulnerabilitynameid),
            departmentid: parseInt(values.departmentid),
            threatdescription: values.threatdescription,
            status: 1,
            Threatnameid: parseInt(values.Threatnameid),
            Assettypeid: parseInt(values.Assettypeid),
            updatedby:1,
            riskowneremail: values.riskowneremail,
         }).then((result) => {
            if (result) {
               handleChangeTab('clauses')
            }
         });
      } else {
         //  PolicyRequest.PolicyUpdate(ObjectID, {
         //   policyname: values.policyname,
         //   primaryassignee: values.primaryassignee,
         //   reccurenceid: values.reccurenceid,
         //   policyrequirements:values.policyrequirements,
         //   ownerid:values.ownerid,
         //   approverid:values.approverid,
         //   departmentsid: values.departmentsid,
         //   frameworkid: values.frameworkid,
         //   cluse: cluse,
         //   control: control,
         //   subclauseid: values.subclauseid,
         //   subcontrolid: values.subcontrolid,
         //   status: values.status,
         //   updatedby:1,
         //  }).then((result) => {
         //   if (result) {
         //     navigate("/policies/policy-list");
         //   }
         // });
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
              </span> Risks 
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

                      activeKey={key}
                      onSelect={(k) => setKey(k)}
                      
                      transition={false}
                      id="noanim-tab-example"
                      className="mb-3"
                    >
      <Tab eventKey="risks" title="RISKS">
   
           <VerticalForm
                                          onSubmit={CreateUpdateRisk}
                                          validationSchema={validationSchema}
                                          defaultValues={RiskDetails}
                                       >

             <Row className="mb-2">
                                             <Form.Group
                                                as={Col}
                                                controlId="formGridState"
                                             >
                                                <label
                                                   style={{
                                                      marginBottom: "5px",
                                                   }}
                                                >
                                                   Risk Category Name
                                                </label>
                                                

                                                <Field>
                                                   {({
                                                      field,
                                                      form: {
                                                         touched,
                                                         errors,
                                                         setFieldValue,
                                                         values,
                                                      },
                                                   }) => (
                                                      <>
                                                         <Field
                                                            as="select"
                                                            name="riskcategoryid"
                                                            className="form-select"
                                                            onChange={(ev) =>
                                                               handleChangeRisk(
                                                                  ev,
                                                                  setFieldValue
                                                               )
                                                            }
                                                         >
                                                            <option>
                                                               (Select a Risk
                                                               Category )
                                                            </option>
                                                            {selectedRiskCat &&
                                                               selectedRiskCat.map(
                                                                  (frame) => {
                                                                     return (
                                                                        <option
                                                                           value={
                                                                              frame.value
                                                                           }
                                                                        >
                                                                           {
                                                                              frame.label
                                                                           }{" "}
                                                                        </option>
                                                                     );
                                                                  }
                                                               )}
                                                         </Field>

                                                         <ErrorMessage name="riskcategoryid" />
                                                      </>
                                                   )}
                                                </Field>
                                             </Form.Group>
                                          </Row>

                                          <Row className="mb-2">
                                             <Form.Group
                                                as={Col}
                                                controlId="formGridState"
                                             >
                                                <label>
                                                   Vulnerability Group Name
                                                </label>
                                                <Field>
                                                   {({
                                                      field,
                                                      form: {
                                                         touched,
                                                         errors,
                                                         setFieldValue,
                                                         values,
                                                      },
                                                   }) => (
                                                      <>
                                                         <Field
                                                            as="select"
                                                            className="form-select"
                                                            name="Vulnerabilitygroupid"
                                                            onChange={(ev) =>
                                                               handleChangeVulnerabilitygroup(
                                                                  ev,
                                                                  setFieldValue
                                                               )
                                                            }
                                                         >
                                                            <option
                                                               disabled
                                                               value=""
                                                            >
                                                               (Select a
                                                               Vulnerability
                                                               Group )
                                                            </option>
                                                            {selectedVulnerabilityGroup &&
                                                               selectedVulnerabilityGroup.map(
                                                                  (frame) => {
                                                                     return (
                                                                        <option
                                                                           value={
                                                                              frame.value
                                                                           }
                                                                        >
                                                                           {
                                                                              frame.label
                                                                           }{" "}
                                                                        </option>
                                                                     );
                                                                  }
                                                               )}
                                                         </Field>

                                                         <ErrorMessage name="Vulnerabilitygroupid" />
                                                      </>
                                                   )}
                                                </Field>
                                             </Form.Group>
                                             <Form.Group
                                                as={Col}
                                                controlId="formGridState222"
                                             >
                                                <label>
                                                   Vulnerability Name
                                                </label>

                                                <Field>
                                                   {({
                                                      field,
                                                      form: {
                                                         touched,
                                                         errors,
                                                         setFieldValue,
                                                         values,
                                                      },
                                                   }) => (
                                                      <>
                                                         <Field
                                                            as="select"
                                                            className="form-select"
                                                            name="Vulnerabilitynameid"
                                                            onChange={(ev) =>
                                                               handleChangeVulnerabilityname(
                                                                  ev,
                                                                  setFieldValue
                                                               )
                                                            }
                                                         >
                                                            <option value="">
                                                               (Select a
                                                               Vulnerability
                                                               name )
                                                            </option>
                                                            {selectedVulnerabilityName &&
                                                               selectedVulnerabilityName.map(
                                                                  (frame) => {
                                                                     return (
                                                                        <option
                                                                           value={
                                                                              frame.value
                                                                           }
                                                                        >
                                                                           {
                                                                              frame.label
                                                                           }{" "}
                                                                        </option>
                                                                     );
                                                                  }
                                                               )}
                                                         </Field>

                                                         <ErrorMessage name="Vulnerabilitynameid" />
                                                      </>
                                                   )}
                                                </Field>

                                                
                                             </Form.Group>
                                          </Row>
                                          <Row className="mb-2">
                                             <Form.Group
                                                as={Col}
                                                controlId="formGridState"
                                             >
                                                <label>Threat Name</label>

                                                <Field>
                                                   {({
                                                      field,
                                                      form: {
                                                         touched,
                                                         errors,
                                                         setFieldValue,
                                                         values,
                                                      },
                                                   }) => (
                                                      <>
                                                         <Field
                                                            as="select"
                                                            className="form-select"
                                                            name="Threatnameid"
                                                            onChange={(ev) =>
                                                               handleChangeThreatname(
                                                                  ev,
                                                                  setFieldValue
                                                               )
                                                            }
                                                         >
                                                            <option
                                                               disabled
                                                               value=""
                                                            >
                                                               (Select a Threat
                                                               name )
                                                            </option>
                                                            {selectedThreatnameid &&
                                                               selectedThreatnameid.map(
                                                                  (frame) => {
                                                                     return (
                                                                        <option
                                                                           value={
                                                                              frame.value
                                                                           }
                                                                        >
                                                                           {
                                                                              frame.label
                                                                           }{" "}
                                                                        </option>
                                                                     );
                                                                  }
                                                               )}
                                                         </Field>

                                                         <ErrorMessage name="Threatnameid" />
                                                      </>
                                                   )}
                                                </Field>
                                               
                                             </Form.Group>
                                             <Form.Group
                                                as={Col}
                                                controlId="formGridState"
                                             >
                                                <label>Assets Type</label>
                                                <Field>
                                                   {({
                                                      field,
                                                      form: {
                                                         touched,
                                                         errors,
                                                         setFieldValue,
                                                         values,
                                                      },
                                                   }) => (
                                                      <>
                                                         <Field
                                                            as="select"
                                                            className="form-select"
                                                            name="Assettypeid"
                                                            onChange={(ev) =>
                                                               handleChangeAssetsTypes(
                                                                  ev,
                                                                  setFieldValue
                                                               )
                                                            }
                                                         >
                                                            <option
                                                               disabled
                                                               value=""
                                                            >
                                                               (Select a Assets
                                                               Type )
                                                            </option>
                                                            <option value="14">
                                                               Others{" "}
                                                            </option>
                                                            }) }
                                                         </Field>

                                                         <ErrorMessage name="Assettypeid" />
                                                      </>
                                                   )}
                                                </Field>
                                             </Form.Group>
                                          </Row>

                                          <Row className="mb-3">
                                             <Form.Group
                                                as={Col}
                                                controlId="formGridState5"
                                             >
                                                <FormInput
                                                   name="departmentid"
                                                   label={t("Departments ")}
                                                   placeholder={t(
                                                      "Select departemnts"
                                                   )}
                                                   containerClass={"mb-3"}
                                                   type="react-single-select"
                                                   options={departmentDropdrown}
                                                   defaultValue={departmentDropdrown?.find(
                                                      (i) =>
                                                         i.value ==
                                                         RiskDetails?.departmentid
                                                   )}
                                                />
                                             </Form.Group>

                                             <Form.Group
                                                as={Col}
                                                controlId="formGridZip"
                                             >
                                                <FormInput
                                                   name="riskowneremail"
                                                   label={t(" Risk Owners ")}
                                                   placeholder={t(
                                                      "Please select risk owner "
                                                   )}
                                                   containerClass={"mb-3"}
                                                   type="react-single-select"
                                                   options={RiskownerDropDown}
                                                   defaultValue={RiskownerDropDown?.find(
                                                      (i) =>
                                                         i.value ==
                                                         RiskDetails?.riskowneremail
                                                   )}
                                                />
                                             </Form.Group>
                                          </Row>

                                          <Row>
                                             <FormInput
                                                name="threatdescription"
                                                label={t(
                                                   "Description  (Optional)"
                                                )}
                                                placeholder={t(
                                                   "Enter Description "
                                                )}
                                                containerClass={"mb-3"}
                                                type="simple-rich-edior"
                                             />
                                          </Row>

                                          <Row className="mt-2">
                                             <Col>
                                                <Button
                                                   type="submit"
                                                   className="btn btn-gradient-primary me-2"
                                                   variant="success"
                                                >
                                                   Update Risk
                                                </Button>
                                             </Col>
                                          </Row>

                                         
      
           </VerticalForm>
         

        </Tab>
       <Tab eventKey="clauses" title="RISK LOG">
       
        
                    <div> RISK LOG </div>
                      
          </Tab>
                      <Tab eventKey="inheritrisk" title="INHERIT RISK RATING" >
                      <VerticalForm

                                    onSubmit={(values) => {
                           
                                          if(BtnClicked =='cal'){
                                             calculateinheritrisk(values)

                                          }else{
                                            CreateUpdateInheritRisk(values);
                                          }
                                       }}
                                      validationSchema={validationSchema1}
                                          defaultValues={RiskDetails}
                                       >
                           <div>
                            
                               <table className="table">
  <thead>
    <tr>
      <th>Category  </th>
      <th>Vulnerability-Group</th>
      <th>Vulnerability Name</th>
      <th>Threat </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td className="font-monospace"><Field>
                                                   {({
                                                      field,
                                                      form: {
                                                         touched,
                                                         errors,
                                                         setFieldValue,
                                                         values,
                                                      },
                                                   }) => (
                                                      <>
                                                         <Field
                                                            as="select"
                                                            name="riskcategoryid"
                                                            className="form-select"
                                                            onChange={(ev) =>
                                                               handleChangeRisk(
                                                                  ev,
                                                                  setFieldValue
                                                               )
                                                            }
                                                         >
                                                            <option>
                                                               (Select a Risk
                                                               Category )
                                                            </option>
                                                            {selectedRiskCat &&
                                                               selectedRiskCat.map(
                                                                  (frame) => {
                                                                     return (
                                                                        <option
                                                                           value={
                                                                              frame.value
                                                                           }
                                                                        >
                                                                           {
                                                                              frame.label
                                                                           }{" "}
                                                                        </option>
                                                                     );
                                                                  }
                                                               )}
                                                         </Field>

                                                         <ErrorMessage name="riskcategoryid" />
                                                      </>
                                                   )}
                                                </Field> </td>
      <td className="font-monospace">
        <div><Field>
                                                   {({
                                                      field,
                                                      form: {
                                                         touched,
                                                         errors,
                                                         setFieldValue,
                                                         values,
                                                      },
                                                   }) => (
                                                      <>
                                                         <Field
                                                            as="select"
                                                            className="form-select"
                                                            name="Vulnerabilitygroupid"
                                                            onChange={(ev) =>
                                                               handleChangeVulnerabilitygroup(
                                                                  ev,
                                                                  setFieldValue
                                                               )
                                                            }
                                                         >
                                                            <option
                                                               disabled
                                                               value=""
                                                            >
                                                               (Select a
                                                               Vulnerability
                                                               Group )
                                                            </option>
                                                            {selectedVulnerabilityGroup &&
                                                               selectedVulnerabilityGroup.map(
                                                                  (frame) => {
                                                                     return (
                                                                        <option
                                                                           value={
                                                                              frame.value
                                                                           }
                                                                        >
                                                                           {
                                                                              frame.label
                                                                           }{" "}
                                                                        </option>
                                                                     );
                                                                  }
                                                               )}
                                                         </Field>

                                                         <ErrorMessage name="Vulnerabilitygroupid" />
                                                      </>
                                                   )}
                                                </Field></div>
      </td>
      <td>
        <Field>
                                                   {({
                                                      field,
                                                      form: {
                                                         touched,
                                                         errors,
                                                         setFieldValue,
                                                         values,
                                                      },
                                                   }) => (
                                                      <>
                                                         <Field
                                                            as="select"
                                                            className="form-select"
                                                            name="Vulnerabilitynameid"
                                                            onChange={(ev) =>
                                                               handleChangeVulnerabilityname(
                                                                  ev,
                                                                  setFieldValue
                                                               )
                                                            }
                                                         >
                                                            <option value="">
                                                               (Select a
                                                               Vulnerability
                                                               name )
                                                            </option>
                                                            {selectedVulnerabilityName &&
                                                               selectedVulnerabilityName.map(
                                                                  (frame) => {
                                                                     return (
                                                                        <option
                                                                           value={
                                                                              frame.value
                                                                           }
                                                                        >
                                                                           {
                                                                              frame.label
                                                                           }{" "}
                                                                        </option>
                                                                     );
                                                                  }
                                                               )}
                                                         </Field>

                                                         <ErrorMessage name="Vulnerabilitynameid" />
                                                      </>
                                                   )}
                                                </Field>
      </td>
      <td>
        <span>
         <Field>
                                                   {({
                                                      field,
                                                      form: {
                                                         touched,
                                                         errors,
                                                         setFieldValue,
                                                         values,
                                                      },
                                                   }) => (
                                                      <>
                                                         <Field
                                                            as="select"
                                                            className="form-select"
                                                            name="Threatnameid"
                                                            onChange={(ev) =>
                                                               handleChangeThreatname(
                                                                  ev,
                                                                  setFieldValue
                                                               )
                                                            }
                                                         >
                                                            <option
                                                               disabled
                                                               value=""
                                                            >
                                                               (Select a Threat
                                                               name )
                                                            </option>
                                                            {selectedThreatnameid &&
                                                               selectedThreatnameid.map(
                                                                  (frame) => {
                                                                     return (
                                                                        <option
                                                                           value={
                                                                              frame.value
                                                                           }
                                                                        >
                                                                           {
                                                                              frame.label
                                                                           }{" "}
                                                                        </option>
                                                                     );
                                                                  }
                                                               )}
                                                         </Field>

                                                         <ErrorMessage name="Threatnameid" />
                                                      </>
                                                   )}
                                                </Field>
        </span>
      </td>
    </tr>
    
  </tbody>
</table>


                           </div>


                      <div>
                     
                        <table class="table table-bordered">
  <thead>
    <tr>
      <th scope="col">Assets Value </th>
      <th scope="col"></th>
      <th scope="col">Vulnerability Score</th>
      <th scope="col"></th>
      <th scope="col">Threat Score</th>
      <th scope="col"></th>
      <th scope="col">Likelihood</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th> <FormInput
            name="Assetscore"
            placeholder={t("Enter Assets Value")}
            type="react-single-select"
                          options={[
                            { value: "1", label: "1" },
                            { value: "2", label: "2" },
                            { value: "3", label: "3" },
                            { value: "4", label: "4" },
                            { value: "5", label: "5" },
                            
                          ]}
                          defaultValue={[
                            { value: "1", label: "1" },
                            { value: "2", label: "2" },
                            { value: "3", label: "3" },
                            { value: "4", label: "4" },
                            { value: "5", label: "5" },
                            
                          ].find((i) => i.value == RiskDetails?.Assetscore)}
            containerClass={"mb-3"}
           />
      </th>
      <td>X</td>
      <td><FormInput
            name="Vulnerabilityscore"
            placeholder={t("Enter Assets Value")}
            type="react-single-select"
                          options={[
                            { value: "1", label: "1" },
                            { value: "2", label: "2" },
                            { value: "3", label: "3" },
                            { value: "4", label: "4" },
                            { value: "5", label: "5" },
                            
                          ]}
                          defaultValue={[
                            { value: "1", label: "1" },
                            { value: "2", label: "2" },
                            { value: "3", label: "3" },
                            { value: "4", label: "4" },
                            { value: "5", label: "5" },
                            
                          ].find((i) => i.value == RiskDetails?.Vulnerabilityscore)}
            containerClass={"mb-3"}
           /></td>
      <td>X</td>
      <td><FormInput
            name="threatscore"
            placeholder={t("Enter Threat Score")}
            type="react-single-select"
                          options={[
                            { value: "1", label: "1" },
                            { value: "2", label: "2" },
                            { value: "3", label: "3" },
                            { value: "4", label: "4" },
                            { value: "5", label: "5" },
                            
                          ]}
                          defaultValue={[
                            { value: "1", label: "1" },
                            { value: "2", label: "2" },
                            { value: "3", label: "3" },
                            { value: "4", label: "4" },
                            { value: "5", label: "5" },
                            
                          ].find((i) => i.value == RiskDetails?.threatscore)}
            containerClass={"mb-3"}
           /></td>
      <td>X</td>
      <td>
     
      <FormInput
            name="Likelihoodscore"
            type="react-single-select"
                          options={[
                            { value: "0.25", label: "0.25" },
                            { value: "0.50", label: "0.50" },
                            { value: "0.75", label: "0.75" },
                            { value: "1", label: "1" },
                            
                          ]}

                          defaultValue={[
                            { value: "0.25", label: "0.25" },
                            { value: "0.50", label: "0.50" },
                            { value: "0.75", label: "0.75" },
                            { value: "1", label: "1" },
                            
                          ].find((i) => i.value == RiskDetails?.Likelihoodscore)}
                         


            placeholder={t("Enter Likelihood")}
            containerClass={"mb-3"}
           />

           </td>
    </tr>
    
  </tbody>
</table>

<div className="row">
    <div className="col-sm-4">
  <FormInput
            name="inheritriskscore"
            label="Calculated Inherit Risk"
            placeholder={t("Calculated Inherit Risk")}
            containerClass={"mb-2"}
           />

           
  </div>

 </div> 
 <div className="col-sm-12 pull-right">
     <div className="input-group-prepend float-end">
     
      
     <Button   ref={inputRef} onClick={(event)=>{
                   setBtnClicked('cal') }}
                                                   type="submit"
                                                   className="btn btn-gradient-primary me-2 pull-right"
                                                   variant="success"
                                                >
                                               Calculate 
                                                </Button>
                                               

     <Button  onClick={(event)=>{
                   setBtnClicked('save') }}
                                                   type="submit"
                                                   className="btn btn-gradient-primary me-2 pull-right"
                                                   variant="success"
                                                >
                                                Save & Continue
                                                </Button>
                                                </div>
  </div>   

 </div> 
</VerticalForm>
                     
</Tab>

                      <Tab eventKey="ApplicableControls" title="RISK ASSESMENTS" >
                        <div>

                         <VerticalForm
                                          onSubmit={CreateUpdateAssesRisk}
                                          validationSchema={validationSchema6}
                                          defaultValues={RiskDetails}
                                       >
                           <div>
                            
                               <table className="table">
  <thead>
    <tr>
      <th>Category  </th>
      <th>Vulnerability-Group</th>
      <th>Vulnerability Name</th>
      <th>Threat </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td className="font-monospace"><Field>
                                                   {({
                                                      field,
                                                      form: {
                                                         touched,
                                                         errors,
                                                         setFieldValue,
                                                         values,
                                                      },
                                                   }) => (
                                                      <>
                                                         <Field
                                                            as="select"
                                                            name="riskcategoryid"
                                                            className="form-select"
                                                            onChange={(ev) =>
                                                               handleChangeRisk(
                                                                  ev,
                                                                  setFieldValue
                                                               )
                                                            }
                                                         >
                                                            <option>
                                                               (Select a Risk
                                                               Category )
                                                            </option>
                                                            {selectedRiskCat &&
                                                               selectedRiskCat.map(
                                                                  (frame) => {
                                                                     return (
                                                                        <option
                                                                           value={
                                                                              frame.value
                                                                           }
                                                                        >
                                                                           {
                                                                              frame.label
                                                                           }{" "}
                                                                        </option>
                                                                     );
                                                                  }
                                                               )}
                                                         </Field>

                                                         <ErrorMessage name="riskcategoryid" />
                                                      </>
                                                   )}
                                                </Field> </td>
      <td className="font-monospace">
        <div><Field>
                                                   {({
                                                      field,
                                                      form: {
                                                         touched,
                                                         errors,
                                                         setFieldValue,
                                                         values,
                                                      },
                                                   }) => (
                                                      <>
                                                         <Field
                                                            as="select"
                                                            className="form-select"
                                                            name="Vulnerabilitygroupid"
                                                            onChange={(ev) =>
                                                               handleChangeVulnerabilitygroup(
                                                                  ev,
                                                                  setFieldValue
                                                               )
                                                            }
                                                         >
                                                            <option
                                                               disabled
                                                               value=""
                                                            >
                                                               (Select a
                                                               Vulnerability
                                                               Group )
                                                            </option>
                                                            {selectedVulnerabilityGroup &&
                                                               selectedVulnerabilityGroup.map(
                                                                  (frame) => {
                                                                     return (
                                                                        <option
                                                                           value={
                                                                              frame.value
                                                                           }
                                                                        >
                                                                           {
                                                                              frame.label
                                                                           }{" "}
                                                                        </option>
                                                                     );
                                                                  }
                                                               )}
                                                         </Field>

                                                         <ErrorMessage name="Vulnerabilitygroupid" />
                                                      </>
                                                   )}
                                                </Field></div>
      </td>
      <td>
        <Field>
                                                   {({
                                                      field,
                                                      form: {
                                                         touched,
                                                         errors,
                                                         setFieldValue,
                                                         values,
                                                      },
                                                   }) => (
                                                      <>
                                                         <Field
                                                            as="select"
                                                            className="form-select"
                                                            name="Vulnerabilitynameid"
                                                            onChange={(ev) =>
                                                               handleChangeVulnerabilityname(
                                                                  ev,
                                                                  setFieldValue
                                                               )
                                                            }
                                                         >
                                                            <option value="">
                                                               (Select a
                                                               Vulnerability
                                                               name )
                                                            </option>
                                                            {selectedVulnerabilityName &&
                                                               selectedVulnerabilityName.map(
                                                                  (frame) => {
                                                                     return (
                                                                        <option
                                                                           value={
                                                                              frame.value
                                                                           }
                                                                        >
                                                                           {
                                                                              frame.label
                                                                           }{" "}
                                                                        </option>
                                                                     );
                                                                  }
                                                               )}
                                                         </Field>

                                                         <ErrorMessage name="Vulnerabilitynameid" />
                                                      </>
                                                   )}
                                                </Field>
      </td>
      <td>
        <span>
         <Field>
                                                   {({
                                                      field,
                                                      form: {
                                                         touched,
                                                         errors,
                                                         setFieldValue,
                                                         values,
                                                      },
                                                   }) => (
                                                      <>
                                                         <Field
                                                            as="select"
                                                            className="form-select"
                                                            name="Threatnameid"
                                                            onChange={(ev) =>
                                                               handleChangeThreatname(
                                                                  ev,
                                                                  setFieldValue
                                                               )
                                                            }
                                                         >
                                                            <option
                                                               disabled
                                                               value=""
                                                            >
                                                               (Select a Threat
                                                               name )
                                                            </option>
                                                            {selectedThreatnameid &&
                                                               selectedThreatnameid.map(
                                                                  (frame) => {
                                                                     return (
                                                                        <option
                                                                           value={
                                                                              frame.value
                                                                           }
                                                                        >
                                                                           {
                                                                              frame.label
                                                                           }{" "}
                                                                        </option>
                                                                     );
                                                                  }
                                                               )}
                                                         </Field>

                                                         <ErrorMessage name="Threatnameid" />
                                                      </>
                                                   )}
                                                </Field>
        </span>
      </td>
    </tr>
    
  </tbody>
</table>


                           </div>


                      <div>
                     
                        <table class="table table-bordered">
  <thead>
    <tr>
      <th scope="col">Assets Value </th>
      <th scope="col"></th>
      <th scope="col">Vulnerability Score</th>
      <th scope="col"></th>
      <th scope="col">Threat Score</th>
      <th scope="col"></th>
      <th scope="col">Likelihood</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th> <FormInput
            name="Massetscore"
            placeholder={t("Enter Assets Value")}
            type="react-single-select"
                          options={[
                            { value: "1", label: "1" },
                            { value: "2", label: "2" },
                            { value: "3", label: "3" },
                            { value: "4", label: "4" },
                            { value: "5", label: "5" },
                            
                          ]}
            containerClass={"mb-3"}
           />
      </th>
      <td>X</td>
      <td><FormInput
            name="Mvulnerabilityscore"
            placeholder={t("Enter Assets Value")}
            type="react-single-select"
                          options={[
                            { value: "1", label: "1" },
                            { value: "2", label: "2" },
                            { value: "3", label: "3" },
                            { value: "4", label: "4" },
                            { value: "5", label: "5" },
                            
                          ]}
            containerClass={"mb-3"}
           /></td>
      <td>X</td>
      <td><FormInput
            name="mthreatscore"
            placeholder={t("Enter Threat Score")}
            type="react-single-select"
                          options={[
                            { value: "1", label: "1" },
                            { value: "2", label: "2" },
                            { value: "3", label: "3" },
                            { value: "4", label: "4" },
                            { value: "5", label: "5" },
                            
                          ]}
            containerClass={"mb-3"}
           /></td>
      <td>X</td>
      <td>
     
      <FormInput
            name="mlikelihoodscore"
            type="react-single-select"
                          options={[
                            { value: "0.25", label: "0.25" },
                            { value: "0.50", label: "0.50" },
                            { value: "0.75", label: "0.75" },
                            { value: "1", label: "1" },
                            
                          ]}
            placeholder={t("Enter Likelihood")}
            containerClass={"mb-3"}
           />

           </td>
    </tr>
    
  </tbody>
</table>

<div className="row">
    <div className="col-sm-4">
  <FormInput
            name="residualriskscore"
            label="Assessed Risk"
            placeholder={t("Calculated Assessed Risk")}
            containerClass={"mb-2"}
           />
  </div>

 </div> 
 <div className="col-sm-12 pull-right">
     <div className="input-group-prepend float-end">
     

     <Button 
                                                   type="submit"
                                                   className="btn btn-gradient-primary me-2 pull-right"
                                                   variant="success"
                                                >
                                                Save & Continue
                                                </Button>
                                                </div>
  </div>   

 </div> 
</VerticalForm>
            
                               
                         </div>
                      </Tab>

                      <Tab eventKey="mitigation" title="APPLICABLE CONTROLS" >
                      
                         <div>
                              
           <table className="table">
  <thead>
    <tr>
      <th>Category  </th>
      <th>Vulnerability-Group</th>
      <th>Vulnerability Name</th>
      <th>Threat </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td className="font-monospace">{RiskDetails.categoryname}
    </td>
      <td className="font-monospace">
        <div>{RiskDetails.VulnerabilitygroupName}
        </div>
      </td>
      <td>
        {RiskDetails.VulnerabilityName}

      </td>
      <td>
        <span>
         {RiskDetails.ThreatName}
        </span>
      </td>
    </tr>
  </tbody>
</table>
<Button variant="primary" onClick={handleShow}>
 Add Control
  </Button>
     
      <Modal show={show} onHide={handleClose} animation={false}>
         
        <Modal.Header closeButton>
          <Modal.Title>Control Applied</Modal.Title>
        </Modal.Header>
       <VerticalForm onSubmit={CreateUpdateControls}
                                          validationSchema={validationSchema3}
                                          defaultValues={RiskDetails}
                                       >
        <Modal.Body>
        
        <div className="row">
          <FormInput
            name="controlid1"
            label="Controls"
            placeholder={t("Enter Control ")}
            containerClass={"mb-3"}
           />
        </div>
      <div className="row">
         <FormInput
            name="subcontrolid1"
            label="Sub Controls"
            placeholder={t("Enter sub Control ")}
            containerClass={"mb-3"}
           />
       </div>
     
      <div className="row">
        <FormInput
            name="Details1"
            label="Description"
            type="textarea"
            placeholder={t("Enter Description ")}
            containerClass={"mb-3"}
           />
       </div>
        </Modal.Body>

        
       
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button  type="submit"
                                                   className="btn btn-gradient-primary me-2 pull-right"
                                                   variant="success"
                                                >
                                                Save & Continue
                                                </Button>
           

        </Modal.Footer>
          </VerticalForm>   
      </Modal>
     


                           </div>


<div>
                      
 <table class="table table-bordered">
  <thead>
    <tr>
      <th scope="col">SNo </th>
      <th scope="col">Control </th>
      <th scope="col">Sub Control</th>
      <th scope="col">Description</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
    {RiskControlLists?.map((record, index) => {
                        return (
                          <tr key={index}>
     <td>{index+1}</td>
     <td>{record?.controlname}</td>
     <td>{record?.subcontrolname}</td>
     <td>{record?.Details}</td>
    
      <td>
            <button type="button" onClick={() => DeleteControl(record?.riskid)} className="btn btn-primary">Remove</button>
      </td>
      
    </tr>
     );
                      })}
  </tbody>
</table>
    

 </div>
                
                      </Tab>


                      <Tab eventKey="riskassesments" title="MITIGATION TASKS" >
                         <div>
                               <table className="table">
  <thead>
    <tr>
      <th>Category  </th>
      <th>Vulnerability-Group</th>
      <th>Vulnerability Name</th>
      <th>Threat </th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td className="font-monospace">{RiskDetails.categoryname}
    </td>
      <td className="font-monospace">
        <div>{RiskDetails.VulnerabilitygroupName}
        </div>
      </td>
      <td>
        {RiskDetails.VulnerabilityName}

      </td>
      <td>
        <span>
         {RiskDetails.ThreatName}
        </span>
      </td>
    </tr>
    
  </tbody>
</table>


                           </div>


                      <div>


                      <Button variant="primary" onClick={handleShow1}>
Mitigation Task
  </Button>
     
      <Modal show={show1} onHide={handleClose1} animation={false}>
         
        <Modal.Header closeButton>
          <Modal.Title>Mitigation Task</Modal.Title>
        </Modal.Header>
       <VerticalForm onSubmit={CreateUpdateMitigation}
                                          validationSchema={validationSchema4}
                                          defaultValues={RiskDetails}
                                       >
        <Modal.Body>
        
        <div className="row">
          <FormInput
            name="itigationtaskname1"
            label="Task Name"
            placeholder={t("Enter Task name  ")}
            containerClass={"mb-3"}
           />
        </div>
      <div className="row">
         <FormInput
            name="targetdate1"
            type="date"
            label="Target date"
            placeholder={t("Target date ")}
            containerClass={"mb-3"}
           />
       </div>

       <div className="row">
         <FormInput
            name="assignedto1"
            label="Assinged to"
            placeholder={t("Assinged to ")}
            containerClass={"mb-3"}
                                                   type="react-single-select"
                                                   options={RiskownerDropDown}
                                                   
           />
       </div>
     
      <div className="row">
        <FormInput
            name="taskdetails1"
            label="Description"
            type="textarea"
            placeholder={t("Enter Description ")}
            containerClass={"mb-3"}
           />
       </div>
        </Modal.Body>
        
        
        <Modal.Footer>
        
          <Button variant="secondary" onClick={handleClose1}>
            Close
          </Button>
          <Button
                                                   type="submit"
                                                   className="btn btn-gradient-primary me-2 pull-right"
                                                   variant="success"
                                                >
                                                Save
                                                </Button>
           

        </Modal.Footer>
        </VerticalForm>
            
      </Modal>
     

                      
 </div>
                      
       <div>
                      
 <table class="table table-bordered">
  <thead>
    <tr>
      <th scope="col">SNo </th>
      <th scope="col">Task Name  </th>
      <th scope="col">Target date</th>
      <th scope="col">Assigned to</th>
      <th scope="col">Description</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
    {RiskMitigationLists?.map((record, index) => {
                        return (
                          <tr key={index}>
     <td>{index+1}</td>
     <td>{record?.itigationtaskname}</td>
     <td>{DateFormatter(record?.targetdate)}</td>
     <td>{record?.assignedto  }</td>

     <td>{record?.taskdetails}</td>
    
      <td>
            <button type="button" className="btn btn-primary">Remove</button>
      </td>
      
    </tr>
     );
                      })}
  </tbody>
</table>
    

 </div>


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

export default RiskCreateUpdatePageTab;
