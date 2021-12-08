import React from "react";
import { useNavigate } from "react-router-dom";

export default function Logout({ logout }) {
  const navigate = useNavigate();

  function handleLogout(event) {
    event.preventDefault();
    logout(navigate);
  }

  return (
    <button onClick={(event) => handleLogout(event)}>Logout</button>
  );
}
