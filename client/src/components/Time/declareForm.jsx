import React, { useState, useEffect } from "react";
import "./style.scss";
import CountDown from "react-countdown";
import { xoa_dau } from "../../validation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProgressBar from "react-bootstrap/ProgressBar";

export default function Declare({
  executor,
  declareTimeStart,
  regions,
  setRegionListToState,
  permission,
  cancelDeclareTime,
  confirmDeclareComplete,
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
    let tickBoxArr = document.getElementsByClassName("tickBox");

    if (ids.filter((item) => item == newId).length == 0) {
      ids.push(newId);
      console.log(ids);
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
          (!regions[i].permission || regions[i].permission.isFinish)
        )
          ids.push(regions[i].id);
      }
      console.log(ids);
      for (let i = 1; i < tickBoxArr.length; i++) {
        tickBoxArr[i].checked = true;
      }
    } else {
      setArrayId([]);
      for (let i = 1; i < tickBoxArr.length; i++) {
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

  function handleInputSearch(value) {
    setTextSearch(value);
    setTickAll(false);
  }

  function handleConfirmComplete(event) {
    event.preventDefault();
    confirmDeclareComplete(executor);
  }

  function handleCheckStatus(permission) {
    if (!permission || permission.isFinish) return 0;
    if (!permission.isComplete) return 1;
    return 2;
  }

  const handleShowIcon = (permission, id) => {
    const status = handleCheckStatus(permission);
    if (status === 0)
      return (
        <input
          type="checkbox"
          className="tickBox"
          onChange={() => handleAddArrayId(id)}
        />
      );
    if (status === 1)
      return (
        <span
          className="cancel"
          onClick={(e) => handleCancelDeclareTime(e, id)}
        >
          <i className="fas fa-window-close"></i>
        </span>
      );
    if (status === 2)
      return (
        <span className="complete">
          <i class="fas fa-check-circle"></i>{" "}
        </span>
      );
  };

  const handleProgressBarOrButton = () => {
    let showButton = true;
    let countSuccess = 0;
    for (let i = 0; i < regions.length; i++) {
      const status = handleCheckStatus(regions[i].permission);
      if (status === 0 || status === 1) {
        showButton = false;
      } else countSuccess++;
    }
    if (showButton)
      return (
        <button
          className="completeBtn"
          onClick={(e) => handleConfirmComplete(e)}
        >
          Hoàn thành điều tra
        </button>
      );
    else
      return (
        <div className="progress-declare">
          <h3>Tiến độ</h3>
          <ProgressBar
            variant="success"
            animated
            label
            now={(countSuccess * 100) / regions.length}
            className="progress-bar-custom"
          />
        </div>
      );
  };

  function viewInfoById(id) {
    // console.log(regions[0].permission);
  }

  return (
    <div className="provide-time-form">
      <div className="clock-countdown">
        {permission && new Date(permission.timeStart) < new Date(Date.now()) ? (
          <>
            {new Date(permission.timeEnd) - new Date(Date.now()) < 0 ? null : (
              <>
              <span className="alert">
                {new Date(permission.timeStart).getHours()}:{""}
                {new Date(permission.timeStart).getMinutes()} {" - "}
                {new Date(permission.timeStart).getDate()}/
                {new Date(permission.timeStart).getMonth() + 1}/
                {new Date(permission.timeStart).getFullYear()} &rarr;{" "}
                {new Date(permission.timeEnd).getHours()}:{""}
                {new Date(permission.timeEnd).getMinutes()} {" - "}
                {new Date(permission.timeEnd).getDate()}/
                {new Date(permission.timeEnd).getMonth() + 1}/
                {new Date(permission.timeEnd).getFullYear()}
              </span>
              <br />
              </>
            )}
            <CountDown
              date={
                Date.now() +
                (new Date(permission.timeEnd) - new Date(Date.now()))
              }
              renderer={rendererClock}
            />
          </>
        ) : null}
      </div>
      <form>
        <div className="service-declare">
          <div className="progress-input">
            {handleProgressBarOrButton()}
            <input
              value={textSearch}
              type="text"
              placeholder="Search.."
              onChange={(e) => handleInputSearch(e.target.value)}
              className="search-bar"
            />
          </div>

          <div className="select-time">
            <div className="time">
              <label htmlFor="timeStart">Thời gian bắt đầu </label>{" "}
              <input
                type="datetime-local"
                id="timeStart"
                onChange={(e) => setTimeStart(e.target.valueAsNumber)}
              />
              <br />
              <label htmlFor="timeStart"> Thời gian kết thúc </label>{" "}
              <input
                type="datetime-local"
                id="timeFinish"
                onChange={(e) => setTimeFinish(e.target.valueAsNumber)}
              />
            </div>

            <button onClick={(e) => handleSubmit(e)}>Ok</button>
          </div>
        </div>
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
                  <th className="field">
                    Trạng thái <br />
                    <input
                      type="checkbox"
                      onChange={() => handleTickAll()}
                      checked={tickAll}
                      className="tickBox"
                    />
                  </th>
                  {/* <th className="field">Tiến độ</th> */}
                  {/* <th className="field">Hủy quyền khai báo</th> */}
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
                      <tr
                        key={region.id}
                        onClick={() => viewInfoById(region.id)}
                        className="region-row"
                      >
                        <td className="id-column">{region.id}</td>
                        <td className="name-column">{region.name}</td>
                        <td className="des-column">{region.textDes}</td>
                        <td className="status-column">
                          {handleShowIcon(region.permission, region.id)}
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
