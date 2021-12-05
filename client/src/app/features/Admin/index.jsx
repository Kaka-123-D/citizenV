import React, { useState } from "react";

export default function Admin({ login }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    login({ username, password });
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
