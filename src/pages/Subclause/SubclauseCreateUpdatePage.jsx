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
import SubclauseRequest from "../../APIRequest/SubclauseRequest";
import ClauseRequest from "../../APIRequest/ClauseRequest";

const SubclauseCreateUpdatePage = () => {
  let [ObjectID, SetObjectID] = useState(0);
  const { t } = useTranslation();
  const { SubclauseDetails,SubclauseDropDown } = useSelector((state) => state.Subclause);
  const { FrameworkDropDown } = useSelector((state) => state.Clause);
  const { UserDetails } = useSelector(
    (state) => state.User,
  );

 
  let [selectedClause, setselectedClause] = useState([]);
  let [selectedSubClauseData, setselectedSubClauseData] = useState([]);

  const navigate = useNavigate();

  var clauseData =[];

  useEffect(() => {
    ClauseRequest.FrameworkDropDown();
    SubclauseRequest.SubclauseDropDown();

   
    
   // ClauseRequest.FrameworkDropDown();
    let params = new URLSearchParams(window.location.search);
    
  
    let id = params.get("id");
    if (id !== null) {
      
      SubclauseRequest.SubclauseDetails(id);
      getSubClauseData(id);
      if(SubclauseDetails.standard_id > 0) {
        getClauseData(SubclauseDetails.standard_id);
      }
      
      
      SetObjectID(id);
    }
  }, []);

  
  const handleChangeClause =(e, setFieldValue)=>{
    var value = e.target.value;
    setFieldValue('clause_id', value)
   // getSubClauseData(value);
     
 }


 const getSubClauseData = async (id) => {
      
  const API_URL =process.env.REACT_APP_API_URL+"/api/user/";
  const catUrl = `${API_URL}subclusedetails`;
  const data = await Axios.post(catUrl,{"data":{"id":id}});
  if (data) {
     var response = data.data.data[0];
     console.log(response)
     getClauseData(response.standard_id);
  }
}


 
const handleChangeframework = (e, setFieldValue) => {
    var value = e.target.value;
    setFieldValue('standard_id', value)
    if(value > 0){
      getClauseData(value);
      //getControlData(value);
    }
  }
  /*
   * form validation schema
   */
  const validationSchema = yup.object().shape({
    sabclause: yup.string().required("Please Enter Subclause Id"),
    clause_id: yup.string().required("Please Enter clause Id"),
    standard_id: yup.string().required("Please Enter Framework Id"),
    
  })

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
  /*
   * form methods
   */

  /**
   * Handle the form submission
   */
  const CreateUpdateSubclause = (values) => {
    console.log(values)
    if (!ObjectID) {
      SubclauseRequest.SubclauseCreate({
        sabclause: values.sabclause,
        standard_id: parseInt(values.standard_id),
        clause_id: parseInt(values.clause_id),
        status: values.status==true?1:0,
        createdby:UserDetails.id
      }).then((result) => {
        console.log(result);
        if (result) {
          navigate("/subclause/subclause-list");
        }
      });
    } else {
      SubclauseRequest.SubclauseUpdate(ObjectID, {
        sabclause: values.sabclause,
        standard_id: parseInt(values.standard_id),
        clause_id: parseInt(values.clause_id),
        status: values.status==true?1:0,
        updatedby:UserDetails.id
      }).then((result) => {
        if (result) {
          navigate("/subclause/subclause-list");
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
              </span> Subclause  Add/Edit 
            </h3>
            <nav aria-label="breadcrumb">
              <ul className="breadcrumb">
                <li className="breadcrumb-item active" aria-current="page">
                  <span />
                  <PageTitle
        breadCrumbItems={[
          { label: "Subclause", path: "/Subclause/Subclause-list" },
          {
            label: !ObjectID ? "Create Subclause" : "Update Subclause",
            path: "/Subclause/Subclause-list",
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
                    onSubmit={CreateUpdateSubclause}
                    validationSchema={validationSchema}
                    defaultValues={SubclauseDetails}
                  >
                    <Row>
                      <Col>
                    <Form.Group as={Col} controlId="formGridState">
                      <label style={{marginBottom:"5px"}}>Framework</label> 
                      <Field>
                      {({ field, form: { touched, errors,setFieldValue, values } }) => (
                      <>
                  
                     <Field as="select" name="standard_id" className="form-select" onChange={ev => handleChangeframework(ev, setFieldValue)} >
                        <option disabled value="0">(Select a framework )</option>
                        {FrameworkDropDown && FrameworkDropDown.map(frame => {
                            return (
                                    <option value={frame.value}>{frame.label} </option>
                              )
                            
                        }) }
                    </Field>
                    <ErrorMessage name="standard_id" />
                   </>
                      )}
                    
                  </Field>
                  </Form.Group>

                  
                  <Form.Group as={Col}  style={{marginBottom:"10px"}} controlId="formGridState">
                    <label style={{marginBottom:"5px"}}>CLAUSES</label>
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
                        
                        <FormInput
                          name="sabclause"
                          label={t("Subclause Id")}
                          placeholder={t("Enter Subclause Name")}
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
                            (i) => i.value === SubclauseDetails?.frameworkid,
                          )}
                        /> */}

                      <FormInput
                          name="status"
                          label={t("Subclause Status")}
                          placeholder={t("Enter Subclause Status")}
                          containerClass={"mb-3"}
                          type="checkbox"
                        />
                      </Col>
                    </Row>

                    <Row className="mt-2">
                      <Col>
                        <Button type="submit" className="btn btn-gradient-primary me-2"  variant="success">
                          {!ObjectID ? "Add Subclause" : "Update Subclause"}
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
export default SubclauseCreateUpdatePage;
