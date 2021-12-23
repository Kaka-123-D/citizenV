import React from "react";
import SetTimeDeclare from "../../../components/Time/connectStore";

export default function Provide() {
  return (
    <div>
      <div className="dashboard">
        <SetTimeDeclare />
      </div>
    </div>
  );
}
