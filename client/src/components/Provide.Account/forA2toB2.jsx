import React, { useState, useEffect } from "react";
import SearchBar from "../../containers/SearchBar";
import { xoa_dau } from "../../validation";

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

  function handleSubmit(event) {
    event.preventDefault();
    createAccount(executor, ids);
  }

  return (
    <div>
      <h2>Cấp tài khoản: </h2>
      <input
        type="text"
        placeholder="Search.."
        onChange={(e) => setTextSearch(e.target.value)}
      />

      <button onClick={(e) => handleSubmit(e)}>Cấp tài khoản</button>
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
                          onChange={() => handleAddArrayId(region.id)}
                        />
                      </td>
                    </tr>
                  );
                }
              })}
        </tbody>
      </table>
    </div>
  );
}
