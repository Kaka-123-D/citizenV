import { connect } from "react-redux";
import Form from ".";
import { changePassword } from "../../store/reducers/Auth";
import { setAlertError } from "../../store/reducers/Message";

const mapStateToProps = (state) => ({
  message: state.message.text,
});

const mapActionToProps = { changePassword, setAlertError };

export default connect(mapStateToProps, mapActionToProps)(Form);
