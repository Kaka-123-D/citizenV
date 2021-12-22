import { connect } from "react-redux";
import Form from ".";
import { login } from "../../store/reducers/Auth";
import { setAlertError } from "../../store/reducers/Message";


const mapStateToProps = (state) => ({
    message: state.message.text,
    listLogged: state.auth.listLogged,
});

const mapActionToProps = { login, setAlertError };

export default connect(mapStateToProps, mapActionToProps)(Form);
