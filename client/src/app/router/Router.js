import { connect } from "react-redux";
import Router from "."
import { resetAuthState, skipChangePass } from "../../store/reducers/Auth";
import { setAlertError } from "../../store/reducers/Message";
import {confirmDeclareComplete} from "../../store/reducers/Declare/time"
import {addPerson} from "../../store/reducers/Person"

const mapStateToProps = (state) => ({
  status: state.auth.status,
  isFirstLogin: state.auth.isFirstLogin,
  executor: state.auth.group,
  skip: state.auth.skip,
  clickChangePass: state.auth.clickChangePass,
  permission: state.auth.permission,
});

const mapActionToProps = {
  resetAuthState,
  setAlertError,
  skipChangePass,
  confirmDeclareComplete,
  addPerson
};

export default connect(mapStateToProps, mapActionToProps)(Router);
