import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./style.scss";
import { validationPassword } from "../../validation";

export default function ChangeForm({
  changePassword,
  message,
  handleCancel,
  setAlertError,
}) {
  const [curPassword, setCurPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [filledCur, setFilledCur] = useState(true);
  const [filledNew, setFilledNew] = useState(true);
  const [filledConfirm, setFilledConfirm] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  function handleSubmit(event) {
    event.preventDefault();
    setAlertError(null);
    if (!curPassword) setFilledCur(false);
    if (!newPassword) setFilledNew(false);
    if (!confirm) setFilledConfirm(false);
    if (!validationPassword(newPassword)) {
      setAlertError(
        "Mật khẩu phải gồm ít nhất 1 ký tự đặc biệt, 1 ký tự in hoa, 1 ký tự in thường và 1 ký tự số "
      );
      return;
    }
    if (!curPassword || !newPassword || !confirm) return;
    if (newPassword !== confirm) {
      setAlertError("Mật khẩu gõ lại không đúng");
    } else {
      changePassword(curPassword, newPassword, navigate, location.pathname);
    }
  }

  function handleChangeCurPassword(value) {
    setCurPassword(value);
    if (value) setFilledCur(true);
    else setFilledCur(false);
  }
  function handleChangeNewPassword(value) {
    setNewPassword(value);
    if (value) setFilledNew(true);
    else setFilledNew(false);
  }
  function handleChangeConfirm(value) {
    setConfirm(value);
    if (value) setFilledConfirm(true);
    else setFilledConfirm(false);
  }

  return (
    <div className="full-screen">
      <form onSubmit={handleSubmit} className="form-change" autoComplete="on">
        <h1>Đổi Mật khẩu</h1>
        <div className="input-field">
          <div className="icon">
            <i className="fa fa-lock" aria-hidden="true"></i>
          </div>
          <input
            type="password"
            value={curPassword}
            onChange={(event) => handleChangeCurPassword(event.target.value)}
            placeholder="Mật khẩu hiện tại .. "
          />
        </div>
        {filledCur === true ? null : (
          <span className="alert">Không được bỏ trống!</span>
        )}
        <div className="input-field">
          <div className="icon">
            <i className="fa fa-unlock-alt" aria-hidden="true"></i>
          </div>
          <input
            type="password"
            value={newPassword}
            onChange={(event) => handleChangeNewPassword(event.target.value)}
            placeholder="Mật khẩu mới .."
          />
        </div>
        {filledNew === true ? null : (
          <span className="alert">Không được bỏ trống!</span>
        )}
        <div className="input-field">
          <div className="icon">
            <i className="fa fa-unlock-alt" aria-hidden="true"></i>
          </div>
          <input
            type="password"
            value={confirm}
            onChange={(event) => handleChangeConfirm(event.target.value)}
            placeholder="Gõ lại mật khẩu mới .. "
          />
        </div>
        {filledConfirm === true ? null : (
          <span className="alert">Không được bỏ trống!</span>
        )}
        {message && (
          <div>
            <div className="alert" role="alert">
              {message}
            </div>
          </div>
        )}
        <div className="button-gr">
          <button className="submitBtn" type="submit">
            Chấp nhận
          </button>
          <button className="submitBtn" onClick={handleCancel}>
            Bỏ qua
          </button>
        </div>
      </form>
    </div>
  );
}
