import { connect } from "react-redux";
import Form from ".";
import { login } from "../../store/reducers/Auth";

const mapStateToProps = (state) => ({
    message: state.message.text,
});

const mapActionToProps = { login };

export default connect(mapStateToProps, mapActionToProps)(Form);
