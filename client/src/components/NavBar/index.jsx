import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import LogoutBtn from "../../containers/Logout"

export default function NavBar() {
  return (
    <div className="nav-bar-wrap">
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <Navbar.Brand href="#">CitizenV</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link href="#action1">Home</Nav.Link>
              <Nav.Link href="#action2">Cấp tài khoản</Nav.Link>
              <NavDropdown title="Declare" id="navbarScrollingDropdown">
                <NavDropdown.Item href="#action3">Khai báo A</NavDropdown.Item>
                <NavDropdown.Item href="#action4">Khai báo B</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">
                  Mở thời gian khai báo{" "}
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="#" disabled>
                Something
              </Nav.Link>
            </Nav>
            {/* <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form> */}
            <LogoutBtn />
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
