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
    ]
  }
];

export default articlesRouter;
