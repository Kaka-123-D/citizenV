import { connect } from "react-redux";
import TimeDeclare from "./declareForm";
import {
  declareTimeStart,
  cancelDeclareTime,
} from "../../store/reducers/Declare/time";
import { setRegionListToState } from "../../store/reducers/Declare/regions";

const mapStateToProps = (state) => ({
  executor: state.auth.group,
  regions: state.region.regions,
  permission: state.auth.permission,
  countPermission: state.region.countPermission,
});

const mapActionToProps = { declareTimeStart, setRegionListToState, cancelDeclareTime };

export default connect(mapStateToProps, mapActionToProps)(TimeDeclare);
