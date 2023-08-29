import { TypedUseSelectorHook, useDispatch as useReduxDispatch, useSelector as useReduxSelector } from "react-redux";
import { configureStore, combineReducers, Middleware, AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import reduxThunk from "redux-thunk";
import global from "./modules/global";
import tabs from "./modules/tabs";
import auth from "./modules/auth";
import user from "./modules/user";

// create reducer
const reducer = combineReducers({ global, tabs, auth, user });

// redux persist
const persistConfig = {
  key: "redux-state",
  storage: storage,
  blacklist: ["auth"]
};
const persistReducerConfig = persistReducer(persistConfig, reducer);

// redux middleWares(self configuration)
const middleWares: Middleware[] = [reduxThunk];

// store
export const store = configureStore({
  reducer: persistReducerConfig,
  middleware: middleWares,
  devTools: true
});

// create persist store
export const persistor = persistStore(store);

// redux hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = ThunkDispatch<RootState, any, AnyAction>;
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
export const useDispatch = () => useReduxDispatch<AppDispatch>();
