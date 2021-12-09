import React, { useState } from "react";

export default function provideAcc({ createAccount }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("all");
  const [group, setGroup] = useState("a1");

  function handleSubmit(event) {
    event.preventDefault();
    createAccount(username, password, fullName, phone, role, group);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        placeholder="Username"
      ></input>
      <input
        type="text"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        placeholder="Password"
      ></input>
      <input
        type="text"
        value={fullName}
        onChange={(event) => setFullName(event.target.value)}
        placeholder="Full Name"
      ></input>
      <input
        type="tel"
        // pattern=""
        // required
        value={phone}
        onChange={(event) => setPhone(event.target.value)}
        placeholder="Phone"
      ></input>
      <select
        onChange={(event) => {
          setRole(event.target.value);
        }}
      >
        <option value="all">All</option>
        <option value="edit">Edit</option>
        <option value="view">View</option>
      </select>
      <select
        onChange={(event) => {
          setGroup(event.target.value);
        }}
      >
        <option value="a1">A1</option>
        <option value="a2">A2</option>
        <option value="a3">A3</option>
        <option value="b1">B1</option>
        <option value="b2">B2</option>
      </select>
      <button>Submit</button>
    </form>
  );
}
