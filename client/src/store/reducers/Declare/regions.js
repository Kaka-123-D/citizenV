import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {setMessageError} from "../Message";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// khởi tạo state gồm 2 token
// accessToken dùng để duy trì đăng nhập
// refreshToken dùng để
const initialState = {
  regions: [],
};

// tạo slice auth chứa actions và reducer cho admin
const region = createSlice({
  name: "region",
  initialState,
  reducers: {
    // các actions
    declareSuccess(state, action) {
      // console.log(action);
      state.regions.push(action.payload);
      console.log("declare success");
    },
    declareError(state, action) {
      console.log("declare error");
    },
    setRegionList(state, action) {
      state.regions = action.payload.regions;
      console.log("set ProvincesList success", action.payload.regions);
    },
  },
});

// lấy hàm loginSuccess và loginFailure trong slice để sau khi fetch data thì sử dụng
const { declareSuccess, declareError, setRegionList } = region.actions;

// gửi username với password lên server để xác thực
// nếu status của res trả về là 1 thì gọi hàm loginSuccess.
// ngược lại gọi hàm loginFailure
export const declareRegion = (executor, id, type, name, textDes) => async (dispatch) => {
  const URL = "http://localhost:8080/" + executor + "/declare";
  const res = await axios.post(
    URL,
    {
      id,
      type,
      name,
      textDes,
    },
    { withCredentials: true }
  );

  if (res.data.status === 1) {
    const newRegion = { id: id, name: name, textDes: textDes };
    dispatch(declareSuccess(newRegion));
    toast.success("Khai báo thành công");
  } else {
    if (res.data.error.includes("ID")) 
       toast.error("Mã khu vực đã tồn tại !", {
         position: toast.POSITION.TOP_LEFT,
       });
    else if (res.data.error.includes("NAME")) 
       toast.error("Lỗi tên khu vực, mời nhập lại!", {
         position: toast.POSITION.TOP_LEFT,
       });
  }
};

export const setRegionListToState = (executor) => async (dispatch) => {
  let tailURL = "/regions";
  const URL = "http://localhost:8080/" + executor + tailURL;
  const res = await axios.get(URL, { withCredentials: true });
  if (res.data.status === 1) {
    dispatch(setRegionList(res.data));
  } else {
    const data = {regions: []}
    dispatch(setRegionList(data));
  }
};

export default region.reducer;
