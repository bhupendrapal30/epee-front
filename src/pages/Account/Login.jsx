//Exteral Lib Import
import { Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import * as yup from "yup";
import { useTranslation } from "react-i18next";

//Internal Lib Import
import { VerticalForm, FormInput } from "../../components/Ui";
import AccountLayout from "./AccountLayout";
import AuthRequest from "../../APIRequest/AuthRequest";

/* bottom link of account pages */
const BottomLink = () => {
  const { t } = useTranslation();

  return (
    <Row className="mt-3">
      <Col className="text-center">
        
      </Col>
    </Row>
  );
};

const Login = () => {
  const { t } = useTranslation();

  /*
    form validation schema
    */
  const validationSchema = yup.object().shape({
    mobileNo: yup.string().required(t("Please enter mobile no")),
    password: yup.string().required(t("Please enter Password")),
  });

  /*
    handle form submission
    */
  const onSubmit = (formData) => {
    AuthRequest.LoginUser(formData);
  };

  return (
    <>
    <div class="container-scroller">
      <div class="container-fluid page-body-wrapper full-page-wrapper">
        <div class="content-wrapper d-flex align-items-center auth">
          <div class="row flex-grow">
            <div class="col-lg-12 mx-auto">
      <AccountLayout bottomLinks={<BottomLink />}>
      
        <div className="text-center w-75 m-auto">
          <h4 className="text-dark-50 text-center mt-0 fw-bold">
            {t("Sign In")}
          </h4>
          <p className="text-muted mb-4">
            {t("Enter your mobile No and password to access admin panel.")}
          </p>
        </div>

        <VerticalForm
          onSubmit={onSubmit}
          validationSchema={validationSchema}
          defaultValues={{ mobileNo: "", password: "" }}
        >
          <FormInput
            label={t("Mobile No")}
            type="text"
            name="mobileNo"
            placeholder={t("Enter your Mobile No")}
            containerClass={"mb-3"}
          />

          <FormInput
            label={t("Password")}
            type="password"
            name="password"
            placeholder={t("Enter your Password")}
            containerClass={"mb-3"}
          >
            <Link
              to="/account/forget-password"
              className="text-muted float-end"
            >
              <small>{t("Forgot your password?")}</small>
            </Link>
          </FormInput>

          <div className="mb-3 mb-0 text-center">
            <Button variant="primary" type="submit" disabled={false}>
              {t("Log In")}
            </Button>
          </div>
        </VerticalForm>
        
      </AccountLayout>
               </div>
            </div>
           </div>
        </div>
      </div>
    </>
  );
};

export default Login;
