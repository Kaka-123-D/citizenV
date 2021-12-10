import React from "react";
import Declare from "../../../containers/Declare";
import LogoutButton from "../../../containers/Logout";
import ProviderAcc from "../../../containers/ProvideAcc";

export default function Home() {
  return (
    <div>
      Hello from Home User!
      <LogoutButton />
      {/* <ProviderAcc /> */}
      <Declare />
    </div>
  );
}
