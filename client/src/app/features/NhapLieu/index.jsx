import React, { useState } from "react";
import InputForm from "../../../components/Input.Form/connectStore";
import "./style.scss";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function NhapLieu({
  executor,
  confirmDeclareComplete,
  addPerson,
}) {
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

  function handleConfirmComplete(e) {
    e.preventDefault();
    confirmDeclareComplete(executor);
  }

  function handleAddPerson(event) {
    event.preventDefault();
    if (
      id === "" ||
      fullName == "" ||
      birthday === "" ||
      hometown === "" ||
      permanent === "" ||
      temporary === "" ||
      religion === "" ||
      educationLevel === "" ||
      job === ""
    ) {
      toast.warning("Không được để trống các trường nhập liệu");
      return;
    }
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
    <div className="nhap-lieu-wrap">
      <button
        className="confirm-complete-btn"
        onClick={(e) => handleConfirmComplete(e)}
      >
        Xác nhận hoàn thành nhập liệu
      </button>
      <InputForm
        person={null}
        setId={setId}
        setFullName={setFullName}
        setBirthday={setBirthday}
        setGender={setGender}
        setHometown={setHometown}
        setPermanent={setPermanent}
        setTemporary={setTemporary}
        setReligion={setReligion}
        setEducationLevel={setEducationLevel}
        setJob={setJob}
      />
      <button onClick={(e) => handleAddPerson(e)} className="add-btn">
        Chấp nhận
      </button>
    </div>
  );
}
