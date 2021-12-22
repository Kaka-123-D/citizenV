import React, { useState, useEffect } from "react";
import "./style.scss"
import RegionsTable from "../Regions.Table"
export default function Declare({
  executor,
  declareTimeStart,
  regions,
  setRegionListToState,
}) {
  const [timeStart, setTimeStart] = useState("");
  const [timeFinish, setTimeFinish] = useState("");
  const [textSearch, setTextSearch] = useState("");
  const [tickAll, setTickAll] = useState(false);
  const [ids, setArrayId] = useState([]);

  function handleSubmit(event) {
    event.preventDefault();
    const start = new Date(timeStart - 7 * 1000 * 3600);
    const finish = new Date(timeFinish - 7 * 1000 * 3600);

    declareTimeStart(executor, ids, start, finish);
  }

  function handleAddArrayId(newId) {
    if (ids.filter((item) => item == newId).length == 0) {
      ids.push(newId);
      if (Array.isArray(regions) && ids.length === regions.length)
        setTickAll(true);
      console.log("add");
    } else {
      if (Array.isArray(regions) && ids.length === regions.length)
        setTickAll(false);
      setArrayId(ids.filter((item) => item != newId));
      console.log("delete");
    }
  }

  function handleTickAll() {
    let tickBoxArr = document.getElementsByClassName("tickBox");
    //
    if (!tickAll) {
      setArrayId(regions.map((region) => region.id));
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


  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="timeStart">Start: </label>
        <input
          type="datetime-local"
          id="timeStart"
          onChange={(e) => setTimeStart(e.target.valueAsNumber)}
        />
        <label htmlFor="timeStart"> To </label>
        <input
          type="datetime-local"
          id="timeFinish"
          onChange={(e) => setTimeFinish(e.target.valueAsNumber)}
        />
        <button>Ok</button>
        <br />
        <br />
        <br />
        <input
          value={textSearch}
          type="text"
          placeholder="Search.."
          onChange={(e) => setTextSearch(e.target.value)}
        />
        <RegionsTable
          regions={regions}
          handleTickAll={handleTickAll}
          tickAll={tickAll}
          handleAddArrayId={handleAddArrayId}
          textSearch={textSearch}
        />{" "}
      </form>
    </>
  );
}
