import { connect } from "react-redux";
import Declare from "../components/Declare/";
import {
  setRegionListToState,
  declareRegion,
} from "../store/reducers/Declare/regions";

const mapStateToProps = (state) => ({
    regions: state.region.regions,
    declarer: state.auth.group,
}); 

const mapActionToProps = { setRegionListToState, declareRegion };

export default connect(mapStateToProps, mapActionToProps)(Declare);
