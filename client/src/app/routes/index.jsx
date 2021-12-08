import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "../../containers/Login";
import Admin from "../features/Admin/home"
import HomeUser from "../features/Home";

export default function routes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomeUser />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="*" element={<Navigate replace to="/" />} />
      </Routes>
    </Router>
  );
}
