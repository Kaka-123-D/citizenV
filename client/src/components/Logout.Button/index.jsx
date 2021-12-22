import React from "react";
import { useNavigate } from "react-router-dom";

import "./style.scss"

export default function Logout({ logout }) {
  const navigate = useNavigate();

  function handleLogout(event) {
    event.preventDefault();
    logout(navigate);
  }

  return (
    <button className="logoutBtn" onClick={(event) => handleLogout(event)}>Đăng xuất</button>
  );
}
