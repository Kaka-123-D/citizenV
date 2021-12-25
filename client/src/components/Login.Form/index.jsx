import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import "./style.scss";

export default function Login({ login, message, listLogged, setAlertError }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [filledUsername, setFilledUsername] = useState(true);
  const [filledPassword, setFilledPassword] = useState(true);
  const [remember, setRemember] = useState(true);

  function handleSubmit(event) {
    event.preventDefault();
    if (!username) setFilledUsername(false);
    if (!password) setFilledPassword(false);
    if (username && password) {
      login(username.trim(), password, remember);
    }
  }

  function handleChangeUsername(value) {
    if (message) setAlertError(null);
    if (value && value !== " ") {
      setFilledUsername(true);
      if (
        value.trim().length <= 2 &&
        (!listLogged || !listLogged.includes(value.trim()))
      )
        setUsername(" " + value.trim());
      else setUsername(value.trim());
    } else {
      setFilledUsername(false);
      setUsername("");
    }
  }
  function handleChangePassword(value) {
    if (message) setAlertError(null);
    setPassword(value);
    if (value) setFilledPassword(true);
    else setFilledPassword(false);
  }

  return (
    <form onSubmit={handleSubmit} className="form-group" autoComplete="on">
      <h1>Đăng nhập</h1>
      <div className="input-field">
        <div className="icon">
          <i className="fa fa-user" aria-hidden="true"></i>
        </div>
        <input
          autoComplete="on"
          type="text"
          value={username}
          onChange={(event) => handleChangeUsername(event.target.value)}
          placeholder="Nhập tài khoản .. "
        />
      </div>
      {filledUsername === true ? null : (
        <span className="alert">Không được bỏ trống!</span>
      )}
      <div className="input-field">
        <div className="icon">
          <i className="fa fa-unlock-alt" aria-hidden="true"></i>
        </div>
        <input
          autoComplete="on"
          type="password"
          value={password}
          onChange={(event) => handleChangePassword(event.target.value)}
          placeholder="Nhập mật khẩu .."
        />
      </div>
      {filledPassword === true ? null : (
        <span className="alert">Không được bỏ trống!</span>
      )}
      {message && (
        <div>
          <div className="alert" role="alert">
            {message}
          </div>
        </div>
      )}
      <div className="service-auth">
        <div className="remember-me">
          <input
            type="checkbox"
            checked={remember}
            onChange={() => setRemember(!remember)}
          />
          <span className="text">Duy trì đăng nhập </span>
        </div>

        {/* <Link to="/resetPassword" className="forget-pass">
          Quên mật khẩu?
        </Link> */}
        <button className="submitBtn" type="submit">
          Đăng nhập
        </button>
      </div>
    </form>
  );
}
