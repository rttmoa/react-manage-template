/* eslint-disable prettier/prettier */
import { Navigate, useRoutes } from "react-router-dom";
import { RouteObject } from "@/routers/interface";
import Login from "@/views/login/index";

// * 导入所有router
const metaRouters = import.meta.globEager("./modules/*.tsx");
// console.log(metaRouters) // {./modules/assembly.tsx: Module, ./modules/dashboard.tsx: Module, ./modules/dataScreen.tsx: Module, …}
// console.log(Object.keys(metaRouters)) // ['./modules/assembly.tsx', './modules/dashboard.tsx', './modules/dataScreen.tsx', './modules/echarts.tsx', …]

// * 处理路由
export const routerArray: RouteObject[] = []; // Route类型的数组(属性类型在RouteObject)
Object.keys(metaRouters).forEach(item => {
	// console.log(item) // 拿到属性名："./modules/assembly.tsx"
	Object.keys(metaRouters[item]).forEach((key: any) => {
		// console.log(key) // 拿到Module的属性值："default"
		// metaRouters[item][key] // 拿到router对象：[{{element: {…}, meta: {…}, children: Array(4)}}] || (3) [{{path: '/403', element: {…}, meta: {…}}}, {…}, {…}]
		routerArray.push(...metaRouters[item][key]);
	});
});
// console.log(routerArray) // 处理结果： (12) [{element: {…}, meta: {…}, children: Array(4)}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]

export const rootRouter: RouteObject[] = [{
		path: "/",
		element: <Navigate to="/login" />
	},
	{
		path: "/login",
		element: <Login />,
		meta: {
			requiresAuth: false,
			title: "登录页",
			key: "login"
		}
	},
	...routerArray,
	{
		path: "*",
		element: <Navigate to="/404" />
}];

const Router = () => useRoutes(rootRouter);

export default Router;
