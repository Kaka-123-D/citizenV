import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

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
      console.log("set ProvincesList success");
    },
  },
});

// lấy hàm loginSuccess và loginFailure trong slice để sau khi fetch data thì sử dụng
const { declareSuccess, declareError, setRegionList } = region.actions;

// gửi username với password lên server để xác thực
// nếu status của res trả về là 1 thì gọi hàm loginSuccess.
// ngược lại gọi hàm loginFailure
export const declareRegion =
  (id, name, textDes, declarer) => async (dispatch) => {
    const URL = "http://localhost:8080/" + declarer + "/declare";
    const res = await axios.post(
      URL,
      {
        id,
        name,
        textDes,
      },
      { withCredentials: true }
    );

    if (res.data.status === 1) {
      const newRegion = {provinceId: id, provinceName: name, textDes: textDes};
      dispatch(declareSuccess(newRegion));
    } else {
      dispatch(declareError(res.data));
    }
  };

export const setRegionListToState = (declarer) => async (dispatch) => {
  let tailURL = "";
  if (declarer === "a1") tailURL = "/regions";
  const URL = "http://localhost:8080/" + declarer + tailURL;
  const res = await axios.get(URL, { withCredentials: true });
  dispatch(setRegionList(res.data));
};

export default region.reducer;
