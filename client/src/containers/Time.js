import { connect } from "react-redux";
import TimeDeclare from "../components/Time/declareForm";
import CountDown from "../components/Time/countDown";
import { declareTimeStart } from "../store/reducers/Declare/time";

const mapStateToProps = (state) => ({
  executor: state.auth.group,
  regions: state.region.regions,
});

const mapActionToProps = { declareTimeStart };

export default connect(mapStateToProps, mapActionToProps)(TimeDeclare, CountDown);
