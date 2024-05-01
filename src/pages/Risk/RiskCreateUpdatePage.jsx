//External Lib Import
import { useSelector } from "react-redux";
import { React, useEffect, useState } from "react";
//import React from "react";
import { Row, Col, Card, Button, Form } from "react-bootstrap";

import Select from "react-select";

import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { ErrorMessage, Field } from "formik";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Axios from "axios";

//Internal Lib Import
import PageTitle from "../../components/Ui/PageTitle";
import { Link } from "react-router-dom";
import { FormInput } from "../../components/Ui";
import { VerticalForm } from "../../components/Ui";

import FormInput1 from "../../components/Ui/FormInput";
import { defaultAvatarImg } from "../../helpers/Default";
import PolicyRequest from "../../APIRequest/PolicyRequest";
import RiskRequest from "../../APIRequest/RiskRequest";

const RiskCreateUpdatePage = (props) => {
   let [ObjectID, SetObjectID] = useState(0);

   const { t } = useTranslation();

   var { departmentDropdrown,reccurenceDropdrown,PolicyDetails } = useSelector((state) => state.Policy);
   const { RiskDetails,RiskownerDropDown } = useSelector((state) => state.Risk);

   let [selectedRiskCat, setselectedRiskCat] = useState([]);
   let [RiskCatId, setRiskCatId] = useState(0);
   let [selectedVulnerabilityGroup, setselectedVulnerabilityGroup] = useState(
      []
   );
   let [selectedVulnerabilityName, setselectedVulnerabilityName] = useState([]);
   let [selectedVulnerabilityGroupId, setselectedVulnerabilityGroupId] =
      useState(0);
   let [selectedThreatnameid, setselectedThreatnameid] = useState([]);

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
      PolicyRequest.departmentDropdrown();
      RiskRequest.RiskownerDropDown();
      getRiskCatData();
      //PolicyRequest.clauseDropdrown();
      //PolicyRequest.subclauseDropdrown();

      let params = new URLSearchParams(window.location.search);
      let id = params.get("id");

      if (id !== null) {
         //PolicyRequest.PolicyDetails(id);
         SetObjectID(id);
         // getPolicyData(id);
         // PolicyRequest.ownerDropdrown();
         // if(PolicyDetails.frameworkid!==null){
         //   handleChange(PolicyDetails.frameworkid)
         // }
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

   const getvulnerabilitygroupidlist = async (id) => {
      // setFieldValue('frameworkid', e.target.value);

      const API_URL = process.env.REACT_APP_API_URL + "/api/user/";
      const catUrl = `${API_URL}vulnerabilitygroupidlist`;
      const response = await Axios.post(catUrl, {
         data: { riskcategoryid: id },
      });
      if (response.data.data.length > 0) {
         setselectedVulnerabilityGroup(response.data.data);
         setRiskCatId(id);
      } else {
         setselectedVulnerabilityGroup([]);
         setRiskCatId(0);
      }
   };

   const getvulnerabilitynamelist = async (id) => {
      // setFieldValue('frameworkid', e.target.value);
      var riskcategoryid = 0;
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
      } else {
         setselectedVulnerabilityName([]);
         setselectedVulnerabilityGroupId(0);
      }
   };

   const getthreatnameidlist = async (id) => {
      // setFieldValue('frameworkid', e.target.value);
      var riskcategoryid = 0;
      if (RiskCatId > 0) {
         riskcategoryid = RiskCatId;
      }

      const API_URL = process.env.REACT_APP_API_URL + "/api/user/";
      const catUrl = `${API_URL}threatnameidlist`;
      const response = await Axios.post(catUrl, {
         data: {
            Riskcategoryid: riskcategoryid,
            Vulnerabilitygroupid: selectedVulnerabilityGroupId,
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
      if (!ObjectID) {
         RiskRequest.RiskCreate({
            riskcategoryid: parseInt(values.riskcategoryid),
            Vulnerabilitygroupid: parseInt(values.Vulnerabilitygroupid),
            Vulnerabilitynameid: parseInt(values.Vulnerabilitynameid),
            departmentid: parseInt(values.departmentid),
            threatdescription: values.threatdescription,
            status: 1,
            Threatnameid: parseInt(values.Threatnameid),
            Assettypeid: parseInt(values.Assettypeid),
            createdby:1,
            riskowneremail: values.riskowneremail,
         }).then((result) => {
            console.log(result);
            if (result) {
               navigate("/risk/risk-create-update-tab?id="+result);
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
         <div
            className="main-panel"
            style={{ width: "80%", marginTop: "46px", minHeight: "681px;" }}
         >
            <div className="content-wrapper">
               <div className="page-header">
                  <h3 className="page-title">
                     <span className="page-title-icon bg-gradient-primary text-white me-2">
                        <i className="mdi mdi-account-plus" />
                     </span>{" "}
                     Risks
                  </h3>

                  <nav aria-label="breadcrumb">
                     <ul className="breadcrumb">
                        <li
                           className="breadcrumb-item active"
                           aria-current="page"
                        >
                           <span />
                           <PageTitle
                              breadCrumbItems={[
                                 { label: "Policies", path: "/risk/risk-list" },
                                 {
                                    label: !ObjectID
                                       ? "Create Risk"
                                       : "Update Risk",
                                    path: "/risk/risk-create-update",
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
                                                         PolicyDetails?.departmentsid
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
                                                   // defaultValue={RiskownerDropDown?.find(
                                                   //    (i) =>
                                                   //       i.value ==
                                                   //       PolicyDetails?.reccurenceid
                                                   // )}
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
                                                   Create Risk
                                                </Button>
                                             </Col>
                                          </Row>
                                       </VerticalForm>
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

export default RiskCreateUpdatePage;
