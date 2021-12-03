import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";

import authReducer from './reducers/auth'

const reducer = combineReducers({
  auth: authReducer,
});

export default configureStore({
  reducer,
});