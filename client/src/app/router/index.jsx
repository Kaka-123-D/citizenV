import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "../features/Login";
import Admin from "../features/Admin/home";
import HomeUser from "../features/Home";
import Declare from "../features/Declare"
import SetTimeDeclare from "../features/SetTimeDeclare";
import Person from "../features/Person"
import InputPerson from "../features/InputPerson";
import { ToastContainer} from "react-toastify";

export default function routes({ status, executor, resetAuthState, setMessageError, isFirstLogin}) {
  if (!document.cookie.includes("sid")) {
    resetAuthState();
  }
  setMessageError(null);
  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              status === 1 ? (
                executor === "admin" ? (
                  <Admin />
                ) : (
                  <HomeUser executor={executor} isFirstLogin={isFirstLogin} />
                )
              ) : (
                <Navigate replace to="/login" />
              )
            }
          />
          <Route
            path="/login"
            element={status === 1 ? <Navigate replace to="/" /> : <Login />}
          />
          <Route path="/declare" element={<Declare />} />
          <Route path="/setTimeDeclare" element={<SetTimeDeclare />} />
          <Route path="/person" element={<Person />} />
          <Route path="/input" element={<InputPerson />} />

          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
      </Router>
      <ToastContainer autoClose={3000} pauseOnFocusLoss={false} limit={3} />
    </>
  );
}
