import { connect } from "react-redux";
import Login from "../../app/features/Login";
import { login } from "../../store/reducers/Auth/authUser";

const mapActionToProps = { login };

export default connect(null, mapActionToProps)(Login);
