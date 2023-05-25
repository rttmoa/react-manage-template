import React from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import { adminRoutes } from "./routes";
import FrameLayout from "./components/Frame/Index";
import { isLogined } from "./utils/auth";
import "./App.css";



function App() {
  // 直接用window.localStorage判断 没有存储到redux中
  return isLogined() ? (
    // Frame：Layout布局 最外部的内容
    <FrameLayout>
      {/* 这个 Switch是 children */}
      <Switch>
        {adminRoutes.map(route => {
          return (
            <Route key={route.path} path={route.path} exact={route.exact}
              render={routeProps => {
                // 渲染主体内容
                return <route.component {...routeProps} />;
              }}
            />
          ); 
        })}
        <Redirect to={adminRoutes[0].path} from="/admin" />
        <Redirect to="/404" />
      </Switch>
    </FrameLayout>
  ) : (<Redirect to="/login" />);
}

export default App;
