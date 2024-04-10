//External Lib Import
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
import { FormInput } from "../../components/Ui";
import { VerticalForm } from "../../components/Ui";
import SubcontrolRequest from "../../APIRequest/SubcontrolRequest";
import ClauseRequest from "../../APIRequest/ClauseRequest";

const SubcontrolCreateUpdatePage = () => {
  let [ObjectID, SetObjectID] = useState(0);
  const { t } = useTranslation();
  const { SubcontrolDetails,SubcontrolDropDown } = useSelector((state) => state.Subcontrol);
  const { FrameworkDropDown } = useSelector((state) => state.Clause);
  const { UserDetails } = useSelector(
    (state) => state.User,
  );

 
  let [selectedControl, setselectedControl] = useState([]);
  let [selectedSubcontrolData, setselectedSubcontrolData] = useState([]);

  const navigate = useNavigate();

  var clauseData =[];

  useEffect(() => {
    ClauseRequest.FrameworkDropDown();
    SubcontrolRequest.SubcontrolDropDown();

   
    
   // ClauseRequest.FrameworkDropDown();
    let params = new URLSearchParams(window.location.search);
    
  
    let id = params.get("id");
    if (id !== null) {
      
      SubcontrolRequest.SubcontrolDetails(id);
      getSubcontrolData(id);
      if(SubcontrolDetails.frameworkid > 0) {
        getControlData(SubcontrolDetails.frameworkid);
      }
      
      
      SetObjectID(id);
    }
  }, []);

  
  const handleChangeClause =(e, setFieldValue)=>{
    var value = e.target.value;
    setFieldValue('control_id', value)
   // getSubcontrolData(value);
     
 }


 const getSubcontrolData = async (id) => {
      
  const API_URL =process.env.REACT_APP_API_URL+"/api/user/";
  const catUrl = `${API_URL}subcontroldetails`;
  const data = await Axios.post(catUrl,{"data":{"id":id}});
  if (data) {
     var response = data.data.data[0];
     console.log(response)
     getControlData(response.frameworkid);
  }
}


 
const handleChangeframework = (e, setFieldValue) => {
    var value = e.target.value;
    setFieldValue('frameworkid', value)
    if(value > 0){
     getControlData(value);
    }
  }
  /*
   * form validation schema
   */
  const validationSchema = yup.object().shape({
    name: yup.string().required("Please Enter Subcontrol Id"),
    control_id: yup.string().required("Please Enter clause Id"),
    frameworkid: yup.string().required("Please Enter Framework Id"),
    
  })

  const getControlData = async (id) => {
       if(id > 0 ){
       const API_URL =process.env.REACT_APP_API_URL+"/api/user/";
       const catUrl = `${API_URL}controlist`;
       const response = await Axios.post(catUrl,{"data":{"frameworkid":id}});
       if(response.data.data.length > 0) {
        setselectedControl(response.data.data);
       }else{
        setselectedControl([]);
       }
     }
       
      
      
  }
  /*
   * form methods
   */

  /**
   * Handle the form submission
   */
  const CreateUpdateSubcontrol = (values) => {
    console.log(values)
    if (!ObjectID) {
      SubcontrolRequest.SubcontrolCreate({
        name: values.name,
        frameworkid: parseInt(values.frameworkid),
        control_id: parseInt(values.control_id),
        status: values.status==true?1:0,
        createdby:UserDetails.id
      }).then((result) => {
        console.log(result);
        if (result) {
          navigate("/subcontrol/subcontrol-list");
        }
      });
    } else {
      SubcontrolRequest.SubcontrolUpdate(ObjectID, {
        name: values.name,
        frameworkid: parseInt(values.frameworkid),
        control_id: parseInt(values.control_id),
        status: values.status==true?1:0,
        updatedby:UserDetails.id
      }).then((result) => {
        if (result) {
          navigate("/subcontrol/subcontrol-list");
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
              </span> Subcontrol  Add/Edit 
            </h3>
            <nav aria-label="breadcrumb">
              <ul className="breadcrumb">
                <li className="breadcrumb-item active" aria-current="page">
                  <span />
                  <PageTitle
        breadCrumbItems={[
          { label: "Subcontrol", path: "/Subcontrol/Subcontrol-list" },
          {
            label: !ObjectID ? "Create Subcontrol" : "Update Subcontrol",
            path: "/Subcontrol/Subcontrol-list",
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
                    onSubmit={CreateUpdateSubcontrol}
                    validationSchema={validationSchema}
                    defaultValues={SubcontrolDetails}
                  >
                    <Row>
                      <Col>
                    <Form.Group as={Col} controlId="formGridState">
                      <label style={{marginBottom:"5px"}}>Framework</label> 
                      <Field>
                      {({ field, form: { touched, errors,setFieldValue, values } }) => (
                      <>
                  
                     <Field as="select" name="frameworkid" className="form-select" onChange={ev => handleChangeframework(ev, setFieldValue)} >
                        <option disabled value="">(Select a framework )</option>
                        {FrameworkDropDown && FrameworkDropDown.map(frame => {
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

                  
                  <Form.Group as={Col}  style={{marginBottom:"10px"}} controlId="formGridState">
                    <label style={{marginBottom:"5px"}}>Control</label>
                     <Field>
                 {({ field, form: { touched, errors,setFieldValue, values } }) => (
                 <>

                 <Field as="select" className="form-select"  name="control_id" onChange={ev => handleChangeClause(ev, setFieldValue)} >
                        <option disabled value="">(Select a control )</option>
                        {selectedControl && selectedControl.map(frame => {
                            return (
                                    <option value={frame.value}>{frame.label} </option>
                              )
                            
                        }) }
                    </Field>
              

              <ErrorMessage name="control_id" />
            </>
          )}
        </Field>
                  
                    
        </Form.Group>
                        
                        <FormInput
                          name="name"
                          label={t("Subcontrol Name")}
                          placeholder={t("Enter Subcontrol Name")}
                          containerClass={"mb-3"}
                        />

                        {/* <FormInput
                          name="frameworkid"
                          label={t("Framework Id")}
                          placeholder={t("Enter Framework ")}
                          containerClass={"mb-3"}
                          type="react-single-select"
                          options={FrameworkDropDown}
                          defaultValue={FrameworkDropDown.find(
                            (i) => i.value === SubcontrolDetails?.frameworkid,
                          )}
                        /> */}

                      <FormInput
                          name="status"
                          label={t("Subcontrol Status")}
                          placeholder={t("Enter Subcontrol Status")}
                          containerClass={"mb-3"}
                          type="checkbox"
                        />
                      </Col>
                    </Row>

                    <Row className="mt-2">
                      <Col>
                        <Button type="submit" className="btn btn-gradient-primary me-2"  variant="success">
                          {!ObjectID ? "Add Subcontrol" : "Update Subcontrol"}
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
export default SubcontrolCreateUpdatePage;
