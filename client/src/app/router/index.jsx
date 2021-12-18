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
import Chart from "../features/Chart"

export default function routes({ status, executor, resetAuthState }) {
  console.log("status: ", status);
  console.log("group: ", executor);
  if (!document.cookie.includes("sid")) {
    resetAuthState();
  }
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            status === 1 ? (
              executor === "admin" ? (
                <Admin />
              ) : (
                <HomeUser />
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
        <Route path="/chart" element={<Chart />} />

        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </Router>
  );
}
