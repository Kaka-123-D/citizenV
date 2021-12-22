import { connect } from "react-redux";
import Form from ".";
import { declareRegion } from "../../store/reducers/Declare/regions";

const mapStateToProps = (state) => ({
  executor: state.auth.group,
  message: state.message.text,
});

const mapActionToProps = { declareRegion };

export default connect(mapStateToProps, mapActionToProps)(Form);
