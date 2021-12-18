import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";
import LogoutBtn from "../../containers/Logout";

import { Link } from "react-router-dom";

import "./navbar.scss"

export default function NavBar() {
  return (
    <div className="nav-bar-wrap">
      <Navbar bg="light" expand="lg" fixed="top">
        <Container fluid>
          <Navbar.Brand as={Link} to="/">
            {" "}
            CitizenV{" "}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link as={Link} to="/declare">
                Khai báo mã khu vực
              </Nav.Link>

              <Nav.Link as={Link} to="/setTimeDeclare">
                Mở quyền khai báo
              </Nav.Link>
              <NavDropdown title="Kiểm tra" id="navbarScrollingDropdown">
                <NavDropdown.Item as={Link} to="/chart">
                  Phân tích số liệu dân số
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item as={Link} to="/person">
                  Danh sách dân số
                </NavDropdown.Item>

                {/* <NavDropdown.Item as={Link} to="/action5">
                  Mở thời gian khai báo{" "}
                </NavDropdown.Item> */}
              </NavDropdown>
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
