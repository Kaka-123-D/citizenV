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
      for (let i = 0; i < state.personList.length; i++) {
        if (state.personList[i].stt === action.payload.stt) {
          state.personList[i] = action.payload;
          console.log("success");
          return;
        }
      }
    },
    updateError(state, action) {
      console.log("error");
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
  const URL = "http://localhost:8080/" + executor + "/personAll";
  const res = await axios.get(URL, { withCredentials: true });

  if (res.data.status === 1) {
    dispatch(getListSuccess(res.data));
  } else {
    dispatch(getListError(res.data));
  }
};

export const getPersonList = (executor, ids) => async (dispatch) => {
  let place = "";
  if (ids.length <= 0) dispatch(getListSuccess([]));
  else if (ids[0].length === 2) place = "Province";
  else if (ids[0].length === 4) place = "District";
  else if (ids[0].length === 6) place = "Ward";
  else if (ids[0].length === 8) place = "Village";
  const URL = "http://localhost:8080/" + executor + "/personBy" + place;
  const res = await axios.post(URL, { ids }, { withCredentials: true });

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
      toast.error("Server đang gặp sự cố. Vui lòng thử lại sau!");
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
      const newPerson = {
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
      };
      dispatch(updateSuccess(newPerson));
      toast.success("Cập nhật thành công");
    } else {
      dispatch(updateError(res.data));
      toast.error("Server đang gặp sự cố. Vui lòng thử lại sau!");
    }
  };

export const deletePerson = (executor, stt) => async (dispatch) => {
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
        toast.error("Server đang gặp sự cố. Vui lòng thử lại sau!");
      }
    });
};

export default person.reducer;
