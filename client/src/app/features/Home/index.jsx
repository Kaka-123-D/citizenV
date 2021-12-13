import React from "react";
import Declare from "../../../containers/Declare";
import LogoutButton from "../../../containers/Logout";
import ProviderAcc from "../../../containers/ProvideAcc";
import SearchBar from "../../../containers/SearchBar";

export default function Home() {
  return (
    <div>
      Hello from Home User!
      <LogoutButton />
      {/* <ProviderAcc /> */}
      <Declare />
      <br/>
      <br/>
      <SearchBar/>
    </div>
  );
}
