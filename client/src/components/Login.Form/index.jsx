import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./login.scss";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmpty } from "validator";

const required = (value) => {
  if (isEmpty(value)) {
    return (
      <div className="alert" role="alert">
        This field is required!
      </div>
    );
  }
};

export default function Login({ login, message }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const form = useRef();
  const checkBtn = useRef();
  const navigate = useNavigate();

  function handleSubmit(event) {
    event.preventDefault();

    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
      login({ username, password }, navigate);
    }
  }

  return (
    <Form onSubmit={handleSubmit} ref={form}>
      <div className="input-field">
        <Input
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          placeholder="enter your username"
          validations={[required]}
        />
        <div className="icon">
          <i className="fa fa-user" aria-hidden="true"></i>
        </div>
      </div>
      <div className="input-field">
        <Input
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="enter your password"
          validations={[required]}
        />
        <div className="icon">
          <i className="fa fa-unlock-alt" aria-hidden="true"></i>
        </div>
      </div>
      {message && (
        <div >
          <div className="alert" role="alert">
            {message}
          </div>
        </div>
      )}
      <button>Login</button>
      <CheckButton style={{ display: "none" }} ref={checkBtn} />
    </Form>
  );
}
