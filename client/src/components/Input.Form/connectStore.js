import { connect } from "react-redux";
import InputPerson from ".";

const mapStateToProps = (state) => ({
  executor: state.auth.group,
});

const mapActionToProps = { };

export default connect(mapStateToProps, mapActionToProps)(InputPerson);
