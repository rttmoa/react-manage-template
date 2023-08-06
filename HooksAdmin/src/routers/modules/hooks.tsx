import React from "react";
import lazyLoad from "@/routers/utils/lazyLoad";
import { LayoutIndex } from "@/routers/constant";
import { RouteObject } from "@/routers/interface";

// menu 模块
const menuRouter: Array<RouteObject> = [
  {
    element: <LayoutIndex />,
    meta: {
      title: "Hooks"
    },
    children: [
      {
        path: "/hooks/todos",
        element: lazyLoad(React.lazy(() => import("@/views/hooks/todos"))),
        meta: {
          requiresAuth: true,
          title: "Todos",
          key: "todos"
        }
      },
       
    ]
  }
];

export default menuRouter;
