import { connect } from "react-redux";
import ProvideAcc from "../components/Provide.Account";
import {
  createAccountForA1,
  createAccountForA2toB2,
} from "../store/reducers/Provide/newAccount";
import { setRegionListToState } from "../store/reducers/Declare/regions";

const mapStateToProps = (state) => ({
  executor: state.auth.group,
  regions: state.region.regions,
});

const mapActionToProps = {
  createAccountForA1,
  createAccountForA2toB2,
  setRegionListToState,
};

export default connect(mapStateToProps, mapActionToProps)(ProvideAcc);
