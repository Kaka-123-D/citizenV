import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  dataAge: null,
  dataMigration: null,
  dataRegion: null,
  dataReligion: null,
  dataEducation: null,
  dataTowerAge: null,
};

// tạo slice auth chứa actions và reducer
const analysis = createSlice({
  name: "analysis",
  initialState,
  reducers: {
    // các actions
    getDataSuccess(state, action) {
      switch (action.payload.tag) {
        case "Age": {
          break;
        }
        case "Migrate": {
          break;
        }
        case "Region": {
          break;
        }
        case "Religion": {
          break;
        }
        case "Education": {
          break;
        }
        case "GroupAge": {
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
const { getDataSuccess, getDataError } = auth.actions;

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

export default auth.reducer;
