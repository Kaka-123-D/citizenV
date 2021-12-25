import React, { useState, useEffect } from "react";
import "./style.scss";
import { setMessageError } from "../../store/reducers/Message";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
import { isNumber } from "../../validation";

export default function DeclareForm({ declareRegion, executor, message }) {
  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [type, setType] = useState(setTypeDefault);
  const [filledId, setFilledId] = useState(true);
  const [filledName, setFilledName] = useState(true);

  function setTypeDefault() {
    switch (executor) {
      case "a1":
        return "tỉnh";
      case "a2":
        return "huyện";
      case "a3":
        return "xã";
      case "b1":
        return "thôn";
      default:
        return "--";
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!isNumber(id)) return;
    if (!id) setFilledId(false);
    if (!name) setFilledName(false);
    if (id && name) {
      declareRegion(executor, id, type, name, description);
      setMessageError(null);
      setId("");
      setName("");
      setDescription("");
    }
  }

  function handleChangeId(value) {
    setId(value);
    if (value) setFilledId(true);
    else setFilledId(false);
  }

  function handleChangeName(value) {
    setName(value);
    if (value) setFilledName(true);
    else setFilledName(false);
  }

  function renderSwitch() {
    switch (executor) {
      case "a1":
        return ["Tỉnh", "Thành phố"];
      case "a2":
        return ["Huyện", "Quận", "Thành phố"];
      case "a3":
        return ["Xã", "Phường", "Thị trấn"];
      case "b1":
        return ["Thôn", "Bản", "Tổ dân phố", "Xóm"];
      default:
        return ["error"];
    }
  }

  return (
    <div className="form-wrap">
      <h2>Khai báo mã khu vực: </h2>
      <form onSubmit={handleSubmit} className="form-horizontal">
        <div className="inputs-group">
          <label htmlFor="id-region-input">
            Mã khu vực<span className="required-input">*</span>{" "}
          </label>
          <input
            id="id-region-input"
            type="text"
            placeholder="Nhập ID .. "
            value={id}
            onChange={(event) => handleChangeId(event.target.value)}
          />
        </div>
        {filledId === true ? null : (
          <span className="alert">Không được bỏ trống!</span>
        )}
        <div className="inputs-group">
          <label htmlFor="name-region-input">
            Tên khu vực<span className="required-input">*</span>{" "}
          </label>
          <div className="name-region-group">
            <select id="type-region" onChange={(e) => setType(e.target.value)}>
              {renderSwitch().map((item) => {
                return (
                  <option key={item} value={item.toLocaleLowerCase()}>
                    {item}
                  </option>
                );
              })}
            </select>
            <input
              id="name-region-input"
              type="text"
              placeholder="Nhập tên khu vực .. "
              value={name}
              onChange={(event) => handleChangeName(event.target.value)}
            />
          </div>
        </div>
        {filledName === true ? null : (
          <span className="alert">Không được bỏ trống!</span>
        )}
        <div className="inputs-group">
          <label htmlFor="des-area">Mô Tả </label>
          <textarea
            id="des-area"
            type="text"
            placeholder="..."
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>
        {message && (
          <div>
            <div className="alert" role="alert">
              {message}
            </div>
          </div>
        )}
        <button id="declare-btn">Khai báo</button>
      </form>
    </div>
  );
}
