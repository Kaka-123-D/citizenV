import React, { useState, useEffect } from "react";
import "./style.scss";
import CountDown from "react-countdown";
import { xoa_dau } from "../../validation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Declare({
  executor,
  declareTimeStart,
  regions,
  setRegionListToState,
  permission,
  cancelDeclareTime,
  countPermission,
}) {
  const [timeStart, setTimeStart] = useState("");
  const [timeFinish, setTimeFinish] = useState("");
  const [textSearch, setTextSearch] = useState("");
  const [tickAll, setTickAll] = useState(false);
  const [ids, setArrayId] = useState([]);

  function handleSubmit(event) {
    event.preventDefault();
    if (timeStart - 7 * 1000 * 3600 < Date.now()) {
      toast.error("Thời gian bắt đầu phải lớn hơn thời điểm cấp quyền");
      return;
    }
    if (ids.length === 0) {
      toast.warning("Bạn chưa chọn khu vực nào!");
      return;
    }
    const start = new Date(timeStart - 7 * 1000 * 3600);
    const finish = new Date(timeFinish - 7 * 1000 * 3600);
    declareTimeStart(executor, ids, start, finish, setArrayId);
  }

  function handleAddArrayId(newId) {
    if (ids.filter((item) => item == newId).length == 0) {
      ids.push(newId);
      console.log(ids);
      if (
        Array.isArray(regions) &&
        ids.length === (regions.length - countPermission)
      )
        setTickAll(true);
      console.log("add");
    } else {
      if (
        Array.isArray(regions) &&
        ids.length === (regions.length - countPermission)
      )
        setTickAll(false);
      setArrayId(ids.filter((item) => item != newId));
      console.log("delete");
    }
  }

  function handleTickAll() {
    let tickBoxArr = document.getElementsByClassName("tickBox");
    //
    if (!tickAll) {
      for (let i = 0; i < tickBoxArr.length; i++) {
        if (!regions[i].permission || regions[i].permission.isFinish) ids.push(regions[i].id);
      }
      
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

  function handleCancelDeclareTime(event, id) {
    event.preventDefault();
    cancelDeclareTime(executor, [id]);
  }

  const rendererClock = ({ days, hours, minutes, seconds, completed }) => {
    if (completed) {
      return (
        <span className="alert">
          Cuộc điều tra dân số đã kết thúc. <br /> Hãy liên lạc với quản trị
          viên nếu bạn chưa hoàn thành
        </span>
      );
    } else {
      return (
        <span className="clock">
          <div className="type-p">
            Đếm ngược thời gian cần hoàn thành khai báo{" "}
          </div>
          {days} Ngày : {hours} Giờ : {minutes} Phút : {seconds} Giây
        </span>
      );
    }
  };

  return (
    <div className="provide-time-form">
      <div className="clock-countdown">
        {permission ? (
          <CountDown
            date={
              Date.now() + (new Date(permission.timeEnd) - new Date(Date.now()))
            }
            renderer={rendererClock}
          />
        ) : null}
      </div>
      <form>
        <label htmlFor="timeStart">Thời gian bắt đầu </label>
        <input
          type="datetime-local"
          id="timeStart"
          onChange={(e) => setTimeStart(e.target.valueAsNumber)}
        />
        <label htmlFor="timeStart"> Thời gian kết thúc </label>
        <input
          type="datetime-local"
          id="timeFinish"
          onChange={(e) => setTimeFinish(e.target.valueAsNumber)}
        />
        <button onClick={(e) => handleSubmit(e)}>Ok</button>
        <br />
        <br />
        <br />
        <input
          value={textSearch}
          type="text"
          placeholder="Search.."
          onChange={(e) => setTextSearch(e.target.value)}
        />

        <div>
          {Array.isArray(regions) && regions.length == 0 ? (
            <span className="alert">Chưa có khu vực nào được khai báo</span>
          ) : (
            <table className="table-regions">
              <thead>
                <tr>
                  <th className="field">Mã</th>
                  <th className="field">Tên</th>
                  <th className="field">Mô tả</th>
                  <th className="field">Trạng thái</th>
                  {/* <th className="field">Tiến độ</th> */}
                  {/* <th className="field">Hủy quyền khai báo</th> */}
                  <th>
                    <input
                      type="checkbox"
                      onChange={() => handleTickAll()}
                      checked={tickAll}
                      className="tickBox"
                    />
                  </th>
                </tr>
              </thead>
              <tbody >
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
                        {}
                        <td className="">{}</td>

                        <td>
                          {region.permission && !region.permission.isFinish ? (
                            <span
                              className="cancel"
                              onClick={(e) =>
                                handleCancelDeclareTime(e, region.id)
                              }
                            >
                              <i className="fas fa-window-close"></i>
                            </span>
                          ) : (
                            <input
                              type="checkbox"
                              className="tickBox"
                              onChange={() => handleAddArrayId(region.id)}
                            />
                          )}
                        </td>
                      </tr>
                    );
                  }
                })}
              </tbody>
            </table>
          )}
        </div>
      </form>
    </div>
  );
}
