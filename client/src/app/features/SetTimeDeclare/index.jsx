import React from "react";
import Navbar from "../../../components/NavBar/connectStore"; 
import SetTimeDeclare from "../../../components/Time/connectStore";

export default function Provide() {
  return (
    <div>
      <Navbar />
      <div className="dashboard">
        <SetTimeDeclare />
      </div>
    </div>
  );
}
