import React, { useEffect } from "react";
import { RootState, useSelector } from "@/redux";
import { MetaProps } from "@/routers/interface";
import { useLoaderData, useLocation, useNavigate } from "react-router-dom";
import { HOME_URL, LOGIN_URL, ROUTER_WHITE_LIST } from "@/config";
interface RouterGuardProps {
  children: React.ReactNode;
}

// todo .
/** #### TODO: （路由守卫组件） */
const RouterGuard: React.FC<RouterGuardProps> = props => {
  const loader = useLoaderData();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  window.$navigate = navigate; // 安装导航，以便在自定义 React 挂钩函数中提供非 React 函数组件或调用

  const token = useSelector((state: RootState) => state.user.token);
  const authMenuList = useSelector((state: RootState) => state.auth.authMenuList);

  useEffect(() => {
    const meta = loader as MetaProps;
    if (meta) {
      const title = import.meta.env.VITE_GLOB_APP_TITLE;
      document.title = meta?.title ? `${meta.title} - ${title}` : title;
    }

    if (ROUTER_WHITE_LIST.includes(pathname)) return; // 路由白名单

    // If there is menu data, token, or login on the accessed page, redirect to the home page
    if (authMenuList.length && token && pathname === LOGIN_URL) {
      return navigate(HOME_URL);
    }

    // If there is not menu data, no token && the accessed page is not login, redirect to the login page
    if (!authMenuList.length && !token && pathname !== LOGIN_URL) {
      return navigate(LOGIN_URL, { replace: true });
    }
  }, [loader]);

  const { children } = props;
  return children;
};

export default RouterGuard;
