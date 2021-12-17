import React from 'react';
import LoginForm from "../../../containers/LoginForm";
import Home from "../Home"
import "./login.scss"

export default function Login() {
    return (
      <>
        <div className="login-wrap">
          <LoginForm />
          {/* <Home /> */}
        </div>
      </>
    );
}
