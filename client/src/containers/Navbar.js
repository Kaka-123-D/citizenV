import { connect } from "react-redux";
import Navbar from "../components/NavBar/";
// import { } from "../store/reducers/";
const mapStateToProps = (state) => ({
  executor: state.auth.group,
});

const mapActionToProps = { };

export default connect(mapStateToProps, mapActionToProps)(Navbar);
