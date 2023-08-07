/* eslint-disable prettier/prettier */
import { connect } from "react-redux";
import { useState, useEffect } from "react";
import { HashRouter } from "react-router-dom";
import { ConfigProvider } from "antd";

import { getBrowserLang } from "@/utils/util";								// 获取浏览器语言
import { setLanguage } from "@/redux/modules/global/action";  // 设置Token + 设置程序集 + 设置语言 + 设置主题
import AuthRouter from "@/routers/utils/authRouter";					// 路由守卫组件
import Router from "@/routers/index";													// 路由规则
import useTheme from "@/hooks/useTheme";											// 全局主题设置

import zhCN from "antd/lib/locale/zh_CN";
import enUS from "antd/lib/locale/en_US";
import i18n from "i18next";
import "moment/dist/locale/zh-cn";  




// TODO: 1、获取浏览器默认语言
// TODO: 2、全局主题设置
// TODO: 3、设置国际化语言
// TODO: 4、设置Antd国际化语言
// TODO: 5、设置Redux语言
// TODO: 6、路由守卫组件组件拦截
// TODO: 7、设置路由规则
const App = (props: any) => {
	const { language, assemblySize, themeConfig, setLanguage } = props;
	const [i18nLocale, setI18nLocale] = useState(zhCN);
	useTheme(themeConfig); // FIXME: 全局主题设置  ++++   系统主题 / 黑暗主题 / 灰阶模式 / 色弱模式 
	// console.log(props) // {language: "cn", themeConfig: "middle", themeConfig: {...}, setLanguage: function(), token: "", userInfo:"" }
	// getBrowserLang() // zh-CN

	// 设置 antd 语言国际化
	const setAntdLanguage = () => {
		// 如果 redux 中有默认语言就设置成 redux 的默认语言，没有默认语言就设置成浏览器默认语言
		if (language && language == "zh") return setI18nLocale(zhCN);
		if (language && language == "en") return setI18nLocale(enUS);
		if (getBrowserLang() == "zh") return setI18nLocale(zhCN);
		if (getBrowserLang() == "en") return setI18nLocale(enUS);
	};

	useEffect(() => {
		// 全局使用国际化
		i18n.changeLanguage(language || getBrowserLang());
		setLanguage(language || getBrowserLang());
		setAntdLanguage();
	}, [language]);

	return (
		<HashRouter>
			<ConfigProvider locale={i18nLocale} componentSize={assemblySize}>
				<AuthRouter>
					{/* Router：https://reactrouter.com/en/6.11.1/hooks/use-routes#useroutes */}
					<Router />
				</AuthRouter>
			</ConfigProvider>
		</HashRouter>
	);
}; 
export default connect((state: any) => state.global, { setLanguage })(App);
