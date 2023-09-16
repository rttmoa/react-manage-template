import { useState, useEffect } from "react";
import { RouterProvider as Router, RouteObject, createHashRouter, createBrowserRouter } from "react-router-dom";
import { convertToDynamicRouterFormat } from "./helper/ConvertRouter";
import { wrappedStaticRouter } from "./modules/staticRouter"; // 静态 Router
import { RootState, useSelector } from "@/redux";
import { RouteObjectType } from "./interface";
import useTheme from "@/hooks/useTheme";
import useMessage from "@/hooks/useMessage";
import usePermissions from "@/hooks/usePermissions";
import NotFound from "@/components/Error/404";
const mode = import.meta.env.VITE_ROUTER_MODE;

// todo
// todo 处理主题
// todo 处理全局 Message、Modal、notification
// todo 处理用户权限
// todo finially 处理 <Route />
const RouterProvider: React.FC = () => {
  // useTheme && useMessage
  useTheme();
  useMessage();

  const { initPermissions } = usePermissions();

  const token = useSelector((state: RootState) => state.user.token); // token
  const authMenuList = useSelector((state: RootState) => state.auth.authMenuList); // 接口 》 redux 》 require
  // console.log(authMenuList);
  const [routerList, setRouterList] = useState<RouteObjectType[]>(wrappedStaticRouter);

  useEffect(() => {
    // 刷新页面时，没有菜单数据
    if (!authMenuList.length) {
      initPermissions(token);
      return;
    }

    const dynamicRouter = convertToDynamicRouterFormat(authMenuList); // 转换为 react-router 所需的路由结构
    let allRouter = [...wrappedStaticRouter, ...dynamicRouter];

    allRouter.forEach(item => item.path === "*" && (item.element = <NotFound />)); // 为了防止404刷新页面，在最后添加*路由

    setRouterList(allRouter);
  }, [authMenuList]);

  // console.log(routerList); // 6个static + 3个dynamic
  const routerMode = {
    hash: () => createHashRouter(routerList as RouteObject[]),
    history: () => createBrowserRouter(routerList as RouteObject[])
  };
  return <Router router={routerMode[mode]()} />;
  // Props：<Route path={item.path} exact={item.exact} render={item.render} key={index} component {...props} />
};
// 处理路由，返回 <Route /> 组件
export default RouterProvider;
