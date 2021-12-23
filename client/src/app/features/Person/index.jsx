import React from "react";
import PersonList from "../../../components/Person.List/connectStore";

export default function Provide() {
  return (
    <div>
      <div className="dashboard">
        <PersonList />
      </div>
    </div>
  );
}
