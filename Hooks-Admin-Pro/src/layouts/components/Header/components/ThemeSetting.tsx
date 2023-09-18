import { useDispatch } from "@/redux";
import { setGlobalState } from "@/redux/modules/global";
import { Tooltip } from "antd";

const ThemeSetting: React.FC = () => {
  const dispatch = useDispatch();

  const setThemeDrawerVisible = () => {
    dispatch(setGlobalState({ key: "themeDrawerVisible", value: true }));
  };

  return (
    <>
      <Tooltip placement="bottom" title="主题设置" arrow mouseEnterDelay={0.2}>
        <i className="iconfont icon-zhuti" style={{ color: "#178fff" || "#FFC317" }} onClick={setThemeDrawerVisible}></i>
      </Tooltip>
    </>
  );
};
export default ThemeSetting;
