import React from "react";
import lazyLoad from "@/routers/utils/lazyLoad";
import { LayoutIndex } from "@/routers/constant";
import { RouteObject } from "@/routers/interface";


const articlesRouter: Array<RouteObject> = [
  {
    element: <LayoutIndex />,
    meta: {
      title: "Articles"
    },
    children: [
			// 添加 list
      {	
        path: "/articles/list",
        element: lazyLoad(React.lazy(() => import("@/views/articles/List"))),
        meta: {
          requiresAuth: true,
          title: "List",
          key: "list"
        }
      },
			// 添加 ReactAdminShareBikes
			{	
        path: "/articles/bike",
        element: lazyLoad(React.lazy(() => import("@/views/articles/Bike"))),
        meta: {
          requiresAuth: true,
          title: "bike",
          key: "bike"
        }
      },
			// 添加 夕颜后台
			{	
        path: "/articles/xy",
        element: lazyLoad(React.lazy(() => import("@/views/articles/Xy"))),
        meta: {
          requiresAuth: true,
          title: "xy",
          key: "xy"
        }
      },



    ]
  }
];

export default articlesRouter;
