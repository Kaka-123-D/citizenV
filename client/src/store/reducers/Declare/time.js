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
  },
});

const { declareSuccess, declareError} = timeDeclare.actions;

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

export default timeDeclare.reducer;
