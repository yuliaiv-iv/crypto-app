import React from "react";
import { Container, Spinner } from "react-bootstrap";

const Loader = () => (
  <Container className="spinner">
    <Spinner animation="border" role="status" className="spinner-img">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  </Container>
);

export default Loader;
