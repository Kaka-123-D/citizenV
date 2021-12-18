import React from "react";
import Navbar from "../../../containers/Navbar";
import SetTimeDeclare from "../../../containers/Time";

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
