import React from "react";
import lazyLoad from "@/routers/utils/lazyLoad";
import { LayoutIndex } from "@/routers/constant";
import { RouteObject } from "@/routers/interface";


// dashboard 模块
const dashboardRouter: Array<RouteObject> = [
  {
    element: <LayoutIndex />,
    meta: {
      title: "Dashboard"
    },
    children: [
      //------------------>    TODO: 面板
      {
        path: "/dashboard/dash/dataVisualize",
        element: lazyLoad(React.lazy(() => import("@/views/dashboard/dash/dataVisualize/index"))),
        meta: {
          requiresAuth: true,
          title: "数据可视化",
          key: "dataVisualize"
        }
      },
      {
        path: "/dashboard/dash/embedded",
        element: lazyLoad(React.lazy(() => import("@/views/dashboard/dash/embedded/index"))),
        meta: {
          requiresAuth: true,
          title: "内嵌页面",
          key: "embedded"
        }
      },
			//------------------>    TODO: 错误页面
			{
				path: "/dashboard/403",
				element: lazyLoad(React.lazy(() => import("@/components/ErrorMessage/403"))),
				meta: {
					requiresAuth: true,
					title: "403页面",
					key: "403"
				}
			},
			{
				path: "/dashboard/404",
				element: lazyLoad(React.lazy(() => import("@/components/ErrorMessage/404"))),
				meta: {
					requiresAuth: false,
					title: "404页面",
					key: "404"
				}
			},
			{
				path: "/dashboard/500",
				element: lazyLoad(React.lazy(() => import("@/components/ErrorMessage/500"))),
				meta: {
					requiresAuth: false,
					title: "500页面",
					key: "500"
				}
			},
			//------------------>    TODO: Form 表单
			{
				path: "/dashboard/form/basicForm",
				element: lazyLoad(React.lazy(() => import("@/views/dashboard/form/basicForm/index"))),
				meta: {
					requiresAuth: true,
					title: "基础 Form",
					key: "basicForm"
				}
			},
			{
				path: "/dashboard/form/validateForm",
				element: lazyLoad(React.lazy(() => import("@/views/dashboard/form/validateForm/index"))),
				meta: {
					requiresAuth: true,
					title: "校验 Form",
					key: "validateForm"
				}
			},
			{
				path: "/dashboard/form/dynamicForm",
				element: lazyLoad(React.lazy(() => import("@/views/dashboard/form/dynamicForm/index"))),
				meta: {
					requiresAuth: true,
					title: "动态 Form",
					key: "dynamicForm"
				}
			},
			//------------------>    TODO: 常用组件
			{
				path: "/dashboard/assembly/guide",
				element: lazyLoad(React.lazy(() => import("@/views/dashboard/assembly/guide/index"))),
				meta: {
					requiresAuth: true,
					title: "引导页",
					key: "guide"
				}
			},
			{
				path: "/dashboard/assembly/svgIcon",
				element: lazyLoad(React.lazy(() => import("@/views/dashboard/assembly/svgIcon/index"))),
				meta: {
					requiresAuth: true,
					title: "SVG 图标",
					key: "svgIcon"
				}
			},
			{
				path: "/dashboard/assembly/selectIcon",
				element: lazyLoad(React.lazy(() => import("@/views/dashboard/assembly/selectIcon/index"))),
				meta: {
					requiresAuth: true,
					title: "Icon 选择",
					key: "selectIcon"
				}
			},
			{
				path: "/dashboard/assembly/batchImport",
				element: lazyLoad(React.lazy(() => import("@/views/dashboard/assembly/batchImport/index"))),
				meta: {
					requiresAuth: true,
					title: "批量导入数据",
					key: "selectIcon"
				}
			},
			//------------------>    TODO: 嵌套菜单
			{
        path: "/dashboard/menu/menu1",
        element: lazyLoad(React.lazy(() => import("@/views/menu/menu1/index"))),
        meta: {
          requiresAuth: true,
          title: "菜单1",
          key: "menu1"
        }
      },
      {
        path: "/dashboard/menu/menu2/menu21",
        element: lazyLoad(React.lazy(() => import("@/views/menu/menu2/menu21/index"))),
        meta: {
          requiresAuth: true,
          title: "菜单2-1",
          key: "menu21"
        }
      },
      {
        path: "/dashboard/menu/menu2/menu22/menu221",
        element: lazyLoad(React.lazy(() => import("@/views/menu/menu2/menu22/menu221/index"))),
        meta: {
          requiresAuth: true,
          title: "菜单2-2-1",
          key: "menu221"
        }
      },
      {
        path: "/dashboard/menu/menu2/menu22/menu222",
        element: lazyLoad(React.lazy(() => import("@/views/menu/menu2/menu22/menu222/index"))),
        meta: {
          requiresAuth: true,
          title: "菜单2-2-2",
          key: "menu222"
        }
      },
      {
        path: "/dashboard/menu/menu2/menu23",
        element: lazyLoad(React.lazy(() => import("@/views/menu/menu2/menu23/index"))),
        meta: {
          requiresAuth: true,
          title: "菜单2-3",
          key: "menu23"
        }
      },
      {
        path: "/dashboard/menu/menu3",
        element: lazyLoad(React.lazy(() => import("@/views/menu/menu3/index"))),
        meta: {
          requiresAuth: true,
          title: "菜单3",
          key: "menu3"
        }
      }
    



    ]
  }
];

export default dashboardRouter;
