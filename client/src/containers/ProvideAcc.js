import { connect } from "react-redux";
import ProvideAcc from "../components/Provide.Account";
import { createAccount } from "../store/reducers/Provide/newAccount";

const mapStateToProps = (state) => ({});

const mapActionToProps = { createAccount };

export default connect(mapStateToProps, mapActionToProps)(ProvideAcc);
