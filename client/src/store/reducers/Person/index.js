import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  personList: [],
};

const person = createSlice({
  name: "person",
  initialState,
  reducers: {
    // các actions
    getSuccess(state, action) {
      console.log("get list success");
      state.personList = action.payload.persons;
    },
    getError(state, action) {
      console.log("get list error");
    },
    addSuccess(state, action) {
      console.log("add person success");
    },
    addError(state, action) {
      console.log("add person error");
    },
    updateSuccess(state, action) {
      console.log("update person success");
    },
    updateError(state, action) {
      console.log("update person error");
    },
    deleteSuccess(state, action) {
      console.log("delete person success");
    },
    deleteError(state, action) {
      console.log("delete person error");
    },
  },
});

const {
  getSuccess,
  getError,
  addSuccess,
  addError,
  updateSuccess,
  updateError,
  deleteSuccess,
  deleteError,
} = person.actions;

export const getListAllPersonInRegion = (executor) => async (dispatch) => {
  console.log(document.cookie);
  const URL = "http://localhost:8080/" + executor + "/personAll";
  const res = await axios.get(URL, { withCredentials: true });

  if (res.data.status === 1) {
    dispatch(getSuccess(res.data));
  } else {
    dispatch(getError(res.data));
  }
};

export const getPersonList = (executor, tailURL, ids) => async (dispatch) => {
  // let tailURL = "/personByProvince";
  const URL = "http://localhost:8080/" + executor + tailURL;
  const res = await axios.post(URL, { ids }, { withCredentials: true });

  if (res.data.status === 1) {
    dispatch(getSuccess(res.data));
  } else {
    dispatch(getError(res.data));
  }
};

export const addPerson =
  (
    executor,
    personId,
    fullName,
    birthday,
    sex,
    village,
    thuongTru,
    tamTru,
    religion,
    educationLevel,
    job
  ) =>
  async (dispatch) => {
    let tailURL = "/person";
    const URL = "http://localhost:8080/" + executor + tailURL;
    const res = await axios.post(
      URL,
      {
        personId,
        fullName,
        birthday,
        sex,
        village,
        thuongTru,
        tamTru,
        religion,
        educationLevel,
        job,
      },
      { withCredentials: true }
    );

    if (res.data.status === 1) {
      dispatch(addSuccess(res.data));
    } else {
      dispatch(addError(res.data));
    }
  };

export const updatePerson =
  (
    executor,
    stt,
    personId,
    fullName,
    birthday,
    sex,
    village,
    thuongTru,
    tamTru,
    religion,
    educationLevel,
    job
  ) =>
  async (dispatch) => {
    let tailURL = "/person";
    const URL = "http://localhost:8080/" + executor + tailURL;
    const res = await axios.put(
      URL,
      {
        stt,
        personId,
        fullName,
        birthday,
        sex,
        village,
        thuongTru,
        tamTru,
        religion,
        educationLevel,
        job,
      },
      { withCredentials: true }
    );

    if (res.data.status === 1) {
      dispatch(updateSuccess(res.data));
    } else {
      dispatch(updateError(res.data));
    }
  };

export const deletePerson = (executor, stt) => async (dispatch) => {
  let tailURL = "/person";
  const URL = "http://localhost:8080/" + executor + tailURL;
  const res = await axios.put(
    URL,
    {
      stt,
    },
    { withCredentials: true }
  );

  if (res.data.status === 1) {
    dispatch(deleteSuccess(res.data));
  } else {
    dispatch(deleteError(res.data));
  }
};

export default person.reducer;
