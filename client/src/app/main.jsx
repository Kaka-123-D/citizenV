import React from "react";
import ReactDOM from "react-dom";
import Router from "./routes";
import { Provider } from "react-redux";
import store from "../store/store";
// import App from "../App";

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <Router />
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);
