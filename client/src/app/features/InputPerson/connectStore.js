import { connect } from "react-redux";
import InputPerson from ".";
import { addPerson } from "../../../store/reducers/Person";
import {confirmDeclareComplete} from "../../../store/reducers/Declare/time"

const mapStateToProps = (state) => ({
  executor: state.auth.group,
});

const mapActionToProps = { addPerson, confirmDeclareComplete };

export default connect(mapStateToProps, mapActionToProps)(InputPerson);
