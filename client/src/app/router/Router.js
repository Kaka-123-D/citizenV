import { connect } from "react-redux";
import Router from "."
import { resetAuthState } from "../../store/reducers/Auth";
import {setMessageError} from "../../store/reducers/Message"

const mapStateToProps = (state) => ({
  status: state.auth.status,
  isFirstLogin: state.auth.isFirstLogin,
  executor: state.auth.group,
});

const mapActionToProps = { resetAuthState, setMessageError };

export default connect(mapStateToProps, mapActionToProps)(Router);
