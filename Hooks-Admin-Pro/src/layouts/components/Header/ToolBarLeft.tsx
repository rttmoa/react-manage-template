import CollapseIcon from "./components/CollapseIcon";
import BreadcrumbNav from "./components/BreadcrumbNav";
import "./index.less";

// todo
// todo 头部左侧：展开图标 + 面包屑
const ToolBarLeft: React.FC = () => {
  return (
    <div className="tool-bar-lf mask-image">
      <CollapseIcon />
      <BreadcrumbNav />
    </div>
  );
};

export default ToolBarLeft;
