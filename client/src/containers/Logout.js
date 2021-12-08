import { connect } from "react-redux";
import Logout from "../components/Logout.Button/";
import { logout } from "../store/reducers/Auth/";

const mapStateToProps = (state) => ({});

const mapActionToProps = { logout };

export default connect(mapStateToProps, mapActionToProps)(Logout);
