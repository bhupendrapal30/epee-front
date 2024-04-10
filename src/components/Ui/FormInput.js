//External Lib Import
import React, { useEffect, useState,useRef } from "react";
import { Form, InputGroup } from "react-bootstrap";
import classNames from "classnames";
import { ErrorMessage, Field } from "formik";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Select from "react-select";
import ReactCodeInput from "react-code-input";

//Internal Lib Import
import FileUploader from "./FileUploader";
import ResizeFile from "../../utils/ResizeFile";
import HyperDatepicker from "../../components/Ui/Datepicker";
import Axios from 'axios';

import JoditEditor from 'jodit-react';





const FormInput = ({
  label,
  type,
  name,
  placeholder,
  className,
  labelClassName,
  containerClass,
  children,
  onChange,
  defaultValue,
  options,
  sendDataToParent
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [defaultValueSelect, setDefaultValueSelect] = useState(defaultValue);


  const editor = useRef(null);
  const [Contenteditor, setContenteditor] = useState('');
  const configeditor = '';

  const [data, setData] = useState("");

  


 
  const FileHandleChange = async (e, setFieldValue) => {
    setFieldValue(name, await ResizeFile(e.target?.files?.[0]));
    onChange(await ResizeFile(e.target?.files?.[0]));
  };


 const  handleFileUpload = (event,setFieldValue) => {
  let reader = new FileReader();
  let file = event.target.files[0];
  setFieldValue(name, reader.result);

reader.readAsDataURL(file);

console.log(reader.readAsDataURL(file));
}


  

  const handleFileRead = async (event,setFieldValue) => {
    const file = event.target?.files?.[0]
    //const base64 = await convertBase64(file);
    if (file) {
      const base64 = await convertBase64(file);
      localStorage.setItem('filename', base64);
    }
    
       
  }

const handleChange2 = (name, val, setFieldValue) => {
  
  var value = val;
  setFieldValue(name, val)
  if(name=='frameworkid'){
    alert(val)
    getClauseData(val)
  }
  
  
}


const getClauseData = async (id) => {
    
     // setFieldValue('frameworkid', e.target.value);
       localStorage.removeItem('fData');
       const API_URL =process.env.REACT_APP_API_URL+"/api/user/";
       const catUrl = `${API_URL}clauselist`;
       const response = await Axios.post(catUrl,{"data":{"frameworkid":id}});
       if(response.data.data.length > 0) {
        console.log(response.data.data);
        localStorage.setItem('fData',JSON.stringify(response.data.data));
        
       }else{
        //setselectedClause([]);
       }
       
      
      
  }

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file)
      fileReader.onload = () => {

        resolve(fileReader.result);
      }
      fileReader.onerror = (error) => {
        reject(error);
      }
    })
  }

  useEffect(() => {
    setDefaultValueSelect(defaultValue);
  }, [defaultValue]);

  const ReactSelect = () => {

  if (type === "react-single-select") {

   return (
       
      <Form.Group className={containerClass} controlId={name}>
        {label ? (
          <Form.Label className={labelClassName} >{label}</Form.Label>
        ) : null}
    

        <Field>
          {({ field, form: { touched, errors, setFieldValue, values } }) => (
            <>
              <Select
                className="react-select"
                classNamePrefix="react-select"
                options={options}
                onChange={(option) => setFieldValue(name, option.value)}
                defaultValue={defaultValueSelect}
              />

              <ErrorMessage name={name}>
                {(msg) => (
                  <Form.Control.Feedback
                    type="invalid"
                    style={{ display: "block" }}
                  >
                    {msg}
                  </Form.Control.Feedback>
                )}
              </ErrorMessage>
            </>
          )}
        </Field>
      </Form.Group>
    );
  }
  

};

  const ReactSelect2 = () => {
    return (
      <Form.Group className={containerClass} controlId={name}>
        {label ? (
          <Form.Label className={labelClassName}>{label}</Form.Label>
        ) : null}
        <Field>
          {({ field, form: { touched, errors, setFieldValue, values } }) => (
            <>
              <Select
                className="react-select"
                classNamePrefix="react-select"
                options={options}
                defaultValue={defaultValueSelect}
                onChange={(option) =>
                  setFieldValue(
                    name,
                    option.map((i) => i.value),
                  )
                }
                isMulti={true}
              />

              <ErrorMessage name={name}>
                {(msg) => (
                  <Form.Control.Feedback
                    type="invalid"
                    style={{ display: "block" }}
                  >
                    {msg}
                  </Form.Control.Feedback>
                )}
              </ErrorMessage>
            </>
          )}
        </Field>
      </Form.Group>
    );
  };

 const ReactSelect1 = () => {
 if (type === "react-single-select1") {
  
   return (
  <Form.Group className={containerClass} controlId={name}>
        {label ? (
          <Form.Label className={labelClassName} >{label}</Form.Label>
        ) : null}
        <Field>
          {({ field, form: { touched, errors, setFieldValue, values } }) => (
            <>
              <Select
                className="react-select"
                classNamePrefix="react-select"
                options={options}
                onChange={option => handleChange2(name,option.value, setFieldValue)}
                defaultValue={defaultValueSelect}
              />

              <ErrorMessage name={name}>
                {(msg) => (
                  <Form.Control.Feedback
                    type="invalid"
                    style={{ display: "block" }}
                  >
                    {msg}
                  </Form.Control.Feedback>
                )}
              </ErrorMessage>
            </>
          )}
        </Field>
      </Form.Group>
      )
    }
  };


    
  if (type === "password") {
    return (
      <Form.Group className={containerClass} controlId={name}>
        {label ? (
          <>
            <Form.Label className={labelClassName}>{label}</Form.Label>
            {children}
          </>
        ) : null}

        <Field name={name}>
          {({ field, form: { touched, errors } }) => (
            <>
              <InputGroup>
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  placeholder={placeholder}
                  className={className}
                  isInvalid={touched[name] && errors[name] ? true : false}
                  {...field}
                  autoComplete={name}
                />
                <div
                  className={classNames(
                    "input-group-text",
                    "input-group-password",
                    {
                      "show-password": showPassword,
                    },
                  )}
                  data-password={showPassword ? "true" : "false"}
                >
                  <span
                    className="password-eye"
                    onClick={() => {
                      setShowPassword(!showPassword);
                    }}
                  ></span>
                </div>
              </InputGroup>

              <ErrorMessage name={name}>
                {(msg) => (
                  <Form.Control.Feedback
                    type="invalid"
                    style={{ display: "block" }}
                  >
                    {msg}
                  </Form.Control.Feedback>
                )}
              </ErrorMessage>
            </>
          )}
        </Field>
      </Form.Group>
    );
  } else if (type === "checkbox") {

    return (
      <Form.Group className={containerClass} controlId={name}>
        <Field name={name}>
          {({ field, form: { touched, errors, values } }) => (
            <>
              <Form.Check
                type={type}
                label={label}
                className={className}
                isInvalid={errors && errors[name] ? true : false}
                {...field}
                checked={values?.[name]}
              />

              <ErrorMessage name={name}>
                {(msg) => (
                  <Form.Control.Feedback type="invalid">
                    {msg}
                  </Form.Control.Feedback>
                )}
              </ErrorMessage>
            </>
          )}
        </Field>
      </Form.Group>
    );
  }  else if (type === "radio") {
    
    return (
      <Form.Group className={containerClass} controlId={name}>
        <Field name={name}>
          {({ field, form: { touched, errors, values } }) => (
            <>
              <Form.Check
                type={type}
                label={label}
                {...field}
                checked={values?.[name]}
              />

              <ErrorMessage name={name}>
                {(msg) => (
                  <Form.Control.Feedback type="invalid">
                    {msg}
                  </Form.Control.Feedback>
                )}
              </ErrorMessage>
            </>
          )}
        </Field>
      </Form.Group>
    );
  } else if (type === "code-input") {
    return (
      <Form.Group className={containerClass} controlId={name}>
        <Field name={name}>
          {({ field, form: { touched, errors, values, setFieldValue } }) => (
            <>
              <ReactCodeInput
                type="string"
                fields={6}
                // value={defaultValue}
                onChange={(code) => setFieldValue(name, code)}
              />

              <ErrorMessage name={name}>
                {(msg) => (
                  <Form.Control.Feedback type="invalid">
                    {msg}
                  </Form.Control.Feedback>
                )}
              </ErrorMessage>
            </>
          )}
        </Field>
      </Form.Group>
    );
  } else if (type === "react-phone") {
    return (
      <Form.Group className={containerClass} controlId={name}>
        {label ? (
          <Form.Label className={labelClassName}>{label}</Form.Label>
        ) : null}
        <Field name={name}>
          {({ field, form: { touched, errors, setFieldValue, values } }) => (
            <>
              <PhoneInput
                value={defaultValue}
                onChange={(phone) => setFieldValue(name, phone)}
                className={className}
                isInvalid={errors && errors[name] ? true : false}
              />

              <ErrorMessage name={name}>
                {(msg) => (
                  <Form.Control.Feedback
                    type="invalid"
                    style={{ display: "block" }}
                  >
                    {msg}
                  </Form.Control.Feedback>
                )}
              </ErrorMessage>
            </>
          )}
        </Field>
      </Form.Group>
    );
  } else if (type === "simple-rich-edior") {
    return (
    
      <Form.Group className={containerClass} controlId={name}>
        {label ? (
          <Form.Label className={labelClassName}>{label}</Form.Label>
        ) : null}
        <Field>
          {({ field, form: { touched, errors, setFieldValue, values } }) => (
            <>
              

               <JoditEditor
      ref={editor}
      value={values?.[name]}
      config={configeditor}
      tabIndex={1} // tabIndex of textarea
      onBlur={newContent => setContenteditor(newContent)} // preferred to use only this option to update the content for performance reasons
      onChange={(text) => setFieldValue(name, text)}
    />

              <ErrorMessage name={name}>
                {(msg) => (
                  <Form.Control.Feedback
                    type="invalid"
                    style={{ display: "block" }}
                  >
                    {msg}
                  </Form.Control.Feedback>
                )}
              </ErrorMessage>
            </>
          )}
        </Field>
      </Form.Group>
    );
  } else if (type === "react-single-select") {
    return <ReactSelect />;
  }else if (type === "react-single-select1") {
     return <ReactSelect1 />;
  }
  
  
  else if (type === "react-multiple-select") {
    return <ReactSelect2 />;
  } else if (type === "dropzone") {
    return (
      <Form.Group className={containerClass} controlId={name}>
        <Field name={name}>
          {({ field, form: { touched, errors, setFieldValue, values } }) => (
            <>
              <Form.Group className="mb-3 mt-3 mt-xl-0">
                {label ? (
                  <Form.Label className={labelClassName}>{label}</Form.Label>
                ) : null}
                <p className="text-muted font-14">
                  Recommended thumbnail size 800x400 (px).
                </p>
                <FileUploader
                  onFileUpload={(files) => setFieldValue(name, files)}
                />
              </Form.Group>

              <ErrorMessage name={name}>
                {(msg) => (
                  <Form.Control.Feedback
                    type="invalid"
                    style={{ display: "block" }}
                  >
                    {msg}
                  </Form.Control.Feedback>
                )}
              </ErrorMessage>
            </>
          )}
        </Field>
      </Form.Group>
    );
  } else if (type === "file") {
    return (
      <Form.Group className={containerClass} controlId={name}>
        <Field name={name}>
          {({ field, form: { touched, errors, setFieldValue, values } }) => (
            <>
              <Form.Group className="mb-3 mt-3 mt-xl-0">
                {label ? (
                  <Form.Label className={labelClassName}>{label}</Form.Label>
                ) : null}
                
                <Form.Control
                  type={type}
                  inputProps={{ accept: '.pdf, .pptx, .pptm, .ppt' }}
                  placeholder={placeholder}
                  className={className}
                  accept="application/pdf"
                  isInvalid={touched[name] && errors[name] ? true : false}
                  onChange={(e) => {
                  const fileReader = new FileReader();
                  fileReader.onload = () => {
                    if (fileReader.readyState === 2) {
                      setFieldValue(name, fileReader.result);
                      
                    }
                  };
                  fileReader.readAsDataURL(e.target.files[0]);
                }}
           
                />
              </Form.Group>

              <ErrorMessage name={name}>
                {(msg) => (
                  <Form.Control.Feedback
                    type="invalid"
                    style={{ display: "block" }}
                  >
                    {msg}
                  </Form.Control.Feedback>
                )}
              </ErrorMessage>
            </>
          )}
        </Field>
      </Form.Group>
    );
  } else if (type === "textarea") {
    return (
      <Form.Group className={containerClass} controlId={name}>
        {label ? (
          <Form.Label className={labelClassName}>{label}</Form.Label>
        ) : null}

        <Field name={name}>
          {({ field, form: { touched, errors }, meta }) => (
            <div>
              <Form.Control
                type={type}
                placeholder={placeholder}
                className={className}
                isInvalid={touched[name] && errors[name] ? true : false}
                as={"textarea"}
                rows={5}
                {...field}
                autoComplete={name}
              />
              <ErrorMessage name={name}>
                {(msg) => (
                  <Form.Control.Feedback type="invalid">
                    {msg}
                  </Form.Control.Feedback>
                )}
              </ErrorMessage>
            </div>
          )}
        </Field>
      </Form.Group>
    );
  } else if (type === "date") {
    return (
      <Form.Group className={containerClass} controlId={name}>
        {label ? (
          <Form.Label className={labelClassName}>{label}</Form.Label>
        ) : null}

        <Field name={name}>
          {({
            field,
            form: { touched, errors, setFieldValue, values },
            meta,
          }) => (
            <div>
              <HyperDatepicker
                value={values?.[name] && new Date(values?.[name])}
                onChange={(date) => {
                  setFieldValue(name, date);
                }}
              />

              <ErrorMessage name={name}>
                {(msg) => (
                  <Form.Control.Feedback type="invalid">
                    {msg}
                  </Form.Control.Feedback>
                )}
              </ErrorMessage>
            </div>
          )}
        </Field>
      </Form.Group>
    );
  } else {
    return (
    
      
      
      <Form.Group className={containerClass} controlId={name}>
      
        {label ? (
          <Form.Label className={labelClassName}>{label}</Form.Label>
        ) : null}

        <Field name={name}>
          {({ field, form: { touched, errors }, meta }) => (
            <div>
              <Form.Control
                type={type}
                placeholder={placeholder}
                className={className}
                isInvalid={touched[name] && errors[name] ? true : false}
                {...field}
                autoComplete={name}
                min="1"
              />
              <ErrorMessage name={name}>
                {(msg) => (
                  <Form.Control.Feedback type="invalid">
                    {msg}
                  </Form.Control.Feedback>
                )}
              </ErrorMessage>
            </div>
          )}
        </Field>
      </Form.Group>
    );
  }
};

export default FormInput;
