import { connect } from "react-redux";
import Button from ".";
import { logout } from "../../store/reducers/Auth/";

const mapStateToProps = (state) => ({});

const mapActionToProps = { logout };

export default connect(mapStateToProps, mapActionToProps)(Button);
