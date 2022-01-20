import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { useLocation } from "react-router-dom";

const Navigation = () => {

  const { pathname } = useLocation();

  return (
    <Navbar expand="md" fixed="top" className="navbar">
      <Container>
        <Navbar.Brand href="/">Cryptos</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
          <Nav activeKey={pathname}>
            <Nav.Item>
              <Nav.Link href="/">Home</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/cryptocurrencies">Cryptocurrencies</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link href="/news">News</Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
