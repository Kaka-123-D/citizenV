import React from "react";
import ReactDOM from "react-dom";
import Router from "./router/Router";
import { Provider } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import store, { persistor } from "../store/store";
import { PersistGate } from "redux-persist/integration/react";

ReactDOM.render(
  <React.Fragment>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Router />
      </PersistGate>
    </Provider>
  </React.Fragment>,
  document.getElementById("root")
);
