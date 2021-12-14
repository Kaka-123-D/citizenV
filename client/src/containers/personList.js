import { connect } from "react-redux";
import PersonList from "../components/Person.List/";
import {
  addPerson,
  updatePerson,
  deletePerson,
  getPersonList,
  getListAllPersonInVN,
} from "../store/reducers/Person/";

const mapStateToProps = (state) => ({
  executor: state.auth.group,
  personList: state.person.personList,
});

const mapActionToProps = {
  addPerson,
  updatePerson,
  deletePerson,
  getPersonList,
  getListAllPersonInVN,
};

export default connect(mapStateToProps, mapActionToProps)(PersonList);
