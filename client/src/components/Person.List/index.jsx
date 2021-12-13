import React from "react";
import Crud from "./crud";

export default function PersonList({
  personList,
  executor,
  addPerson,
  updatePerson,
  deletePerson,
  getPersonList,
  getListAllPersonInVN,
}) {
  return (
    <div>
      <Crud
        addPerson={addPerson}
        updatePerson={updatePerson}
        deletePerson={deletePerson}
        executor={executor}
      />
      <table>
        <thead>
          <tr>
            <th>fullName</th>
            <th>birthday</th>
            <th>sex</th>
            <th>village</th>
            <th>thuongTru</th>
            <th>tamTru</th>
            <th>religion</th>
            <th>educationLevel</th>
            <th>job</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(personList) && personList.length > 0
            ? personList.map((person) => {
                <tr key={person.personId}>
                  <td>{person.fullName}</td>
                  <td>{person.birthday}</td>
                  <td>{person.sex}</td>
                  <td>{person.village}</td>
                  <td>{person.thuongTru}</td>
                  <td>{person.tamTru}</td>
                  <td>{person.religion}</td>
                  <td>{person.educationLevel}</td>
                  <td>{person.job}</td>
                </tr>;
              })
            : null}
        </tbody>
      </table>
    </div>
  );
}
