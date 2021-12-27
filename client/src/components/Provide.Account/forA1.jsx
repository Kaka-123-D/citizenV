import React, { useState } from "react";
import "./forA1.scss";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import validator from "validator";

const strongPassword = (value) => {
  if (
    validator.isStrongPassword(value, {
      minLength: 8,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    })
  ) {
    console.log("ok");
    return true;
  } else {
    toast.error("Mật khẩu chưa đủ mạnh");
    return false;
  }
};

export default function forA1({ createAccount }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("edit");
  const [group, setGroup] = useState("a1");

  function handleSubmit(event) {
    event.preventDefault();

    if (username === "") {
      toast.warning("Trường username đang để trống");
      return;
    }
    if (password === "") {
      toast.warning("Trường password đang để trống");
      return;
    }
    if (fullName === "") {
      toast.warning("Trường fullName đang để trống");
      return;
    }
    if (phone === "") {
      toast.warning("Trường phone đang để trống");
      return;
    }
    if (!strongPassword(password)) return;
    createAccount(username, password, fullName, "+84" + phone, role, group);
  }

  return (
    <form onSubmit={handleSubmit} className="form-provide">
      <div className="input">
        <label>Tên tài khoản</label>
        <input
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          placeholder="Username"
          className="input-info"
        ></input>
      </div>
      <div className="input">
        <label>Mật khẩu</label>
        <input
          type="text"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          placeholder="Password"
          className="input-info"
        ></input>
      </div>
      <div className="input">
        <label>Họ tên</label>
        <input
          type="text"
          value={fullName}
          onChange={(event) => setFullName(event.target.value)}
          placeholder="Full Name"
          className="input-info"
        ></input>
      </div>
      <div className="input">
        <label>Số điện thoại</label>
        <input
          type="tel"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          placeholder="Phone"
          className="input-info"
        ></input>
      </div>
      <div className="input">
        <label>Chọn quyền</label>
        <select
          className="select-info"
          onChange={(event) => {
            setRole(event.target.value);
          }}
        >
          <option value="all">All</option>
          <option value="edit">Edit</option>
          <option value="view">View</option>
        </select>
      </div>
      <div className="input">
        <label>Loại tài khoản</label>
        <select
          className="select-info"
          onChange={(event) => {
            setGroup(event.target.value);
          }}
        >
          <option value="a1">A1</option>
          <option value="a2">A2</option>
          <option value="a3">A3</option>
          <option value="b1">B1</option>
          <option value="b2">B2</option>
        </select>
      </div>
      <button className="sm-btn">Submit</button>
    </form>
  );
}
