import React from 'react'
import LogoutButton from "../../../components/Logout.Button/connectStore";
import ProvideAcc from "../../../components/Provide.Account/connectStore"

export default function home() {
    return (
      <div>
        Hello from Home Admin
        <LogoutButton />
        <ProvideAcc />
      </div>
    );
}
