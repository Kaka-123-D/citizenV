import { connect } from "react-redux";
import Select from ".";
import {getRegions} from "../../store/reducers/RegionSelector";
import {setRegionListToState} from "../../store/reducers/Declare/regions";

const mapStateToProps = (state) => ({
  executor: state.auth.group,
  defaultRegions: state.region.regions,
  districts: state.selector.districts,
  wards: state.selector.wards,
});

const mapActionToProps = {
  getRegions,
  setRegionListToState
};

export default connect(mapStateToProps, mapActionToProps)(Select);
