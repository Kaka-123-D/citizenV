import { connect } from "react-redux";
import Navbar from ".";
// import { } from "../store/reducers/";
const mapStateToProps = (state) => ({
  executor: state.auth.group,
});

const mapActionToProps = { };

export default connect(mapStateToProps, mapActionToProps)(Navbar);
