import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  amountPerson: 0,
  unemployedRate: 0,
  dataTowerAge: {
    labels: [
      "80+",
      "75-79",
      "70-74",
      "65-69",
      "60-64",
      "55-59",
      "50-54",
      "45-49",
      "40-44",
      "35-39",
      "30-34",
      "25-29",
      "20-24",
      "15-19",
      "10-14",
      "05-09",
      "0-04",
    ],
    datasets: [
      {
        label: "Nam",
        stack: "Stack 0",
        backgroundColor: "#d41111",
        data: [],
      },
      {
        label: "Nữ",
        stack: "Stack 0",
        backgroundColor: "#3765b0",
        data: [],
      },
    ],
  },

  dataMigration: {
    labels: [""],
    datasets: [
      {
        label: "Từ thành thị về nông thôn",
        data: [0],
        borderColor: "rgb(239, 255, 99)",
        backgroundColor: "rgba(252, 255, 99, 0.5)",
      },
      {
        label: "Từ nông thôn về thành thị",
        data: [0],
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: "Từ thành thị về thành thị",
        data: [0],
        borderColor: "rgb(99, 255, 133)",
        backgroundColor: "rgba(99, 255, 151, 0.5)",
      },
      {
        label: "Từ nông thôn về nông thôn",
        data: [0],
        borderColor: "rgb(99, 141, 255)",
        backgroundColor: "rgba(99, 161, 255, 0.5)",
      },
    ],
  },
  dataRegion: {
    labels: ["Thành thị", "Nông thôn"],
    datasets: [
      {
        label: "# of Votes",
        data: [0, 0],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  },
  dataGender: {
    labels: ["Nữ", "Nam"],
    datasets: [
      {
        label: "S of Votes",
        data: [0, 0],
        backgroundColor: ["rgba(255, 99, 132, 0.2)", "rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  },
  dataReligion: {
    labels: [
      "Kitô Giáo",
      "Phật Giáo",
      "Đạo Tin Lành",
      "Phật Giáo Hòa Hảo",
      "Đạo Cao Đài",
      "Không thuộc tôn giáo nào",
      "Khác",
    ],
    datasets: [
      {
        label: "name",
        data: [3222345, 3855593, 4444754, 443454, 444544, 343544, 34333],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(54, 235, 108, 0.2)",
          "rgba(181, 235, 54, 0.2)",
          "rgba(235, 187, 54, 0.2)",
          "rgba(139, 54, 235, 0.2)",
          "rgba(235, 54, 181, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgb(54, 235, 84)",
          "rgb(202, 235, 54)",
          "rgb(235, 187, 54)",
          "rgb(148, 54, 235)",
          "rgb(245, 87, 245)",
        ],
        borderWidth: 1,
      },
    ],
  },
  dataEducation: {
    labels: ["Thành thị", "Nông thôn", "Toàn quốc"],
    datasets: [
      {
        label: "Nam",
        data: [333, 458, 938],
        backgroundColor: ["rgba(54, 162, 235, 0.2)"],
        borderColor: ["rgba(54, 162, 235, 1)"],
      },
      {
        label: "Nữ",
        data: [292, 348, 648],
        backgroundColor: ["rgba(255, 99, 132, 0.2)"],
        borderColor: ["rgba(255, 99, 132, 1)"],
      },
    ],
  },
  dataAge: {
    labels: ["Nhóm tuổi trẻ em", "Nhóm tuổi lao động", "Nhóm tuổi già"],
    datasets: [
      {
        label: "# of Votes",
        data: [0, 0, 0],
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(54, 235, 108, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgb(54, 235, 84)",
        ],
        borderWidth: 1,
      },
    ],
  },
};

// tạo slice auth chứa actions và reducer
const analysis = createSlice({
  name: "analysis",
  initialState,
  reducers: {
    // các actions
    getDataSuccess(state, action) {
      switch (action.payload.tag) {
        case "GroupAge": {
          state.dataAge.datasets[0].data = action.payload.groupAge.map((k) => Math.round(k*10000)/100);
          break;
        }
        case "Age": {
          state.dataTowerAge.datasets[0].data = action.payload.male.reverse().map((k) => Math.round(k*10000)/100);
          state.dataTowerAge.datasets[1].data = action.payload.female.reverse().map((k) => -Math.round(k*10000)/100);
          break;
        }
        case "Migrate": {
          state.dataMigration.datasets[0].data[0] = Math.round(action.payload.migrate[0] * 10000)/100;
          state.dataMigration.datasets[1].data[0] = Math.round(action.payload.migrate[1] * 10000)/100;
          state.dataMigration.datasets[2].data[0] = Math.round(action.payload.migrate[2] * 10000)/100;
          state.dataMigration.datasets[3].data[0] = Math.round(action.payload.migrate[3] * 10000)/100;
          break;
        }
        case "Region": {
          state.dataRegion.datasets[0].data[0] = Math.round(action.payload.city * 10000)/100;
          state.dataRegion.datasets[0].data[1] = Math.round(action.payload.country * 10000)/100;
          break;
        }
        case "Religion": {
          state.dataReligion.datasets[0].data = action.payload.religion.map((k) => Math.round(k*10000)/100);
          break;
        }
        case "Education": {
          state.dataEducation.datasets[0].data = action.payload.male.map((k) => Math.round(k*10000)/100);
          state.dataEducation.datasets[1].data = action.payload.female.map((k) => Math.round(k*10000)/100);
          break;
        }
        case "Gender": {
          state.dataGender.datasets[0].data[0] = Math.round(action.payload.percentGender[1] * 10000)/100;
          state.dataGender.datasets[0].data[1] = Math.round(action.payload.percentGender[0] * 10000)/100;
          state.amountPerson = action.payload.amountPerson;
          break;
        }
        case "Unemployment": {
          state.unemployedRate = Math.round(action.payload.percentUnemployment * 10000)/100;
          break;
        }
      }
    },
    getDataError(state, action) {
      console.log("get data analysis error");
    },
  },
});

// lấy hàm loginSuccess và loginFailure trong slice để sau khi fetch data thì sử dụng
const { getDataSuccess, getDataError } = analysis.actions;

export const getDataByTag = (executor, tailURL, ids) => async (dispatch) => {
  let URL = "http://localhost:8080/" + executor + "/percent" + tailURL;
  let tag = "";
  if (ids.length > 0) {
    if (ids[0].length === 2) tag = "province";
    if (ids[0].length === 4) tag = "district";
    if (ids[0].length === 6) tag = "ward";
    if (ids[0].length === 8) tag = "village";
  }
  const res = await axios.post(URL,{ ids, tag }, {
    withCredentials: true,
  });
  if (res.data.status === 1) {
    res.data.tag = tailURL;
    dispatch(getDataSuccess(res.data));
  } else {
    dispatch(getDataError(res.data));
  }
};

export default analysis.reducer;
