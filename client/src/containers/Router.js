import { connect } from "react-redux";
import Router from "../app/router"
import { resetAuthState } from "../store/reducers/Auth";
import {setMessageError} from "../store/reducers/Message"

const mapStateToProps = (state) => ({
  status: state.auth.status,
  executor: state.auth.group,
});

const mapActionToProps = { resetAuthState, setMessageError };

export default connect(mapStateToProps, mapActionToProps)(Router);
