import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "../../containers/Login";
import Admin from "../features/Admin/home";
import HomeUser from "../features/Home";
export default function routes({ status, group, resetAuthState }) {
  console.log("status: ", status);
  console.log("group: ", group);
  if (!document.cookie.includes("sid")) {
    resetAuthState();
  }
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={group === "admin" ? <Admin /> : <HomeUser />}
        />
        <Route
          path="/login"
          element={status === 1 ? <Navigate replace to="/admin" /> : <Login />}
        />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </Router>
  );
}
