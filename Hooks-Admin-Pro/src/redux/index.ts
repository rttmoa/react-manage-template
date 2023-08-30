import { TypedUseSelectorHook, useDispatch as useReduxDispatch, useSelector as useReduxSelector } from "react-redux";
import { configureStore, combineReducers, Middleware, AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist"; // 持久化
import storage from "redux-persist/lib/storage";
import reduxThunk from "redux-thunk";

import global from "./modules/global"; // 设置全局属性：是否黑暗模式，是否色弱模式、侧边栏开关，头部，底部开关
import tabs from "./modules/tabs"; // 存储Tabs、添加Tabs、溢出Tabs、关闭Tabs、关闭其他Tabs、设置Tabs标题
import auth from "./modules/auth"; // 存储权限的侧边栏、存储权限的按钮
import user from "./modules/user"; // 存储用户Token、存储用户个人信息
/** #### TODO: redux配置、全局数据管理、持久化配置  */
// .
// .
// .

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
