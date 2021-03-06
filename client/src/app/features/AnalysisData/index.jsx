import React, { useEffect, useState } from "react";
import "./style.scss";
import { optionsMigration, optionsEducation, optionsTowerAge } from "./options";
import SelectRegion from "../../../components/Region.Select/connectStore";
import Chart from "../../../components/HighChartsMap/connectStore";


import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
} from "chart.js";
import { Pie, Bar } from "react-chartjs-2";

ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default function Analysis({
  executor,
  getDataByTag,
  dataAge,
  dataRegion,
  dataReligion,
  dataMigration,
  dataTowerAge,
  dataEducation,
  unemployedRate,
  dataGender,
  amountPerson,
}) {
  const [ids, setIds] = useState([]);
  const [mapData, setMapData] = useState({});
  useEffect(() => {
    import(`../../../assets/json/RegionFile.json`)
      .then((res) => {
        setMapData(res);
      })
      .catch((err) => console.log({ err }));
  }, []);

  useEffect(() => {
    getDataByTag(executor, "Gender", []); // All
    getDataByTag(executor, "Age", []); // All
    getDataByTag(executor, "GroupAge", []); // All
    getDataByTag(executor, "Religion", []); // All
    getDataByTag(executor, "Unemployment", []); // All

    if (executor === "a1") getDataByTag(executor, "Migrate", []); // A1
    if (executor === "a1" || executor === "a2") {
      getDataByTag(executor, "Region", []); // A1, 2
      getDataByTag(executor, "Education", []); // A1, 2
    }
  }, []);

  function handleAnalysis(event) {
    event.preventDefault();
    getDataByTag(executor, "Age", ids); // All
    getDataByTag(executor, "GroupAge", ids); // All
    getDataByTag(executor, "Religion", ids); // All
    getDataByTag(executor, "Gender", ids); // All
    getDataByTag(executor, "Unemployment", ids); // All

    if (executor === "a1") getDataByTag(executor, "Migrate", ids); // A1
    if (executor === "a1" || executor === "a2") {
      getDataByTag(executor, "Region", ids); // A1, 2
      getDataByTag(executor, "Education", ids); // A1, 2
    }
  }

  return (
    <div className="analysis-wrap">
      <div className="map-vn">
        {executor === "a1" ? (
          <>
            <h2> Bản đồ phân bố dân cư VN</h2>
            <Chart mapData={mapData} />
          </>
        ) : null}
      </div>
      <div className="select-bar-group">
        <SelectRegion setIds={setIds} ids={ids} />

        <button
          className="view-btn"
          onClick={(e) => {
            handleAnalysis(e);
          }}
        >
          xem dữ liệu
        </button>
      </div>

      <h1>Tổng số dân trong khu vực: {amountPerson}</h1>
      {amountPerson !== 0 ? (
        <>
          <div className="pie-chart">
            <h2>Chênh lệch giới tính</h2>
            <Pie data={dataGender} className="gender " />
          </div>
          {executor === "a1" || executor === "a2" ? (
            <div className="pie-chart">
              <h2>Phân bố dân cư</h2>
              <Pie data={dataRegion} className="region " />
            </div>
          ) : null}

          <div className="pie-chart">
            <h2>Tỉ trọng cơ cấu nhóm tuổi</h2>
            <Pie data={dataAge} className="age" />
          </div>
          <div className="pie-chart">
            <h2>Biểu đồ tôn giáo</h2>
            <Pie data={dataReligion} className="religion" />
          </div>
          <h2 className="last">Tỉ lệ thất nghiệp: {unemployedRate} %</h2>
          {executor === "a1" ? (
            <div className="horizontal-chart">
              <h2>Luồng di cư và đô thị hóa</h2>
              <Bar
                options={optionsMigration}
                data={dataMigration}
                className="migration"
              />
            </div>
          ) : null}
          <div className="horizontal-chart">
            <h2>Tháp độ tuổi</h2>
            <Bar
              data={dataTowerAge}
              options={optionsTowerAge}
              className="tower-age"
            />
          </div>
          {executor === "a1" || executor === "a2" ? (
            <div className="vertical-chart">
              <h2>
                Tỷ lệ dân số trong độ tuổi đi học phổ thông nhưng không đi học
                phổ thông
              </h2>
              <Bar
                options={optionsEducation}
                data={dataEducation}
                className="education"
              />
            </div>
          ) : null}
        </>
      ) : null}
    </div>
  );
}
