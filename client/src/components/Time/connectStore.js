import { connect } from "react-redux";
import TimeDeclare from "./declareForm";
import {
  declareTimeStart,
  cancelDeclareTime,
  confirmDeclareComplete,
} from "../../store/reducers/Declare/time";
import {
  setRegionListToState,
  getDataRegionById,
} from "../../store/reducers/Declare/regions";

const mapStateToProps = (state) => ({
  executor: state.auth.group,
  regions: state.region.regions,
  permission: state.auth.permission,
});

const mapActionToProps = {
  declareTimeStart,
  setRegionListToState,
  cancelDeclareTime,
  confirmDeclareComplete,
  getDataRegionById,
};

export default connect(mapStateToProps, mapActionToProps)(TimeDeclare);
