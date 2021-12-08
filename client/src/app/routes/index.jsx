import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "../../containers/Login";
import Home from "../features/Home";

export default function routes(){
  return (
    <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate replace to="/" />} />
        </Routes>
    </Router>
  )
}
