import { combineReducers, configureStore } from "@reduxjs/toolkit";
import authSlice from "./authSlice";
import jobSlice from "./jobSlice";
import applicationSlice from "./applicationSlice";
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'

// Create localStorage storage - redux-persist v6 requires Promise-based storage
const storage = {
  getItem: (key) => {
    return new Promise((resolve) => {
      if (typeof window !== 'undefined' && window.localStorage) {
        try {
          const value = window.localStorage.getItem(key);
          resolve(value);
        } catch (e) {
          resolve(null);
        }
      } else {
        resolve(null);
      }
    });
  },
  setItem: (key, value) => {
    return new Promise((resolve, reject) => {
      if (typeof window !== 'undefined' && window.localStorage) {
        try {
          window.localStorage.setItem(key, value);
          resolve();
        } catch (e) {
          reject(e);
        }
      } else {
        resolve();
      }
    });
  },
  removeItem: (key) => {
    return new Promise((resolve) => {
      if (typeof window !== 'undefined' && window.localStorage) {
        try {
          window.localStorage.removeItem(key);
        } catch (e) {
          // Ignore errors
        }
      }
      resolve();
    });
  },
}
import companySlice from "./companySlice";
//import applicationSlice from "./applicationSlice";

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
}

const rootReducer = combineReducers({
    auth:authSlice,
    job:jobSlice,
   company:companySlice,
    application:applicationSlice,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)


const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});
export default store;