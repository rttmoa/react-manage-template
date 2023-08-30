import { lazy } from "react";
import { getFlatMenuList } from "@/utils";
import { Navigate } from "react-router-dom";
import { RouteObjectType } from "../interface";
import RouterGuard from "./RouterGuard"; // 路由守卫组件
import LayoutIndex from "@/layouts"; // 布局 Layouts
import LazyComponent from "@/components/Lazy"; // 懒加载 Lazy

// Import all view files in the views directory
const modules = import.meta.glob("@/views/**/*.tsx") as Record<string, Parameters<typeof lazy>[number]>;
// console.log("Views/modules", modules);

/**
 * @description Convert menuList to the format required by react-router
 * @param {Array} authMenuList Permissions menu list
 * @returns {Array} The routing format required by the react-router
 */
export const convertToDynamicRouterFormat = (authMenuList: RouteObjectType[]) => {
  // Flat Routing
  const flatMenuList = getFlatMenuList(authMenuList);
  // console.log(authMenuList); // (14) Array [{…},....]
  // console.log(flatMenuList); // (59) Array [{…},....]

  // .
  // Convert Routing
  const handleMenuList = flatMenuList.map(item => {
    // console.log("item", item);

    item.children && delete item.children;

    // Set redirection component
    if (item.redirect) item.element = <Navigate to={item.redirect} />;

    // Convert element to antd component
    if (item.element && typeof item.element == "string") {
      // console.log(item.element);
      const Component = LazyComponent(lazy(modules["/src/views" + item.element + ".tsx"]));
      item.element = <RouterGuard>{Component}</RouterGuard>;
    }

    // Set loader
    item.loader = () => {
      return { ...item.meta, redirect: !!item.redirect };
    };
    return item;
  });

  const dynamicRouter: RouteObjectType[] = [{ element: <LayoutIndex />, children: [] }];

  // Add to Dynamic routing
  handleMenuList.forEach(item => {
    if (item.meta?.isFull) dynamicRouter.push(item);
    else dynamicRouter[0].children?.push(item);
  });

  return dynamicRouter;
};
