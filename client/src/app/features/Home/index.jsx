import React from "react";
import ProviderAcc from "../../../containers/ProvideAcc";
import SearchBar from "../../../containers/SearchBar";
import TimeDeclareForm from "../../../containers/Time";
import Navbar from "../../../containers/Navbar"; 


import "./home.scss"

export default function Home() {
  return (
    <div className="home-wrap">
      <Navbar />
      Hello from Home User!
      <br />
      <br />
      List khu vực đã khai báo
      <SearchBar />
    </div>
  );
}
