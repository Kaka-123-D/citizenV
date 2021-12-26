import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import LogoutBtn from "../Logout.Button/connectStore";
import {
  checkFeaturesSetTimeDeClare,
  checkFeaturesDeclare,
  checkFeaturesAnalysis,
  checkFeaturesInputPerson,
} from "../../validation";

import { Link } from "react-router-dom";

import "./style.scss";

export default function NavBar({ clickChangePass, executor, permission }) {
  const location = useLocation();
  return (
    <div className="nav-bar-wrap">
      <Navbar expand="lg" fixed="top" className="nav-bar">
        <Container fluid>
          <Navbar.Brand as={Link} to="/" className="logo">
            CitizenV
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              {checkFeaturesDeclare(executor, permission) ? (
                <Nav.Link as={Link} to="/declare" className="nav-item">
                  Khai báo mã khu vực
                </Nav.Link>
              ) : null}
              {executor === "admin" ? (
                <Nav.Link as={Link} to="/admin" className="nav-item">
                  Cấp tài khoản
                </Nav.Link>
              ) : null}

              {checkFeaturesSetTimeDeClare(executor, permission) ? (
                <Nav.Link as={Link} to="/setTimeDeclare" className="nav-item">
                  Mở quyền khai báo
                </Nav.Link>
              ) : null}
              {checkFeaturesInputPerson(executor, permission) ? (
                <Nav.Link as={Link} to="/input" className="nav-item">
                  Nhập liệu
                </Nav.Link>
              ) : null}
              {checkFeaturesAnalysis(executor, permission) ? (
                <NavDropdown
                  title="Quản lý"
                  id="navbarScrollingDropdown"
                  className="nav-item"
                >
                  <NavDropdown.Item
                    as={Link}
                    to="/analysis"
                    className="nav-item-drop"
                  >
                    Phân tích số liệu dân số
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    as={Link}
                    to="/person"
                    className="nav-item-drop"
                  >
                    Danh sách dân số
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <>
                  {executor === "admin" ? null : (
                    <Nav.Link as={Link} className="nav-item" to="/person">
                      Danh sách dân số
                    </Nav.Link>
                  )}
                </>
              )}
              <Nav.Link
                as={Link}
                className="nav-item"
                to={location.pathname}
                onClick={() => clickChangePass()}
              >
                Đổi mật khẩu
              </Nav.Link>
            </Nav>
            <LogoutBtn />
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
}
