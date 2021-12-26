import React, {useState} from "react";
import { useTable, usePagination, useExpanded } from "react-table";
import "./style.scss";
import InputPerson from "../Input.Form/connectStore";

export default function Table({
  columns,
  data,
  handleDelete,
  executor,
  updatePerson,
}) {
  const [id, setId] = useState("");
  const [fullName, setFullName] = useState("");
  const [hometown, setHometown] = useState("");
  const [permanent, setPermanent] = useState("");
  const [temporary, setTemporary] = useState("");
  const [religion, setReligion] = useState("");
  const [educationLevel, setEducationLevel] = useState("");
  const [job, setJob] = useState("");

  function handleUpdatePerson(event, person) {
    event.preventDefault();

    let id_req = id;
    let fullName_req = fullName;
    let hometown_req = hometown;
    let permanent_req = permanent;
    let temporary_req = temporary;
    let religion_req =religion;
    let educationLevel_req = educationLevel;
    let job_req = job;

    if (id_req === "") id_req = person.personId;
    if (fullName_req === "") fullName_req = person.fullName;
    if (hometown_req === "") hometown_req = person.village;
    if (permanent_req === "") permanent_req = person.thuongTru;
    if (temporary_req === "") temporary_req = person.tamTru;
    if (religion_req === "") religion_req = person.religion;
    if (educationLevel_req === "") educationLevel_req = person.educationLevel;
    if (job_req === "") job_req = person.job;

    updatePerson(
      executor,
      person.stt,
      id_req,
      fullName_req,
      person.birthday,
      person.sex,
      hometown_req,
      permanent_req,
      temporary_req,
      religion_req,
      educationLevel_req,
      job_req
    );
  }

  // Use the state and functions returned from useTable to build UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page, // dùng page thay row

    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    visibleColumns,
    state: { pageIndex, pageSize, expanded },
  } = useTable(
    {
      columns,
      data,
      initialState: { pageIndex: 0 },
    },
    useExpanded,
    usePagination
  );

  // Render the UI for table
  return (
    <>
      <table {...getTableProps()} className="person-table">
        <thead className="header">
          {headerGroups.map((headerGroup, i) => (
            <tr {...headerGroup.getHeaderGroupProps()} key={i}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
              <th className="dlt-column">Xóa</th>
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()} className="body">
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <>
                <tr
                  {...row.getRowProps()}
                  {...row.getToggleRowExpandedProps()}
                  className="info-base-row"
                  key={i}
                >
                  {row.cells.map((cell, i) => {
                    return (
                      <td
                        {...cell.getCellProps()}
                        className="cell-info"
                        key={i}
                      >
                        {cell.render("Cell")}
                      </td>
                    );
                  })}
                  <td
                    className="cell-info dlt-btn"
                    onClick={() =>
                      handleDelete(executor, row.original.sttOnServer)
                    }
                  >
                    <i className="fas fa-trash-alt"></i>
                  </td>
                </tr>
                {/*
                    If the row is in an expanded state, render a row with a
                    column that fills the entire length of the table.
                  */}
                {row.isExpanded ? (
                  <tr className="all-info">
                    <td colSpan={visibleColumns.length}>
                      {/*
                          Inside it, call our renderRowSubComponent function. In reality,
                          you could pass whatever you want as props to
                          a component like this, including the entire
                          table instance. But for this example, we'll just
                          pass the row
                        */}
                      {/* {renderRowSubComponent({ row })} */}
                      <InputPerson
                        person={row.original.person}
                        setId={setId}
                        setFullName={setFullName}
                        setHometown={setHometown}
                        setPermanent={setPermanent}
                        setTemporary={setTemporary}
                        setReligion={setReligion}
                        setEducationLevel={setEducationLevel}
                        setJob={setJob}
                      />
                      <button
                        onClick={(e) =>
                          handleUpdatePerson(e, row.original.person)
                        }
                        className="update-btn"
                      >
                        Cập nhật
                      </button>
                    </td>
                    <td></td>
                  </tr>
                ) : null}
              </>
            );
          })}
        </tbody>
      </table>
      {/* 
        Pagination can be built however you'd like. 
        This is just a very basic UI implementation:
      */}
      <div className="pagination">
        <button
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
          className="pagination-btn"
        >
          {"<<"}
        </button>{" "}
        <button
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
          className="pagination-btn"
        >
          {"<"}
        </button>{" "}
        <button
          onClick={() => nextPage()}
          disabled={!canNextPage}
          className="pagination-btn"
        >
          {">"}
        </button>{" "}
        <button
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
          className="pagination-btn"
        >
          {">>"}
        </button>{" "}
        <span className="page-now">
          Page{" "}
          <strong>
            {pageIndex + 1} of {pageOptions.length}
          </strong>{" "}
        </span>
        <span className="page-now"> | </span>
        <span className="page-now">
          Go to page:{" "}
          <input
            className="go-to-page"
            type="number"
            defaultValue={pageIndex + 1}
            onChange={(e) => {
              const page = e.target.value ? Number(e.target.value) - 1 : 0;
              gotoPage(page);
            }}
            style={{ width: "100px" }}
          />
        </span>{" "}
        <select
          className="select-amount"
          value={pageSize}
          onChange={(e) => {
            setPageSize(Number(e.target.value));
          }}
        >
          {[10, 20, 30, 40, 50].map((pageSize) => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize}
            </option>
          ))}
        </select>
      </div>
    </>
  );
}
