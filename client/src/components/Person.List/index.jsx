import React, { useEffect } from "react";
import Crud from "./crud";
import "./style.scss";

export default function PersonList({
  personList,
  executor,
  addPerson,
  updatePerson,
  deletePerson,
  getPersonList,
  getListAllPersonInRegion,
}) {
  useEffect(() => {
    if (executor === "a1") getListAllPersonInRegion(executor);
  }, []);

    // useEffect(() => {
    //   if (executor === "a1") getListAllPersonInRegion(executor);
    // }, [personList]);

  function handleEdit(event) {
    event.preventDefault();
  }

  return (
    <div>
      {console.log("personList:", personList)}
      <Crud
        addPerson={addPerson}
        executor={executor}
      />
      <br />
      <br />
      <h2>Danh sách dân số: </h2>
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
            : personList.map((person) => {
                return (
                  <tr key={person.personId}>
                    <td>{person.fullName}</td>
                    <td>{person.birthday}</td>
                    <td>{person.sex ? "Nam" : "Nữ"}</td>
                    <td>{person.village}</td>
                    <td>{person.thuongTru}</td>
                    <td>{person.tamTru}</td>
                    <td>{person.religion}</td>
                    <td>{person.educationLevel}</td>
                    <td>{person.job}</td>
                    <td>
                      <button onClick={(e) => this.handleEdit(e)}>Edit</button>
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
