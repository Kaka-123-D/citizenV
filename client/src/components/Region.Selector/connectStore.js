import { connect } from "react-redux";
import Selector from ".";
import {getRegions} from "../../store/reducers/RegionSelector";

const mapStateToProps = (state) => ({
  executor: state.auth.group,
  provinces: state.selector.provinces,
  districts: state.selector.districts,
  wards: state.selector.wards,
});

const mapActionToProps = { getRegions };

export default connect(mapStateToProps, mapActionToProps)(Selector);
