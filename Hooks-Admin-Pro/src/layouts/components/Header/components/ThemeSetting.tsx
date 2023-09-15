import { useDispatch } from "@/redux";
import { setGlobalState } from "@/redux/modules/global";

const ThemeSetting: React.FC = () => {
  const dispatch = useDispatch();

  const setThemeDrawerVisible = () => {
    dispatch(setGlobalState({ key: "themeDrawerVisible", value: true }));
  };

  return <i className="iconfont icon-zhuti" style={{ color: "#ff1717" || "#FFC317" }} onClick={setThemeDrawerVisible}></i>;
};
export default ThemeSetting;
