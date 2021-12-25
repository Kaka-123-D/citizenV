import { connect } from "react-redux";
import Navbar from ".";
import { clickChangePass} from "../../store/reducers/Auth";
const mapStateToProps = (state) => ({
  executor: state.auth.group,
  permission: state.auth.permission,
});

const mapActionToProps = { clickChangePass};

export default connect(mapStateToProps, mapActionToProps)(Navbar);
