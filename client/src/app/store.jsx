import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";

import storage from "redux-persist/es/storage";

import {
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import rootReducer from "./rootReducer";


const persistConfig = {
  key: "root",
  storage,
  version:2,
  whitelist: ["userReducer","currentProjectReducer"],
};

const persistedReducer = persistReducer(
  persistConfig,
  rootReducer
);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
        ],
      },
    }),
});

export default store;

export const persistor = persistStore(store);