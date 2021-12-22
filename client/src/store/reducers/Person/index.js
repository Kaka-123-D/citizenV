import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const initialState = {
  personList: [],
  personGetById: {},
};

const person = createSlice({
  name: "person",
  initialState,
  reducers: {
    // các actions
    getListSuccess(state, action) {
      console.log("get list success");
      state.personList = action.payload.persons;
    },
    getListError(state, action) {
      console.log("get list error");
    },
    getPersonByIdSuccess(state, action) {
      state.personGetById = action.payload.person;
      console.log("get person success");
    },
    addSuccess(state, action) {
      state.personList.push(action.payload);
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
    deletePersonInState(state, action) {
      state.personList = state.personList.filter(
        (person) => person.stt !== action.payload
      );
    },
  },
});

const {
  getListSuccess,
  getListError,
  getPersonByIdSuccess,
  addSuccess,
  addError,
  updateSuccess,
  updateError,
  deletePersonInState,
} = person.actions;

export const getListAllPersonInRegion = (executor) => async (dispatch) => {
  // console.log(document.cookie);
  const URL = "http://localhost:8080/" + executor + "/personAll";
  const res = await axios.get(URL, { withCredentials: true });

  if (res.data.status === 1) {
    dispatch(getListSuccess(res.data));
  } else {
    dispatch(getListError(res.data));
  }
};

export const getPersonList = (executor, place, ids) => async (dispatch) => {
  // let tailURL = "/personByProvince";
  const URL = "http://localhost:8080/" + executor + "/personBy" + place;
  const res = await axios.get(
    URL,
    { params: { ids } },
    { withCredentials: true }
  );

  if (res.data.status === 1) {
    dispatch(getListSuccess(res.data));
  } else {
    dispatch(getListError(res.data));
  }
};

export const getPersonById = (executor, id) => async (dispatch) => {
  const URL = "http://localhost:8080/" + executor + "/personByPersonId";
  const res = await axios.get(
    URL,
    { params: { personId: id } },
    { withCredentials: true }
  );

  if (res.data.status === 1) {
    dispatch(getPersonByIdSuccess(res.data));
  } else {
    console.log("get person failed");
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
    const URL = "http://localhost:8080/" + executor + "/person";
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
      const temp = {
        stt: res.data.stt,
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
      };
      dispatch(addSuccess(temp));
      toast.success("Thêm thành công");
    } else {
      dispatch(addError());
      toast.error("Lỗi gì đó rồi");
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
    const URL = "http://localhost:8080/" + executor + "/person";
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
      toast.success("Cập nhật thành công");
    } else {
      dispatch(updateError(res.data));
      toast.error("Lỗi gì đó rồi");
    }
  };

export const deletePerson = (executor, stt) => async (dispatch) => {
  console.log("helo");
  const URL = "http://localhost:8080/" + executor + "/person";
  fetch(URL, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ stt }),
    credentials: "include",
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status === 1) {
        dispatch(deletePersonInState(stt));
        toast.success("Xóa thành công");
      } else {
        toast.error("Lỗi gì đó rồi");
      }
    });
};

export default person.reducer;
