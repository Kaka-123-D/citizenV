import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "../features/Login";
import Admin from "../features/Admin/home";
import HomeUser from "../features/Home";
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
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </Router>
  );
}
