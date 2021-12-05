import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";


import authUserReducer from "./reducers/Auth/authUser";
import authAdminReducer from "./reducers/Auth/authAdmin";

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["authUser", "authAdmin"],
};

const reducer = combineReducers({
  authUser: authUserReducer,
  authAdmin: authAdminReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);

export default store;
