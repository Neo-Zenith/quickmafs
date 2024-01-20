import { configureStore } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

// Initial state
const initialState = {
  username: null,
  authenticated: false,
  loading: false,
  codeOutput: {
    code: "",
    language: "c",
  },
};

// Reducer function
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_USERNAME":
      return { ...state, username: action.payload };
    case "SET_AUTHENTICATED":
      return { ...state, authenticated: action.payload };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "DISPLAY_CODE_OUTPUT":
      return { ...state, codeOutput: action.payload };
    default:
      return state;
  }
};

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducer);

// Create the Redux store
const store = configureStore({ reducer: persistedReducer });
const persistor = persistStore(store);

export { store, persistor };
