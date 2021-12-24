import React from "react";
import "./style.scss";
import ProgressBar from "react-bootstrap/ProgressBar";
import {formatTimeClock} from "../../validation"

// props setClose = false -> ẩn frame
export default function FrameInfo({ tag, data, setClose }) {
  const handleShowByTag = () => {
    switch (tag) {
      case "REGION_INCOMPLETE": {
        let progress = 30;
        if (data.progress > 0) {
          progress = data.progress;
        }
        return (
          <div className="frame-info">
            <button className="back-btn" onClick={() => setClose(false)}>
              X
            </button>
            <div className="info-region">
              <p>Mã khu vực:</p> {data.id} <br />
              <p>Tên khu vực:</p> {data.name} <br />
              <p>Trạng thái:</p> Đang điều tra dân cư
            </div>
            <div className="time">
              <label htmlFor="time-start">Thời gian bắt đầu:</label>
              <span id="time-start">{formatTimeClock(data.timeStart)}</span>
            </div>
            <div className="time">
              <label htmlFor="time-end">Thời gian kết thúc:</label>
              <span id="time-end">{formatTimeClock(data.timeEnd)}</span>
            </div>
            <h2>Tiến độ</h2>
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
      case "REGION_COMPLETE": {
        return <></>;
      }
    }
  };

  return (
    <div className="frame-wrap">
      {handleShowByTag()}
      <div className="layout-outside" onClick={() => setClose(false)}></div>
    </div>
  );
}
