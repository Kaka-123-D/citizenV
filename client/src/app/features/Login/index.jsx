import React from 'react';
import LoginForm from "../../../components/Login.Form/connectStore";
import Home from "../Home"
import "./style.scss"

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
