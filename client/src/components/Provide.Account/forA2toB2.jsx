import React, { useState, useEffect } from "react";
import SearchBar from "../../containers/SearchBar";
import { xoa_dau } from "../../validation";
import "./forA2toB2.scss";

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
        className="search-region"
        type="text"
        placeholder="Search.."
        onChange={(e) => setTextSearch(e.target.value)}
      />

      <button className="create-btn" onClick={(e) => handleSubmit(e)}>
        Cấp tài khoản
      </button>
      {Array.isArray(regions) && regions.length == 0 ? 
      <span className="alert">Chưa có khu vực nào được khai báo</span> : 
      <table className="table-regions">
        <thead>
          <tr>
            <th className="field">Mã</th>
            <th className="field">Tên</th>
            <th className="field">Mô tả</th>
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
          {regions.map((region) => {
                let textTemp = region.name;
                if (
                  xoa_dau(textTemp)
                    .toLocaleLowerCase()
                    .startsWith(xoa_dau(textSearch).toLocaleLowerCase()) ===
                  true
                ) {
                  return (
                    <tr key={region.id}>
                      <td className="id-column">{region.id}</td>
                      <td className="name-column">{region.name}</td>
                      <td className="des-column">{region.textDes}</td>
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
      </table>}
    </div>
  );
}
