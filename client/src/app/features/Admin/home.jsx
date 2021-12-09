import React from 'react'
import LogoutButton from "../../../containers/Logout";
import ProvideAcc from "../../../containers/ProvideAcc"

export default function home() {
    return (
      <div>
        Hello from Home Admin
        <LogoutButton />
        <ProvideAcc />
      </div>
    );
}
