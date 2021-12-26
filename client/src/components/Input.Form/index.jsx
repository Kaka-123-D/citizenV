import React, { useState } from "react";
import "./style.scss";

export default function InputPerson({
  person,
  setId,
  setFullName,
  setBirthday,
  setGender,
  setHometown,
  setPermanent,
  setTemporary,
  setReligion,
  setEducationLevel,
  setJob,
}) {

  return (
    <div className="form-info">
      <form>
        <label htmlFor="cccd">Căn cước / Chứng minh thư</label>
        <input
          id="cccd"
          type="text"
          placeholder={person ? person.personId : "..."}
          onChange={(e) => setId(e.target.value)}
          className="input-info"
        />
        <br />
        <label htmlFor="name">Họ tên</label>
        <input
          id="name"
          type="text"
          placeholder={person ? person.fullName : "..."}
          onChange={(e) => setFullName(e.target.value)}
          className="input-info"
        />
        <br />
        {person ? null : (
          <>
            <label htmlFor="birthday">Ngày sinh</label>
            <input
              id="birthday"
              type="date"
              onChange={(e) => setBirthday(e.target.value)}
            />
            <label htmlFor="gender">Giới tính</label>
            <select
              id="gender"
              onChange={(e) =>
                setGender(e.target.value === "nam" ? true : false)
              }
            >
              <option value="nam">Nam</option>
              <option value="nu">Nữ</option>
            </select>
          </>
        )}
        <label htmlFor="home-tower">Quê quán</label>
        <input
          id="home-tower"
          type="text"
          placeholder={person ? person.village : "..."}
          onChange={(e) => setHometown(e.target.value)}
          className="input-info"
        />{" "}
        <br />
        <label htmlFor="permanent">Địa chỉ thường trú</label>
        <input
          id="permanent"
          type="text"
          placeholder={person ? person.thuongTru : "..."}
          onChange={(e) => setPermanent(e.target.value)}
          className="input-info"
        />
        <br />
        <label htmlFor="temporary">Địa chỉ tạm trú</label>
        <input
          id="temporary"
          type="text"
          placeholder={person ? person.tamTru : "..."}
          onChange={(e) => setTemporary(e.target.value)}
          className="input-info"
        />
        <br />
        <label htmlFor="religion">Tôn giáo</label>
        <input
          id="religion"
          type="text"
          placeholder={person ? person.religion : "..."}
          onChange={(e) => setReligion(e.target.value)}
          className="input-info"
        />{" "}
        <br />
        <label htmlFor="eduLevel">Trình độ học vấn</label>
        {
          // tiểu học, thcs, thpt, trung cấp,đại học, cao đẳng, bậc sau đại học
        }
        <select
          value={person ? person.educationLevel : null}
          onChange={(e) => setEducationLevel(e.target.value)}
          id="eduLevel"
        >
          <option value="Tiểu Học">Tiểu Học</option>
          <option value="Trung Học Cơ Sở">Trung Học Cơ Sở</option>
          <option value="Trung Học Phổ Thông">Trung Học Phổ Thông</option>
          <option value="Trung Cấp">Trung Cấp</option>
          <option value="Cao Đẳng">Cao Đẳng</option>
          <option value="Đại Học">Đại Học</option>
          <option value="Bậc Sau Đại Học">Bậc sau Đại Học</option>
        </select>
        <br />
        <label htmlFor="job">Nghề nghiệp</label>
        <input
          id="job"
          type="text"
          placeholder={person ? person.job : "..."}
          onChange={(e) => setJob(e.target.value)}
          className="input-info"
        />
      </form>
    </div>
  );
}
