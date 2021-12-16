import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import authReducer from "./reducers/Auth/";
import provideAccReducer from "./reducers/Provide/newAccount";
import regionReducer from "./reducers/Declare/regions";
import timeDeclareReducer from "./reducers/Declare/time";
import personReducer from "./reducers/Person/"
import messageReducer from "./reducers/Message"

// const router = routerMiddleware(browserHistory);

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"],
};

const reducer = combineReducers({
  auth: authReducer,
  timeDeclare: timeDeclareReducer,
  provideAcc: provideAccReducer,
  region: regionReducer,
  person: personReducer,
  message: messageReducer,
});

const persistedReducer = persistReducer(persistConfig, reducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export default store;
