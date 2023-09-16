import React from "react";
import { Watermark } from "antd";
import { RootState, useSelector } from "@/redux";
import LayoutVertical from "./LayoutVertical";
import LayoutClassic from "./LayoutClassic";
import LayoutTransverse from "./LayoutTransverse";
import LayoutColumns from "./LayoutColumns";
import ThemeDrawer from "@/layouts/components/ThemeDrawer"; // todo 侧边 主题配置

// todo
// todo Layout
// todo 懒加载在router中提前处理
const LayoutIndex: React.FC = () => {
  const layout = useSelector((state: RootState) => state.global.layout); // vertical | classic | transverse | columns
  const watermark = useSelector((state: RootState) => state.global.watermark);
  // console.log(layout); // vertical | classic | transverse | columns

  const LayoutComponents = {
    vertical: <LayoutVertical />, //------ 纵向
    classic: <LayoutClassic />, //-------- 经典
    transverse: <LayoutTransverse />, //-- 横向
    columns: <LayoutColumns /> //--------- 分栏
  };

  return (
    <Watermark className="watermark-content" zIndex={1001} content={watermark ? ["Hooks Admin", "Happy Working"] : []}>
      {LayoutComponents[layout]}
      <ThemeDrawer />
    </Watermark>
  );
};

export default LayoutIndex;
