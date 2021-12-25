import { connect } from "react-redux";
import Map from ".";
import { setRegionListToState } from "../../store/reducers/Declare/regions";

const mapStateToProps = (state) => ({
  executor: state.auth.group,
  regions: state.region.regions,
});

const mapActionToProps = { setRegionListToState };

export default connect(mapStateToProps, mapActionToProps)(Map);
