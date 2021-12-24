import { connect } from "react-redux";
import Analysis from "./index";
import { getDataByTag } from "../../../store/reducers/Analysis";

const mapStateToProps = (state) => ({
    executor: state.auth.group,
    dataAge: state.analysis.dataAge,
    dataMigration: state.analysis.dataMigration,
    dataTowerAge: state.analysis.dataTowerAge,
    dataRegion: state.analysis.dataRegion,
    dataReligion: state.analysis.dataReligion,
    dataEducation: state.analysis.dataEducation,
});

const mapActionToProps = { getDataByTag };

export default connect(mapStateToProps, mapActionToProps)(Analysis);
