import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { setPermissionByRegionIds } from "./regions";

const initialState = {
  status: 0,
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
  (executor, ids, timeStart, timeEnd, setArrayId) => async (dispatch) => {
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
      toast.success("Mở thời gian khai báo thành công");
      dispatch(declareSuccess());
      res.data.tag = "declare";
      dispatch(setPermissionByRegionIds(res.data));
      setArrayId([]);
    } else {
      if (res.data.error.includes("TIME")) {
        toast.warning("Thời gian kết thúc vượt quá phạm vi quyền khai báo");
      } else if (res.data.error.includes("ID")) {
        toast.warning("Không thể mở quyển khai báo cho khu vực chưa được cấp tài khoản!");
      } else {
        toast.error("Server đang gặp sự cố. Vui lòng thử lại sau!")
      }
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
    toast.success("Hủy cuộc điều tra thành công");
    dispatch(cancelSuccess());
    dispatch(setPermissionByRegionIds({ id: ids[0], tag: "cancel"}));
  } else {
    toast.error("Server đang gặp sự cố. Vui lòng thử lại sau!");

    dispatch(cancelError(res.data));
  }
};

export const confirmDeclareComplete = (executor) => async (dispatch) => {
  const URL = "http://localhost:8080/" + executor + "/confirmDeclareComplete";
  const res = await axios.put(URL, {}, { withCredentials: true });

  if (res.data.status === 1) {
    toast.success("Đã hoàn thành khai báo");
  } else {
    toast.error("Server đang gặp sự cố. Vui lòng thử lại sau!");
  }
};

export const cancelDeclareComplete = (executor) => async (dispatch) => {
  const URL = "http://localhost:8080/" + executor + "/cancelDeclareComplete";
  const res = await axios.put(URL, {}, { withCredentials: true });

  if (res.data.status === 1) {
    toast.success("Hủy thành công");
  } else {
    toast.error("Server đang gặp sự cố. Vui lòng thử lại sau!");
  }
};

export default timeDeclare.reducer;
