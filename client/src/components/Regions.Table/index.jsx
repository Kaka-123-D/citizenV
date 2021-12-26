import React from "react";
import { xoa_dau } from "../../validation";
import "./style.scss";

export default function regionsTable({
  regions,
  handleTickAll,
  tickAll,
  handleAddArrayId,
  textSearch,
}) {
  function selectRow(index, region) {
    let tdStatus = document.getElementsByClassName("tdStatus");

    if (!region.isRegistered) {
      handleAddArrayId(region.id);
      tdStatus[index + 1].checked = !tdStatus[index + 1].checked;
    }
  }

  return (
    <div className="something">
      {Array.isArray(regions) && regions.length == 0 ? (
        <span className="alert">Chưa có khu vực nào được khai báo</span>
      ) : (
        <table className="table-regions">
          <thead>
            <tr className="header">
              <th className="field">Mã</th>
              <th className="field">Tên</th>
              <th className="field">Mô tả</th>
              <th>
                <input
                  type="checkbox"
                  onChange={() => handleTickAll()}
                  checked={tickAll}
                  className="tickBox tdStatus"
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {regions.map((region, index) => {
              let textTemp = region.name;
              if (
                xoa_dau(textTemp)
                  .toLocaleLowerCase()
                  .startsWith(xoa_dau(textSearch).toLocaleLowerCase()) === true
              ) {
                return (
                  <tr key={region.id} className="region-row">
                    <td
                      className="id-column"
                      onClick={() => selectRow(index, region)}
                    >
                      {region.id}
                    </td>
                    <td
                      className="name-column"
                      onClick={() => selectRow(index, region)}
                    >
                      {region.name}
                    </td>
                    <td
                      className="des-column"
                      onClick={() => selectRow(index, region)}
                    >
                      {region.textDes}
                    </td>
                    <td>
                      {region.isRegistered ? (
                        <i className="fas fa-check-circle tdStatus"></i>
                      ) : (
                        <input
                          type="checkbox"
                          className="tickBox tdStatus"
                          onChange={() => handleAddArrayId(region.id)}
                        />
                      )}
                    </td>
                  </tr>
                );
              }
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
