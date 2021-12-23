import React from 'react'
import DeclareForm from "../../../components/Declare.Form/connectStore";
import ProvideAcc from "../../../components/Provide.Account/connectStore";
import "./declare.scss"

export default function Declare() {
    return (
      <div>
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
