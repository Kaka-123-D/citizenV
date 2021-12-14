import { connect } from "react-redux";
import Router from "../app/router"
import { resetAuthState } from "../store/reducers/Auth"

const mapStateToProps = (state) => ({
  status: state.auth.status,
  executor: state.auth.group,
});

const mapActionToProps = { resetAuthState };

export default connect(mapStateToProps, mapActionToProps)(Router);
