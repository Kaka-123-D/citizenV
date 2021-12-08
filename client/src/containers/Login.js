import { connect } from "react-redux";
import Login from "../components/Login.Form/";
import { login } from "../store/reducers/Auth/";

const mapStateToProps = (state) => ({});

const mapActionToProps = { login };

export default connect(mapStateToProps, mapActionToProps)(Login);
