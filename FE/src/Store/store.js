import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./user";
import { persistReducer, persistStore } from "redux-persist";
import sessionStorage from "redux-persist/lib/storage/session";

const userPersistConfig = {
  key: "user",
  storage: sessionStorage,
  version: 1,
};

const createRootReducer = () => {
  return combineReducers({
    user: persistReducer(userPersistConfig, userReducer),
  });
};

const configureAppStore = () => {
  return configureStore({
    reducer: createRootReducer(),
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: false,
      }),
  });
};

export let store = configureAppStore();
export let persistor = persistStore(store);
