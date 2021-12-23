import React from "react";
import Navbar from "../../../components/NavBar/connectStore";
import "./style.scss";
import faker from "faker";
import {dataMigration, dataGender, dataAge, dataReligion, dataEducation, dataTowerAge} from "./data";
import {optionsMigration, optionsEducation, optionsTowerAge} from "./options";
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

export default function Analysis() {
  return (
    <>
      <Navbar />
      <div className="pie-chart">
        <h2>Phân bố dân cư</h2>
        <Pie data={dataGender} className="gender " />
      </div>
      <div className="pie-chart">
        <h2>Tỉ trọng cơ cấu nhóm tuổi</h2>
        <Pie data={dataAge} className="age" />
      </div>
      <div className="pie-chart">
        <h2>Biểu đồ tôn giáo</h2>
        <Pie data={dataReligion} className="religion" />
      </div>

      <div className="horizontal-chart">
        <h2>Luồng di cư và đô thị hóa</h2>
        <Bar
          options={optionsMigration}
          data={dataMigration}
          className="migration"
        />
      </div>
      <div className="horizontal-chart">
          <h2>Tháp độ tuổi</h2>
        <Bar data={dataTowerAge} options={optionsTowerAge} />
      </div>
      <div className="vertical-chart">
        <h2>
          Tỷ lệ dân số trong độ tuổi đi học phổ thông nhưng không đi học phổ
          thông
        </h2>
        <Bar
          options={optionsEducation}
          data={dataEducation}
          className="education"
        />
      </div>
    </>
  );
}
