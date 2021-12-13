import React, { useState } from "react";
import ForA1 from "./forA1";
import ForA2toB2 from "./forA2toB2";

export default function provideAcc({ createAccount, executor }) {
  if (executor === "admin")
    return <ForA1 createAccount={createAccount} executor={executor} />;
  else return <ForA2toB2 createAccount={createAccount} executor={executor} />;
}
