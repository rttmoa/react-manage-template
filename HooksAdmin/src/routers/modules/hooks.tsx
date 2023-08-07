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
			// 添加 todos
      {
        path: "/hooks/todos",
        element: lazyLoad(React.lazy(() => import("@/views/hooks/todos"))),
        meta: {
          requiresAuth: true,
          title: "Todos",
          key: "todos"
        }
      },
			// 添加 mobx
      {
        path: "/hooks/mobx",
        element: lazyLoad(React.lazy(() => import("@/views/hooks/mobx"))),
        meta: {
          requiresAuth: true,
          title: "Mobx",
          key: "mobx"
        }
      },
			// 添加 hooks - baby张
			{
        path: "/hooks/hooks1",
        element: lazyLoad(React.lazy(() => import("@/views/hooks/hooks1"))),
        meta: {
          requiresAuth: true,
          title: "Hooks",
          key: "hooks1"
        }
      },
    ]
  }
];

export default menuRouter;
