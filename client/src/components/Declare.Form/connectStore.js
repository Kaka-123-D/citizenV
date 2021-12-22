import { connect } from "react-redux";
import Form from ".";
import { declareRegion } from "../../store/reducers/Declare/regions";
import { setAlertError } from "../../store/reducers/Message";

const mapStateToProps = (state) => ({
  executor: state.auth.group,
  message: state.message.text,
});

const mapActionToProps = { declareRegion, setAlertError };

export default connect(mapStateToProps, mapActionToProps)(Form);
