import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import LoginByUser from "../../containers/User/Login";
import LoginByAdmin from "../../containers/Admin/Login";
import Home from "../features/Home";

export default function routes(){
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LoginByUser />} />
          <Route path="/admin" exact element={<LoginByAdmin />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
    </Router>
  )
}
