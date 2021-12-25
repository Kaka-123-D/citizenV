import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setMessageError } from "../Message";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialState = {
  provinces: [],
  districts: [],
  wards: [],
};

const selector = createSlice({
  name: "selector",
  initialState,
  reducers: {
    // các actions
    setProvinces(state, action) {
      state.provinces = action.payload;
    },
    setDistricts(state, action) {
      state.districts = action.payload;
    },
    setWards(state, action) {
      state.wards = action.payload;
    },
  },
});

// lấy hàm loginSuccess và loginFailure trong slice để sau khi fetch data thì sử dụng
const { setProvinces, setDistricts, setWards } = selector.actions;

export const getRegions = (executor, tag, ids) => async (dispatch) => {
  const URL = "http://localhost:8080/" + executor + "/" + tag;
  fetch(URL, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ ids }),
    credentials: "include",
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status === 1) {
          if (tag === "provinces") dispatch(setProvinces(data.provinces));
          else if (tag === "districts") dispatch(setDistricts(data.districts));
          else if (tag === "wards") dispatch(setWards(data.wards));
      } else {
        //   toast.error("Server đang gặp sự cố. Vui lòng thử lại sau!");
        console.log("get provinces error");
      }
    });
};

export default selector.reducer;
