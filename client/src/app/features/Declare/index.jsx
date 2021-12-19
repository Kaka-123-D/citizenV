import React from 'react'
import DeclareForm from "../../../containers/Declare";
import Navbar from "../../../containers/Navbar"; 
import ProvideAcc from "../../../containers/ProvideAcc";
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
