import React, { useState, useEffect } from "react";
import "./style.scss";
import CountDown from "react-countdown";
import { xoa_dau, formatTimeClock, checkTimePassed } from "../../validation";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProgressBar from "react-bootstrap/ProgressBar";
import FrameInfo from "../Info.Frame";

export default function Declare({
  executor,
  declareTimeStart,
  regions,
  setRegionListToState,
  permission,
  cancelDeclareTime,
  confirmDeclareComplete,
  getDataRegionById,
}) {
  const [timeStart, setTimeStart] = useState("");
  const [timeFinish, setTimeFinish] = useState("");
  const [textSearch, setTextSearch] = useState("");
  const [tickAll, setTickAll] = useState(false);
  const [ids, setArrayId] = useState([]);
  const [clickedRow, setClickedRow] = useState(false);
  const [tag, setTag] = useState("");
  const [data, setData] = useState({});

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
        <div className="alert">
          Cuộc điều tra dân số đã kết thúc. <br /> Hãy liên lạc với quản trị
          viên nếu bạn chưa hoàn thành
        </div>
      );
    } else {
      let day = days.toString();
      let hour = hours.toString();
      let minute = minutes.toString();
      let second = seconds.toString();

      if (day.length === 1) day = "0" + day;
      if (hour.length === 1) hour = "0" + hour;
      if (minute.length === 1) minute = "0" + minute;
      if (second.length === 1) second = "0" + second;

      if (day === "00") day = "0";

      return (
        <span className="clock">
          <div className="type-p">
            Đếm ngược thời gian cần hoàn thành khai báo{" "}
          </div>
          {day} Ngày : {hour} Giờ : {minute} Phút : {second} Giây
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

  // Hàm check trạng thái quyền khai báo
  function handleCheckStatus(permissionValue) {
    if (!permissionValue) return 0; //"chưa bắt đầu && thêm mới" ; //0
    if (permissionValue.isFinish) {
      if (permissionValue.isComplete) {
        return 1; // "thành công và thêm mới"; // 1
      }
      if (!permissionValue.isComplete) {
        return 2; //"chưa thành công và thêm mới"; // 2
      }
    }
    if (!permissionValue.isFinish) {
      if (permissionValue.isComplete) {
        return 3; //"thành công và hủy"; // 3
      }
      if (!permissionValue.isComplete) {
        return 4; //"chưa thành công và hủy"; // 4
      }
    } 
  }

  const handleShowStatus = (region) => {
    let status = handleCheckStatus(region.permission);
    if (status === 0) return <span>Chưa bắt đầu</span>;
    if (status === 1 || status === 3)
      return (
        <span className="complete">
          <i className="fas fa-check-circle"></i>{" "}
        </span>
      );
    if (status === 2 || status === 4)
      return (
        <span>
          <span className="incomplete">
            <i className="fas fa-hourglass-half"></i>
          </span>
        </span>
      );
  };

  const handleShowIcon = (permission, id) => {
    const status = handleCheckStatus(permission);
    if (status === 0 || status === 1 || status === 2) 
      return (
        <input
          type="checkbox"
          className="tickBox tdStatus"
          onChange={() => handleAddArrayId(id)}
        />
      );
    else
      return (
        <span
          className="cancel tdStatus"
          onClick={(e) => handleCancelDeclareTime(e, id)}
        >
          <i className="fas fa-window-close"></i>
        </span>
      );
  };

  const handleProgressBarOrButton = () => {
    let showButton = true;
    let countSuccess = 0;
    for (let i = 0; i < regions.length; i++) {
      const status = handleCheckStatus(regions[i].permission);
      if (status === 0 || status === 2 || status === 4) {
        showButton = false;
      } else countSuccess++;
    }
    if (
      showButton &&
      permission &&
      !permission.isFinish &&
      checkTimePassed(permission.timeStart)
    )
      return (
        <button
          className="complete-btn"
          onClick={(e) => handleConfirmComplete(e)}
        >
          Hoàn thành điều tra
        </button>
      );
    else if (
      (permission && checkTimePassed(permission.timeStart)) ||
      executor === "a1"
    ) {
      let progress = Math.round((countSuccess * 10000) / regions.length) / 100;
      return (
        <div className="progress-declare">
          <h3>Tiến độ</h3>
          <ProgressBar
            variant="success"
            animated
            label={`${progress}%`}
            now={progress}
            className="progress-bar-custom"
          />
        </div>
      );
    }
  };

  function viewInfo(index, region) {
    let tdStatus = document.getElementsByClassName("tdStatus");
    let status = handleCheckStatus(region.permission);
    if (status === 0 || status === 1 || status === 2) { 
      // xóa id ở trong ids + bỏ tích ở box + bỏ tíck All nếu đang tick All nếu đang chọn
      // và ngược lại nếu chưa chọn
      handleAddArrayId(region.id);
      tdStatus[index + 1].checked = !tdStatus[index + 1].checked;
    } else {
      // hiện khung thông tin gồm time start, time end, tiến độ
      let progress = 0;
      if (executor === "a1" || executor === "a2") {
        progress = Math.round(region.progress * 100);
      } else {
        region.permission.isComplete ? (progress = 100) : 0;
      }
      const data = {
        id: region.id,
        name: region.name,
        timeStart: region.permission.timeStart,
        timeEnd: region.permission.timeEnd,
        progress: progress,
      };
      setClickedRow(true);
      setData(data);
      setTag("REGION");
    }
  }

  return (
    <>
      {clickedRow ? (
        <FrameInfo
          tag={tag}
          data={data}
          setClose={setClickedRow}
          executor={executor}
        />
      ) : null}
      <div className="provide-time-form">
        <div className="clock-countdown">
          {permission &&
          checkTimePassed(permission.timeStart) &&
          !permission.isFinish ? (
            <>
              {checkTimePassed(permission.timeEnd) ? null : (
                <>
                  <span className="start-end-time">
                    <div className="start-time">
                      {formatTimeClock(permission.timeStart)}
                    </div>
                    <div className="end-time">
                      &rarr; {formatTimeClock(permission.timeEnd)}
                    </div>
                  </span>
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

              <button onClick={(e) => handleSubmit(e)}>Cấp quyền</button>
            </div>
          </div>
          <div>
            {Array.isArray(regions) && regions.length == 0 ? (
              <span className="alert">Chưa có khu vực nào được khai báo</span>
            ) : (
              <table className="table-regions">
                <thead>
                  <tr className="header">
                    <th className="field">Mã</th>
                    <th className="field">Tên</th>
                    <th className="field">Mô tả</th>
                    <th className="field">
                      Thêm/Hủy <br />
                      <input
                        type="checkbox"
                        onChange={() => handleTickAll()}
                        checked={tickAll}
                        className="tickBox tdStatus"
                      />
                    </th>
                    <th className="field">Trạng thái</th>
                  </tr>
                </thead>
                <tbody>
                  {regions.map((region, index) => {
                    if (region.isRegistered) {
                      let textTemp = region.name;
                      if (
                        xoa_dau(textTemp)
                          .toLocaleLowerCase()
                          .startsWith(
                            xoa_dau(textSearch).toLocaleLowerCase()
                          ) === true
                      ) {
                        return (
                          <tr key={region.id} className="region-row">
                            <td
                              className="id-column"
                              onClick={() => viewInfo(index, region)}
                            >
                              {region.id}
                            </td>
                            <td
                              className="name-column"
                              onClick={() => viewInfo(index, region)}
                            >
                              {region.name}
                            </td>
                            <td
                              className="des-column"
                              onClick={() => viewInfo(index, region)}
                            >
                              {region.textDes}
                            </td>
                            <td className="status-column">
                              {handleShowIcon(region.permission, region.id)}
                            </td>
                            <td className="complete-column">
                              {handleShowStatus(region)}
                            </td>
                          </tr>
                        );
                      }
                    }
                  })}
                </tbody>
              </table>
            )}
          </div>
        </form>
      </div>
    </>
  );
}
