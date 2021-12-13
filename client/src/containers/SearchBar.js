import { connect } from "react-redux";
import SearchBar from "../components/SearchBar/";
import { setRegionListToState } from "../store/reducers/Declare/regions";

const mapStateToProps = (state) => ({
  regions: state.region.regions,
});

const mapActionToProps = { setRegionListToState };

export default connect(mapStateToProps, mapActionToProps)(SearchBar);