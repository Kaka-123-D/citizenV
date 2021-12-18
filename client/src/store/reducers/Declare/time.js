import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  status: 0,
  timeRemaining: 0,
};

const timeDeclare = createSlice({
  name: "timeDeclare",
  initialState,
  reducers: {
    // các actions
    declareSuccess(state, action) {
      state.status = 1;
      console.log("declare success");
    },
    declareError(state, action) {
      console.log("declare error");
    },
    cancelSuccess(state, action) {
      console.log("cancel success");
    },
    cancelError(state, action) {
      console.log("cancel error");
    },
  },
});

const { declareSuccess, declareError, cancelSuccess, cancelError } =
  timeDeclare.actions;

export const declareTimeStart =
  (executor, ids, timeStart, timeEnd) => async (dispatch) => {
    const URL = "http://localhost:8080/" + executor + "/grantDeclare";
    const res = await axios.post(
      URL,
      {
        ids,
        timeStart,
        timeEnd,
      },
      { withCredentials: true }
    );

    if (res.data.status === 1) {
      dispatch(declareSuccess());
    } else {
      dispatch(declareError(res.data));
    }
  };

export const cancelDeclareTime = (executor, ids) => async (dispatch) => {
  const URL = "http://localhost:8080/" + executor + "/cancelDeclare";
  const res = await axios.post(
    URL,
    {
      ids,
    },
    { withCredentials: true }
  );

  if (res.data.status === 1) {
    dispatch(cancelSuccess());
  } else {
    dispatch(cancelError(res.data));
  }
};

export const confirmDeclareComplete = (executor) => async (dispatch) => {
  const URL = "http://localhost:8080/" + executor + "/confirmDeclareComplete";
  const res = await axios.put(URL, {}, { withCredentials: true });

  if (res.data.status === 1) {
    console.log("confirm success");
  } else {
    console.log("confirm error");
  }
};

export const cancelDeclareComplete = (executor) => async (dispatch) => {
  const URL = "http://localhost:8080/" + executor + "/cancelDeclareComplete";
  const res = await axios.put(
    URL,
    {
    
    },
    { withCredentials: true }
  );

  if (res.data.status === 1) {
    console.log("cancel success");
  } else {
    console.log("cancel error");
  }
};

export default timeDeclare.reducer;
