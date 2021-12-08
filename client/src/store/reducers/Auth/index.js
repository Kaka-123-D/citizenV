import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// khởi tạo state gồm 2 token
// accessToken dùng để duy trì đăng nhập
// refreshToken dùng để
const initialState = {
  group: null,
};

// tạo slice auth chứa actions và reducer cho admin
const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // các actions
    loginSuccess(state, action) {
      state.group = action.payload.group;
      console.log("Login success with ", state.group);
      
    },
    loginFailure(state, action) {
      alert("Login failed");
    },
  },
});

// lấy hàm loginSuccess và loginFailure trong slice để sau khi fetch data thì sử dụng
const { loginSuccess, loginFailure } = auth.actions;

// gửi username với password lên server để xác thực
// nếu status của res trả về là 1 thì gọi hàm loginSuccess.
// ngược lại gọi hàm loginFailure
export const login =
  ({ username, password }) =>
  async (dispatch) => {
    // fetch("https://codersx-swagger.glitch.me/api/auth/login", {
    //   method: "POST",
    //   header: {
    //     "Content-Type":
    //       "application/json",
    //   },
    //   body: JSON.stringify({
    //     email: username,
    //     password: password,
    //   }),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //   dispatch(loginSuccess(data));
    //     // else dispatch(loginFailure(data));
    //   });
    const res = await axios.post(
      "http://localhost:8080/login",
      {
        username,
        password,
      }
    );
    if (res.data.status === 1) {
      dispatch(loginSuccess(res.data));
    } else {
      dispatch(loginFailure(res.data));
    }
  };

export default auth.reducer;
