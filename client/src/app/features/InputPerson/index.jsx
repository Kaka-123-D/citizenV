import React, { useState } from "react";

export default function InputPerson({ addPerson, executor }) {
  const [id, setId] = useState("");
  const [fullName, setFullName] = useState("");
  const [birthday, setBirthday] = useState("");
  const [gender, setGender] = useState(true);
  const [hometown, setHometown] = useState("");
  const [permanent, setPermanent] = useState("");
  const [temporary, setTemporary] = useState("");
  const [religion, setReligion] = useState("");
  const [educationLevel, setEducationLevel] = useState("");
  const [job, setJob] = useState("");

  function handleAddPerson(event) {
    event.preventDefault();
    addPerson(
      executor,
      id,
      fullName,
      birthday,
      gender,
      hometown,
      permanent,
      temporary,
      religion,
      educationLevel,
      job
    );
  }

  return (
    <form className="form-info">
      <input
        type="text"
        value={id}
        placeholder="CCCD"
        onChange={(e) => setId(e.target.value)}
        className="input-info"
      />
      <br />
      <input
        type="text"
        value={fullName}
        placeholder="Họ tên"
        onChange={(e) => setFullName(e.target.value)}
        className="input-info"
      />
      <br />
      <input
        type="date"
        value={birthday}
        placeholder="Ngày sinh"
        onChange={(e) => setBirthday(e.target.value)}
        className="input-info"
      />{" "}
      <br />
      <select
        onChange={(e) => setGender(e.target.value === "Nam" ? true : false)}
      >
        <option value="nam">Nam</option>
        <option value="nu">Nữ</option>
        <option value="khac">Khác</option>
      </select>{" "}
      <br />
      <input
        type="text"
        value={hometown}
        placeholder="Quê quán"
        onChange={(e) => setHometown(e.target.value)}
        className="input-info"
      />{" "}
      <br />
      <input
        type="text"
        value={permanent}
        placeholder="Thường Trú"
        onChange={(e) => setPermanent(e.target.value)}
        className="input-info"
      />{" "}
      <br />
      <input
        type="text"
        value={temporary}
        placeholder="Tạm trú"
        onChange={(e) => setTemporary(e.target.value)}
        className="input-info"
      />{" "}
      <br />
      <input
        type="text"
        value={religion}
        placeholder="Tôn giáo"
        onChange={(e) => setReligion(e.target.value)}
        className="input-info"
      />{" "}
      <br />
      <input
        type="text"
        value={educationLevel}
        placeholder="Trình độ học vấn"
        onChange={(e) => setEducationLevel(e.target.value)}
        className="input-info"
      />{" "}
      <br />
      <input
        type="text"
        value={job}
        placeholder="Nghề nghiệp"
        onChange={(e) => setJob(e.target.value)}
        className="input-info"
      />{" "}
      <br />
      <button
        onClick={(e) =>
          handleAddPerson(e)
        }
      >
        Add
      </button>
    </form>
  );
}
