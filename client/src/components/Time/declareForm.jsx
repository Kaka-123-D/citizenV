import React, { useState, useEffect } from "react";

export default function Declare({ executor, declareTimeStart, regions }) {
  const [timeStart, setTimeStart] = useState("");
  const [timeFinish, setTimeFinish] = useState("");
  const [textSearch, setTextSearch] = useState("");
  const [tickAll, setTickAll] = useState(false);
  const [id, setArrayId] = useState([]);

  function xoa_dau(str) {
    str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
    str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
    str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
    str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
    str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
    str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
    str = str.replace(/đ/g, "d");
    str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
    str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
    str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
    str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
    str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
    str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
    str = str.replace(/Đ/g, "D");
    return str;
  }

  function handleSubmit(event) {
    event.preventDefault();
    const start = new Date(timeStart - 7 * 1000 * 3600);
    const finish = new Date(timeFinish - 7 * 1000 * 3600);

    declareTimeStart(executor, id, start, finish);
  }

  function handleAddArrayId(newId) {
    if (id.filter((item) => item == newId).length == 0) {
      id.push(newId);
      if (Array.isArray(regions) && id.length === regions.length)
        setTickAll(true);
      console.log("add");
    } else {
      if (Array.isArray(regions) && id.length === regions.length)
        setTickAll(false);
      setArrayId(id.filter((item) => item != newId));
      console.log("delete");
    }
  }

  function handleTickAll() {
    let tickBoxArr = document.getElementsByClassName("tickBox");
    //
    if (!tickAll) {
      setArrayId(regions.map((region) => region.provinceId));
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
        <input
          type="text"
          placeholder="Search.."
          onChange={(e) => setTextSearch(e.target.value)}
        />
        <table>
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
