import { connect } from "react-redux";
import SearchBar from ".";
import { setRegionListToState } from "../../store/reducers/Declare/regions";

const mapStateToProps = (state) => ({
  regions: state.region.regions,
  executor: state.auth.group,
});

const mapActionToProps = { setRegionListToState };

export default connect(mapStateToProps, mapActionToProps)(SearchBar);
