import React from "react";
import Navbar from "../../../components/NavBar/connectStore"; 
import PersonList from "../../../components/Person.List/connectStore";

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
