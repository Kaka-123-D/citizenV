import { connect } from "react-redux";
import Router from "."
import { resetAuthState, skipChangePass } from "../../store/reducers/Auth";
import { setAlertError } from "../../store/reducers/Message";

const mapStateToProps = (state) => ({
  status: state.auth.status,
  isFirstLogin: state.auth.isFirstLogin,
  executor: state.auth.group,
  skip: state.auth.skip,
  clickChangePass: state.auth.clickChangePass,
  permission: state.auth.permission,
});

const mapActionToProps = { resetAuthState, setAlertError, skipChangePass };

export default connect(mapStateToProps, mapActionToProps)(Router);
