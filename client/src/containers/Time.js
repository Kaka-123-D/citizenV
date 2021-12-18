import { connect } from "react-redux";
import TimeDeclare from "../components/Time/declareForm";
import CountDown from "../components/Time/countDown";
import { declareTimeStart } from "../store/reducers/Declare/time";
import { setRegionListToState } from "../store/reducers/Declare/regions";

const mapStateToProps = (state) => ({
  executor: state.auth.group,
  regions: state.region.regions,
});

const mapActionToProps = { declareTimeStart, setRegionListToState };

export default connect(mapStateToProps, mapActionToProps)(TimeDeclare, CountDown);
