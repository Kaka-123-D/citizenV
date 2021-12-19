import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setMessageError } from "../Message";
import storage from "redux-persist/lib/storage";

// khởi tạo state gồm 2 token
// accessToken dùng để duy trì đăng nhập
// refreshToken dùng để
const initialState = {
  group: null,
  status: 0,
};

// tạo slice auth chứa actions và reducer cho admin
const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // các actions
    loginSuccess(state, action) {
      state.status = 1;
      state.group = action.payload.group;
      // state.timeSetCookie = Date.now()
      console.log("Login success with ", state.group);
    },
    logoutSuccess(state, action) {
      storage.removeItem("persist:root");
      state.status = 0,
      state.group = null,
      console.log("Logout Success ..");
    },
    logoutFailure(state, action) {
      alert("Logout failed");
    },
  },
});

// lấy hàm loginSuccess và loginFailure trong slice để sau khi fetch data thì sử dụng
const { loginSuccess, logoutSuccess, logoutFailure } = auth.actions;

// gửi username với password lên server để xác thực
// nếu status của res trả về là 1 thì gọi hàm loginSuccess.
// ngược lại gọi hàm loginFailure
export const login =
  ({ username, password }, navigate) =>
  async (dispatch) => {
    const res = await axios.post(
      "http://localhost:8080/login",
      {
        username,
        password,
      },
      { withCredentials: true }
    );

    if (res.data.status === 1) {
      dispatch(loginSuccess(res.data));
      dispatch(setMessageError(null));
      navigate("/" + res.data.group);
    } else {
      dispatch(setMessageError("Username or password is incorrect"));
    }
  };

export const logout = (navigate) => async (dispatch) => {
  const res = await axios.post(
    "http://localhost:8080/logout",
    {},
    {
      withCredentials: true,
    }
  );
  if (res.data.status === 1) {
    dispatch(logoutSuccess(res.data));
    navigate("/login");
  } else {
    dispatch(logoutFailure(res.data));
  }
};

export const changePassword =
  (curPassword, newPassword, navigate) => async (dispatch) => {
    const res = await axios.put(
      "http://localhost:8080/changePassword",
      { curPassword, newPassword },
      {
        withCredentials: true,
      }
    );
    if (res.data.status === 1) {
      console.log("change password success");
      navigate("/");
    } else {
      console.log("change password error");
    }
  };

export const resetAuthState = () => (dispatch) => {
  dispatch(logoutSuccess());
};

export default auth.reducer;
