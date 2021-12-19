import React from "react";
import Navbar from "../../../containers/Navbar"; 


import "./home.scss"

export default function Home() {
  return (
    <div className="home-wrap">
      <Navbar />
      <p>Hello from Home User!</p>
    </div>
  );
}
