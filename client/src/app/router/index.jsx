import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import Login from "../features/Login";
import Admin from "../features/Admin/home";
import HomeUser from "../features/Home";
import Declare from "../features/Declare";
import SetTimeDeclare from "../features/SetTimeDeclare";
import Person from "../features/Person";
import InputPerson from "../features/InputPerson/connectStore";
import { ToastContainer } from "react-toastify";
import Analysis from "../features/AnalysisData/connectStore";
import ChangePassword from "../../components/ChangePass.Form/connectStore";
import { makeStyles } from "@material-ui/core";
import Navbar from "../../components/NavBar/connectStore";

const useStyles = makeStyles({
  background: (props) => {
    if ((props.isFirstLogin && !props.skip) || props.clickChangePass)
      return { opacity: 0.2 };
  },
});

export default function routes({
  status,
  executor,
  resetAuthState,
  setAlertError,
  isFirstLogin,
  skipChangePass,
  skip,
  clickChangePass,
}) {
  const classes = useStyles({ isFirstLogin, skip, clickChangePass });
  const location = useLocation();

  function handleCancel(event) {
    event.preventDefault();
    skipChangePass();
  }

  if (!document.cookie.includes("sid")) {
    resetAuthState();
  }
  setAlertError(null);
  return (
    <>
      {location.pathname === "/login" ? (
        <Routes>
          <Route
            path="/login"
            element={status === 1 ? <Navigate replace to="/" /> : <Login />}
          />
        </Routes>
      ) : (
        <>
          <div className={classes.background}>
            <Navbar />
            <Routes>
              <Route
                path="/"
                element={
                  status === 1 ? (
                    executor === "admin" ? (
                      <Admin />
                    ) : (
                      <HomeUser
                        executor={executor}
                        isFirstLogin={isFirstLogin}
                        skipChangePass={skipChangePass}
                        skip={skip}
                      />
                    )
                  ) : (
                    <Navigate replace to="/login" />
                  )
                }
              />
              <Route path="/declare" element={<Declare />} />
              <Route path="/setTimeDeclare" element={<SetTimeDeclare />} />
              <Route path="/person" element={<Person />} />
              <Route path="/input" element={<InputPerson />} />
              <Route path="/analysis" element={<Analysis />} />

              <Route path="*" element={<Navigate replace to="/" />} />
            </Routes>
          </div>

          {(!skip && isFirstLogin) || clickChangePass ? (
            <ChangePassword handleCancel={handleCancel} />
          ) : null}
        </>
      )}
      <ToastContainer autoClose={3000} pauseOnFocusLoss={false} limit={3} />
    </>
  );
}
