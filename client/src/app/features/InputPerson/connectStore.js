import { connect } from "react-redux";
import InputPerson from ".";
import { addPerson } from "../../../store/reducers/Person";

const mapStateToProps = (state) => ({
  executor: state.auth.group,
});

const mapActionToProps = { addPerson };

export default connect(mapStateToProps, mapActionToProps)(InputPerson);
