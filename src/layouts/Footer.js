// @flow
import React from "react";
import { Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="container-fluid">
        <Row>
          <Col md={6}>{currentYear} © DMS</Col>
          <Col md={6}>
            <div className="text-md-end footer-links d-none d-md-block">
              
            </div>
          </Col>
        </Row>
      </div>
    </footer>
  );
};

export default Footer;
