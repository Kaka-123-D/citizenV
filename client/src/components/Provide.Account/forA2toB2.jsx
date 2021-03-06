import React, { useState, useEffect } from "react";
import "./forA2toB2.scss";
import RegionsTable from "../Regions.Table";
import {xoa_dau} from "../../validation"

export default function forA2toB2({
  createAccount,
  executor,
  regions,
  setRegionListToState,
}) {
  const [tickAll, setTickAll] = useState(false);
  const [textSearch, setTextSearch] = useState("");
  const [ids, setArrayId] = useState([]);

  function handleAddArrayId(newId) {
    let tickBoxArr = document.getElementsByClassName("tickBox");

    if (ids.filter((item) => item == newId).length == 0) {
      ids.push(newId);
      if (Array.isArray(regions) && ids.length === tickBoxArr.length - 1)
        setTickAll(true);
      console.log("add");
    } else {
      if (Array.isArray(regions) && ids.length === tickBoxArr.length - 1)
        setTickAll(false);
      setArrayId(ids.filter((item) => item != newId));
      console.log("delete");
    }
  }

  function handleTickAll() {
    let tickBoxArr = document.getElementsByClassName("tickBox");
    //
    if (!tickAll) {
      for (let i = 0; i < regions.length; i++) {
        if (
          xoa_dau(regions[i].name)
            .toLocaleLowerCase()
            .startsWith(xoa_dau(textSearch).toLocaleLowerCase()) &&
          !regions[i].isRegistered
        )
          ids.push(regions[i].id);
      }
      console.log(ids);
      for (let i = 0; i < tickBoxArr.length; i++) {
        tickBoxArr[i].checked = true;
      }
    } else {
      setArrayId([]);
      for (let i = 0; i < tickBoxArr.length; i++) {
        tickBoxArr[i].checked = false;
      }
    }
    setTickAll(!tickAll);
  }

  useEffect(() => {
    setRegionListToState(executor);
  }, []);

  function handleSubmit(event) {
    event.preventDefault();
    createAccount(executor, ids, setArrayId);
  }

  return (
    <div>
      <h2>Cấp tài khoản: </h2>
      <div className="service-provide-acc">
        <input
          value={textSearch}
          className="search-region"
          type="text"
          placeholder="Search.."
          onChange={(e) => setTextSearch(e.target.value)}
        />

        <button className="create-btn" onClick={(e) => handleSubmit(e)}>
          Cấp tài khoản
        </button>
      </div>
      <RegionsTable
        regions={regions}
        handleTickAll={handleTickAll}
        tickAll={tickAll}
        handleAddArrayId={handleAddArrayId}
        textSearch={textSearch}
      />
    </div>
  );
}
