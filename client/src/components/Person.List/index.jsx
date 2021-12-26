import React, { useEffect, useState } from "react";
import "./style.scss";
import SelectRegion from "../Region.Select/connectStore";
import FrameInfo from "../Info.Frame";

export default function PersonList({
  personList,
  executor,
  updatePerson,
  deletePerson,
  getPersonList,
  getListAllPersonInRegion,
}) {
  const [ids, setIds] = useState([]);
  const [clickedRow, setClickedRow] = useState(false);
  const [data, setData] = useState({});
  const [tag, setTag] = useState("");

  useEffect(() => {
    getListAllPersonInRegion(executor);
  }, []);

  function handleClickViewList(event) {
    event.preventDefault();
    if (ids.length === 0) {
      getListAllPersonInRegion(executor);
    } else getPersonList(executor, ids);
  }

  function handleViewInfo(index, person) {



    setClickedRow(true);
    setData(data);
    setTag("PERSON");
  }

  return (
    <div className="person-wrap">
      {console.log(ids)}
      {clickedRow ? (
        <FrameInfo tag={tag} data={data} setClose={setClickedRow} />
      ) : null}
      <div className="select-group"></div>
      <h2>Danh sách dân số: </h2>

      {executor !== "b2" ? (
        <>
          <SelectRegion setIds={setIds} ids={ids} />

          <button
          className="view-btn"
            onClick={(e) => {
              handleClickViewList(e);
            }}
          >
            Xem danh sách
          </button>
        </>
      ) : null}

      <table className="table-person">
        <thead>
          <tr>
            <th>Họ tên</th>
            <th>Ngày sinh</th>
            <th>Giới tính</th>
            <th>Quê quán</th>
            <th>Địa chỉ thường trú</th>
            <th>Địa chỉ tạm trú</th>
            <th>Tôn giáo</th>
            <th>Trình độ học vấn</th>
            <th>Nghề nghiệp</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(personList) && personList.length == 0
            ? null
            : personList.map((person, index) => {
                return (
                  <tr key={person.personId} className="person-row">
                    <td onClick={() => handleViewInfo(index, person)}>
                      {person.fullName}
                    </td>
                    <td onClick={() => handleViewInfo(index, person)}>
                      {person.birthday}
                    </td>
                    <td onClick={() => handleViewInfo(index, person)}>
                      {person.sex ? "Nam" : "Nữ"}
                    </td>
                    <td onClick={() => handleViewInfo(index, person)}>
                      {person.village}
                    </td>
                    <td onClick={() => handleViewInfo(index, person)}>
                      {person.thuongTru}
                    </td>
                    <td onClick={() => handleViewInfo(index, person)}>
                      {person.tamTru}
                    </td>
                    <td onClick={() => handleViewInfo(index, person)}>
                      {person.religion}
                    </td>
                    <td onClick={() => handleViewInfo(index, person)}>
                      {person.educationLevel}
                    </td>
                    <td onClick={() => handleViewInfo(index, person)}>
                      {person.job}
                    </td>
                    <td>
                      <button
                        onClick={() => deletePerson(executor, person.stt)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
        </tbody>
      </table>
    </div>
  );
}
