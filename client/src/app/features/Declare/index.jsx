import React from 'react'
import DeclareForm from "../../../containers/Declare";
import Navbar from "../../../containers/Navbar"; 
import ProvideAcc from "../../../containers/ProvideAcc";


export default function Declare() {
    return (
      <div>
        <Navbar />
        <div className="dashboard">
          <h2>Khai báo mã khu vực: </h2>
          <DeclareForm />
          <br />
          <br />
          <ProvideAcc />
        </div>
      </div>
    );
}
