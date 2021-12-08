import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

export default function Login({ login }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [cookies, setCookie, removeCookie] = useCookies(["user"]);

  function handleSubmit(event) {
    event.preventDefault();
    login({ username, password }, navigate, cookies, setCookie, removeCookie);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="username"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        placeholder="enter your username"
      />
      <input
        type="password"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        placeholder="enter your password"
      />
      <button>Login</button>
    </form>
  );
}
