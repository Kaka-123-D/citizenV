import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const xoa_dau = (str) => {
  if (!str) return "";
  str = str.replace(/à|á|ạ|ả|ã|â|ầ|ấ|ậ|ẩ|ẫ|ă|ằ|ắ|ặ|ẳ|ẵ/g, "a");
  str = str.replace(/è|é|ẹ|ẻ|ẽ|ê|ề|ế|ệ|ể|ễ/g, "e");
  str = str.replace(/ì|í|ị|ỉ|ĩ/g, "i");
  str = str.replace(/ò|ó|ọ|ỏ|õ|ô|ồ|ố|ộ|ổ|ỗ|ơ|ờ|ớ|ợ|ở|ỡ/g, "o");
  str = str.replace(/ù|ú|ụ|ủ|ũ|ư|ừ|ứ|ự|ử|ữ/g, "u");
  str = str.replace(/ỳ|ý|ỵ|ỷ|ỹ/g, "y");
  str = str.replace(/đ/g, "d");
  str = str.replace(/À|Á|Ạ|Ả|Ã|Â|Ầ|Ấ|Ậ|Ẩ|Ẫ|Ă|Ằ|Ắ|Ặ|Ẳ|Ẵ/g, "A");
  str = str.replace(/È|É|Ẹ|Ẻ|Ẽ|Ê|Ề|Ế|Ệ|Ể|Ễ/g, "E");
  str = str.replace(/Ì|Í|Ị|Ỉ|Ĩ/g, "I");
  str = str.replace(/Ò|Ó|Ọ|Ỏ|Õ|Ô|Ồ|Ố|Ộ|Ổ|Ỗ|Ơ|Ờ|Ớ|Ợ|Ở|Ỡ/g, "O");
  str = str.replace(/Ù|Ú|Ụ|Ủ|Ũ|Ư|Ừ|Ứ|Ự|Ử|Ữ/g, "U");
  str = str.replace(/Ỳ|Ý|Ỵ|Ỷ|Ỹ/g, "Y");
  str = str.replace(/Đ/g, "D");
  return str;
};

export const isEmpty = (str) => {
  if (!str) return false;
  return true;
};

export const deleteSpaceFirst = (str) => {
  return str.trim();
};

export const isNumber = (str) => {
  if (!str.match(/^[0-9]+$/g)) {
    toast.error("Mã khu vực chỉ gồm chữ số!", {
      position: toast.POSITION.TOP_LEFT,
    });
    return false;
  }
  return true;
};

export const validationPassword = (str) => {
  if (
    !str.match(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/g
    )
  )
    return false;
  return true;
};

// input: y/m/dTh:m:s.000Z
export const formatTimeClock = (time) => {
  let date = new Date(time);

  let hour = date.getHours();
  let minute = date.getMinutes();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();

  if (hour.length === 1) hour = "0" + hour;
  if (minute.length === 1) minute = "0" + minute;
  if (day.length === 1) day = "0" + day;
  if (month.length === 1) month = "0" + month;

  let tag = "AM";
  if (hour >= "12") tag = "PM";

  let clock =
    hour + ":" + minute + " " + tag + " - " + day + "/" + month + "/" + year;

  return clock;
};

export const formatCountDownClock = (time) => {
  let date = new Date(time);

  let hour = date.getHours();
  let minute = date.getMinutes();
  let second = date.getSeconds();
  let day = date.getDate();

  if (hour.length === 1) hour = "0" + hour;
  if (minute.length === 1) minute = "0" + minute;
  if (second.length === 1) second = "0" + second;
  if (day.length === 1) day = "0" + day;

  let clock =
    day +
    " Ngày : " +
    hour +
    " Giờ : " +
    minute +
    " Phút : " +
    second +
    " Giây";

  return clock;
};

export const formatBirthday = (time) =>{
  let data = new Date(time);

  let day = data.getDate();
  let month = data.getMonth() + 1;
  let year = data.getFullYear();

  let birthday = day + "/" + month + "/" + year;

  return birthday;
}

export const checkTimePassed = (time) => {
  return new Date(time) <= new Date(Date.now());
};

export const checkFeaturesDeclare = (executor, permission) => {
  if (executor === "b2" || executor==="admin") return false;
  return true;
};

export const checkFeaturesSetTimeDeClare = (executor, permission) => {
  if (executor === "a1") return true;
  if (executor === "b2" || executor === "admin") return false;
  else if (
    permission &&
    checkTimePassed(permission.timeStart) &&
    !checkTimePassed(permission.timeEnd) &&
    !permission.isFinish
  ) {
    return true;
  }
  return false;
};

export const checkFeaturesInputPerson = (executor, permission) => {
  if (
    (executor === "b1" || executor === "b2") &&
    permission &&
    checkTimePassed(permission.timeStart) &&
    !checkTimePassed(permission.timeEnd) &&
    !permission.isFinish
  )
    return true;
  return false;
};

export const checkFeaturesAnalysis = (executor, permission) => {
  if (executor === "b2" || executor === "admin") return false;
  return true;
};
