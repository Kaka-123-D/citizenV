import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

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

export const createAccount =
  (username, password, fullName, phone, role, group) => async (dispatch) => {
    console.log("group on client:", group);
    const res = await axios.post(
      "http://localhost:8080/admin/register",
      { username, password, fullName, phone, role, group },
      {
        withCredentials: true,
      }
    );
    if (res.data.status === 1) {
      dispatch(createAccountSuccess());
    } else {
      dispatch(createAccountError());
    }
  };

export default newAccount.reducer;
