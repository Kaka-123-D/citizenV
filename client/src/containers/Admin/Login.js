import { connect } from "react-redux";
import Login from "../../app/features/Admin";
import { login } from "../../store/reducers/Auth/authAdmin";

const mapActionToProps = { login };

export default connect(null, mapActionToProps)(Login);
