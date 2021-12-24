import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  dataTowerAge: {
    labels:  [
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
        data: [3222, 3893, 4754],
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
        console.log("action:", action.payload.tag);
      switch (action.payload.tag) {
        case "Age": {
          state.dataTowerAge.datasets[0].data = action.payload.male.reverse();
          state.dataTowerAge.datasets[1].data = action.payload.female.reverse().map((k) => -k);
          break;
        }
        case "Migrate": {
            console.log(action.payload.migrate[0]);
          state.dataMigration.datasets[0].data[0] = action.payload.migrate[0];
          state.dataMigration.datasets[1].data[0] = action.payload.migrate[1];
          state.dataMigration.datasets[2].data[0] = action.payload.migrate[2];
          state.dataMigration.datasets[3].data[0] = action.payload.migrate[3];
          break;
        }
        case "Region": {
          state.dataRegion.datasets[0].data[0] = action.payload.city;
          state.dataRegion.datasets[0].data[1] = action.payload.country;
          break;
        }
        case "Religion": {
          state.dataReligion.datasets[0].data = action.payload.religion;
          break;
        }
        case "Education": {
          state.dataEducation.datasets[0].data = action.payload.male;
          state.dataEducation.datasets[1].data = action.payload.female;
          break;
        }
        case "GroupAge": {
          state.dataAge.datasets[0].data = action.payload.groupAge;
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

export const getDataByTag = (executor, tag) => async (dispatch) => {
  let URL = "http://localhost:8080/" + executor + "/percent" + tag;
  const res = await axios.get(URL, {
    withCredentials: true,
  });
  if (res.data.status === 1) {
    res.data.tag = tag;
    dispatch(getDataSuccess(res.data));
  } else {
    dispatch(getDataError(res.data));
  }
};

export default analysis.reducer;
