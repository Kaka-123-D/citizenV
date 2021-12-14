import React, {useState} from 'react'

export default function crud({addPerson, updatePerson, deletePerson, executor}) {
    const [id, setId] = useState("");
    const [fullName, setFullName] = useState("");
    const [birthday, setBirthday] = useState("");
    const [gender, setGender] = useState("");
    const [hometown, setHometown] = useState("");
    const [permanent, setPermanent] = useState("");
    const [temporary, setTemporary] = useState("");
    const [religion, setReligion] = useState("");
    const [educationLevel, setEducationLevel] = useState("");
    const [job, setJob] = useState("");

    return (
      <div>
        <input
          type="text"
          value={id}
          placeholder="CCCD"
          onChange={(e) => setId(e.target.value)}
        />
        <input
          type="text"
          value={fullName}
          placeholder="Họ tên"
          onChange={(e) => setFullName(e.target.value)}
        />
        <input
          type="date"
          value={birthday}
          placeholder="Ngày sinh"
          onChange={(e) => setBirthday(e.target.value)}
        />
        <input
          type="text"
          value={gender}
          placeholder="Giới tính"
          onChange={(e) => setGender(e.target.value)}
        />
        <input
          type="text"
          value={hometown}
          placeholder="Quê quán"
          onChange={(e) => setHometown(e.target.value)}
        />
        <input
          type="text"
          value={permanent}
          placeholder="Thường Trú"
          onChange={(e) => setPermanent(e.target.value)}
        />
        <input
          type="text"
          value={temporary}
          placeholder="Tạm trú"
          onChange={(e) => setTemporary(e.target.value)}
        />
        <input
          type="text"
          value={religion}
          placeholder="Tôn giáo"
          onChange={(e) => setReligion(e.target.value)}
        />
        <input
          type="text"
          value={educationLevel}
          placeholder="Trình độ học vấn"
          onChange={(e) => setEducationLevel(e.target.value)}
        />
        <input
          type="text"
          value={job}
          placeholder="Nghề nghiệp"
          onChange={(e) => setJob(e.target.value)}
        />
        <button
          onClick={() =>
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
            )
          }
        >
          Add
        </button>
        <button onClick={() => alert("Chưa làm")}>Edit</button>
        <button onClick={() => alert("Chưa làm")}>Delete</button>
      </div>
    );
}