import React, { useState, useEffect } from "react";
import "./declareForm.scss"
import {xoa_dau} from "../../validation";

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
          type="text"
          placeholder="Search.."
          onChange={(e) => setTextSearch(e.target.value)}
        />
        <table className="table-regions">
          <thead>
            <tr>
              <th>Mã</th>
              <th>Tên</th>
              <th>Mô tả</th>
              <th>
                <input
                  type="checkbox"
                  onChange={() => handleTickAll()}
                  checked={tickAll}
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(regions) && regions.length == 0
              ? null
              : regions.map((region) => {
                  let textTemp = region.name;
                  if (
                    xoa_dau(textTemp)
                      .toLocaleLowerCase()
                      .startsWith(xoa_dau(textSearch).toLocaleLowerCase()) ===
                    true
                  ) {
                    return (
                      <tr key={region.id}>
                        <td>{region.id}</td>
                        <td>{region.name}</td>
                        <td>{region.textDes}</td>
                        <td>
                          <input
                            type="checkbox"
                            className="tickBox"
                            // checked={check ? check : null}
                            onChange={() => handleAddArrayId(region.id)}
                          />
                        </td>
                      </tr>
                    );
                  }
                })}
          </tbody>
        </table>
      </form>
    </>
  );
}
