import React, { useState } from "react";
import ForA1 from "./forA1";
import ForA2toB2 from "./forA2toB2";

export default function provideAcc({ createAccount, providerGroup }) {
  if (providerGroup === "admin") return <ForA1 createAccount={createAccount} />;
  else return <ForA2toB2 createAccount={createAccount}/>;
}
