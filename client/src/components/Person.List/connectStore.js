import { connect } from "react-redux";
import List from ".";
import {
  addPerson,
  updatePerson,
  deletePerson,
  getPersonList,
  getListAllPersonInRegion,
} from "../../store/reducers/Person";

const mapStateToProps = (state) => ({
  executor: state.auth.group,
  personList: state.person.personList,
});

const mapActionToProps = {
  addPerson,
  updatePerson,
  deletePerson,
  getPersonList,
  getListAllPersonInRegion,
};

export default connect(mapStateToProps, mapActionToProps)(List);
