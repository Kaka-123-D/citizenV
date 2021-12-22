import React from 'react'
import DeclareForm from "../../../components/Declare.Form/connectStore";
import Navbar from "../../../components/NavBar/connectStore";
import ProvideAcc from "../../../components/Provide.Account/connectStore";
import "./declare.scss"

export default function Declare() {
    return (
      <div>
        <Navbar />
        <div className="dashboard">
          <div className="declare-form">
            <DeclareForm />
          </div>

          <div className="provide-account">
            <ProvideAcc />
          </div>
        </div>
      </div>
    );
}
