import React from "react";
import Navbar from "../../../containers/Navbar";
import PersonList from "../../../containers/personList";

export default function Provide() {
  return (
    <div>
      <Navbar />
      <div className="dashboard">
        <PersonList />
      </div>
    </div>
  );
}
