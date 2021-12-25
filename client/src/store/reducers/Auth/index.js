import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { setMessageError } from "../Message";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import storage from "redux-persist/lib/storage";
import { delay } from "lodash";

const initialState = {
  group: null,
  status: 0,
  isFirstLogin: null,
  permission: null,
  skip: false,
  clickChangePass: false,
  listLogged: [],
};

// tạo slice auth chứa actions và reducer
const auth = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // các actions
    loginSuccess(state, action) {
      state.status = 1;
      state.group = action.payload.group;
      state.isFirstLogin = action.payload.isFirstLogin;
      state.permission = action.payload.permission;
      if (!state.listLogged.includes(action.payload.username))
        state.listLogged.push(action.payload.username);
    },
    logoutSuccess(state, action) {
      state.status = 0;
      state.group = null;
      state.skip = false;
      state.permission = null;
    },
    logoutFailure(state, action) {
      alert("Logout failed");
    },
    changePasswordSuccess(state, action) {
      state.isFirstLogin = false;
      state.clickChangePass = false;
    },
    setSkip(state, action) {
      state.skip = true;
      state.clickChangePass = false;
    },
    setClickChangePass(state, action) {
      state.clickChangePass = true;
    },
  },
});

// lấy hàm loginSuccess và loginFailure trong slice để sau khi fetch data thì sử dụng
const {
  loginSuccess,
  logoutSuccess,
  logoutFailure,
  changePasswordSuccess,
  setSkip,
  setClickChangePass,
} = auth.actions;

export const skipChangePass = () => (dispatch) => {
  dispatch(setSkip());
};
export const clickChangePass = () => (dispatch) => {
  dispatch(setClickChangePass());
};

// gửi username với password lên server để xác thực
// nếu status của res trả về là 1 thì gọi hàm loginSuccess.
// ngược lại gọi hàm loginFailure
export const login =
  (username, password, keepLogin) => async (dispatch) => {
    const res = await axios.post(
      "http://localhost:8080/login",
      {
        username,
        password,
      },
      { withCredentials: true }
    );

    if (res.data.status === 1) {
      dispatch(
        loginSuccess({
          group: res.data.group,
          isFirstLogin: res.data.isFirstLogin,
          username,
          permission: res.data.permission,
        })
      );
      toast.success("Hello " + res.data.group + ". Chúc 1 ngày vui vẻ");
    } else {
      if (
        res.data.error.includes("PASSWORD") ||
        res.data.error.includes("USERNAME")
      )
        dispatch(setMessageError("Username or password is incorrect"));
      else toast.error("Server đang gặp sự cố. Vui lòng thử lại sau!");
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
    toast.success("Đăng xuất thành công");
  } else {
    dispatch(logoutFailure(res.data));
    toast.error("Server đang gặp sự cố. Vui lòng thử lại sau!");
  }
};

export const changePassword =
  (curPassword, newPassword, navigate, pathname) => async (dispatch) => {
    const res = await axios.put(
      "http://localhost:8080/changePassword",
      { curPassword, newPassword },
      {
        withCredentials: true,
      }
    );
    if (res.data.status === 1) {
      toast.success("Đổi mật khẩu thành công");
      dispatch(changePasswordSuccess());
      navigate(pathname);
    } else {
      if (res.data.error.includes("CURRENT"))
        dispatch(setMessageError("Sai mật khẩu hiện tại!"));
      else toast.error("Server đang gặp sự cố. Vui lòng thử lại sau!");
    }
  };

export const resetAuthState = () => (dispatch) => {
  dispatch(logoutSuccess());
};

export default auth.reducer;
