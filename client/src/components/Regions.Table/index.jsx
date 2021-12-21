import React from 'react';
import {xoa_dau} from "../../validation";
import "./style.scss"

export default function regionsTable({
  regions,
  handleTickAll,
  tickAll,
  handleAddArrayId,
  textSearch,
}) {
  return (
    <div>
      {Array.isArray(regions) && regions.length == 0 ? (
        <span className="alert">Chưa có khu vực nào được khai báo</span>
      ) : (
        <table className="table-regions">
          <thead>
            <tr>
              <th className="field">Mã</th>
              <th className="field">Tên</th>
              <th className="field">Mô tả</th>
              <th>
                <input
                  type="checkbox"
                  onChange={() => handleTickAll()}
                  checked={tickAll}
                  className="tickBox"
                />
              </th>
            </tr>
          </thead>
          <tbody>
            {regions.map((region) => {
              let textTemp = region.name;
              if (
                xoa_dau(textTemp)
                  .toLocaleLowerCase()
                  .startsWith(xoa_dau(textSearch).toLocaleLowerCase()) === true
              ) {
                return (
                  <tr key={region.id}>
                    <td className="id-column">{region.id}</td>
                    <td className="name-column">{region.name}</td>
                    <td className="des-column">{region.textDes}</td>
                    <td>
                      <input
                        type="checkbox"
                        className="tickBox"
                        onChange={() => handleAddArrayId(region.id)}
                      />
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
