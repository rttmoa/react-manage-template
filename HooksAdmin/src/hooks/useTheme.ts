/* eslint-disable prettier/prettier */
import defaultTheme from "@/styles/theme/theme-default.less"; // FIXME: 默认主题：系统主题
import darkTheme from "@/styles/theme/theme-dark.less";				// FIXME: 黑暗主题：黑暗主题
import { ThemeConfigProp } from "@/redux/interface";

/**
 * @description 全局主题设置  ++++   系统主题 / 黑暗主题 / 灰阶模式 / 色弱模式 
 * @link filter(滤镜) 属性：https://blog.51cto.com/u_15127662/3445602
 */
const useTheme = (themeConfig: ThemeConfigProp) => {
	const { weakOrGray, isDark } = themeConfig; // { isDark: false, weakOrGray: 'gray' }
	const initTheme = () => {
		// 灰色和弱色切换
		const body = document.documentElement as HTMLElement;
		if (!weakOrGray) body.setAttribute("style", "");
		if (weakOrGray === "weak") body.setAttribute("style", "filter: invert(80%)");		// FIXME: 色弱模式
		if (weakOrGray === "gray") body.setAttribute("style", "filter: grayscale(1)");  // FIXME: 灰阶模式

		// 切换暗黑模式
		let head = document.getElementsByTagName("head")[0];
		const getStyle = head.getElementsByTagName("style");
		if (getStyle.length > 0) {
			for (let i = 0, l = getStyle.length; i < l; i++) {
				if (getStyle[i]?.getAttribute("data-type") === "dark") getStyle[i].remove();
			}
		}
		let styleDom = document.createElement("style");
		styleDom.dataset.type = "dark";
		styleDom.innerHTML = isDark ? darkTheme : defaultTheme;
		head.appendChild(styleDom);
	};
	initTheme(); 


	return {
		initTheme
	};
};

export default useTheme;
