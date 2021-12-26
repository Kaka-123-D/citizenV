import React, { useEffect, useState } from "react";
import "./style.scss";
import SelectRegion from "../Region.Select/connectStore";
import FrameInfo from "../Info.Frame";
import { formatBirthday } from "../../validation";
import Table from "../React.Table";

export default function PersonList({
  personList,
  executor,
  updatePerson,
  deletePerson,
  getPersonList,
  getListAllPersonInRegion,
}) {
  const [ids, setIds] = useState([]);

  const data = (persons) => {
    let personsArr = persons.map((person, index) => {
      let personObj = {
        stt: index + 1,
        name: person.fullName,
        gender: person.sex ? "Nam" : "Nữ",
        permanentAddress: person.thuongTru,
        sttOnServer: person.stt,
      };
      return personObj;
    });
    return personsArr;
  };
  const columns = React.useMemo(
    () => [
      {
        // Make an expander cell
        Header: () => null, // No header
        id: "expander", // It needs an ID
        Cell: ({ row }) => (
          // Use Cell to render an expander for each row.
          // We can use the getToggleRowExpandedProps prop-getter
          // to build the expander.
          <span {...row.getToggleRowExpandedProps()}>
            {row.isExpanded ? "👇" : "👉"}
          </span>
        ),
      },
      {
        Header: "STT",
        accessor: "stt",
      },
      {
        Header: "Họ tên",
        accessor: "name",
      },
      {
        Header: "Giới tính",
        accessor: "gender",
      },
      {
        Header: "Địa chỉ thường trú",
        accessor: "permanentAddress",
      },
    ],
    []
  );
  useEffect(() => {
    getListAllPersonInRegion(executor);
  }, []);

  function handleClickViewList(event) {
    event.preventDefault();
    if (ids.length === 0) {
      getListAllPersonInRegion(executor);
    } else getPersonList(executor, ids);
  }

  function renderRowSubComponent() {
    return <button>Hello</button>;
  }

  return (
    <div className="person-wrap">
      <h2>Danh sách dân số: </h2>
      <div className="select-bar-group">
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
      </div>

      <Table
      executor={executor}
        columns={columns}
        data={data(personList)}
        renderRowSubComponent={renderRowSubComponent}
        handleDelete={deletePerson}
      />

      {/* <table className="table-person">
        <thead>
          <tr>
            <th>STT</th>
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
                      {index + 1}
                    </td>
                    <td onClick={() => handleViewInfo(index, person)}>
                      {person.fullName}
                    </td>
                    <td onClick={() => handleViewInfo(index, person)}>
                      {formatBirthday(person.birthday)}
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
      </table> */}
    </div>
  );
}
