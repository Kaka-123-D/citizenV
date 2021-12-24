import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {setIsRegisteredByIds} from "../Declare/regions"

const initialState = {};

const newAccount = createSlice({
  name: "newAccount",
  initialState,
  reducers: {
    // các actions
    createAccountSuccess(state, action) {
      console.log("Create Account Success");
    },
    createAccountError(state, action) {
      console.log("Create Account Error");
    },
  },
});

const { createAccountSuccess, createAccountError } = newAccount.actions;

export const createAccountForA1 =
  (username, password, fullName, phone, role, group) => async (dispatch) => {
    let data = { username, password, fullName, phone, role, group };
    const URL = "http://localhost:8080/admin/register";
    const res = await axios.post(URL, data, {
      withCredentials: true,
    });
    if (res.data.status === 1) {
      dispatch(createAccountSuccess());
      
      toast.success("Cấp tài khoản thành công");
    } else {
      dispatch(createAccountError());
      toast.error("Server đang gặp sự cố. Vui lòng thử lại sau!");
    }
  };

export const createAccountForA2toB2 =
  (executor, ids, setArrayId) => async (dispatch) => {
    const URL = "http://localhost:8080/" + executor + "/register";
    const res = await axios.post(
      URL,
      { ids },
      {
        withCredentials: true,
      }
    );
    if (res.data.status === 1) {
      dispatch(createAccountSuccess());
      setArrayId([]);
      dispatch(setIsRegisteredByIds(ids));
      toast.success("Cấp tài khoản thành công");
    } else {
      dispatch(createAccountError());
      toast.error("Server đang gặp sự cố. Vui lòng thử lại sau!");
    }
  };

export default newAccount.reducer;
