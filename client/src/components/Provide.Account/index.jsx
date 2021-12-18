import React, { useState } from "react";
import ForA1 from "./forA1";
import ForA2toB2 from "./forA2toB2";

export default function provideAcc({
  createAccountForA1,
  createAccountForA2toB2,
  executor,
  regions,
  setRegionListToState,
}) {
  if (executor === "admin")
    return <ForA1 createAccount={createAccountForA1} />;
  else
    return (
      <ForA2toB2
        createAccount={createAccountForA2toB2}
        executor={executor}
        regions={regions}
        setRegionListToState={setRegionListToState}
      />
    );
}
