import React from "react";
import { setGlobalState } from "@/redux/modules/global";
import { RootState, useSelector, useDispatch } from "@/redux";
import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

// todo 展开关闭 侧边栏
const CollapseIcon: React.FC = () => {
  const dispatch = useDispatch();
  const isCollapse = useSelector((state: RootState) => state.global.isCollapse);

  return (
    // todo React.createElement: https://www.jianshu.com/p/6c6fcc4848d1
    <React.Fragment>
      {React.createElement(isCollapse ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: "collapsed",
        onClick: () => dispatch(setGlobalState({ key: "isCollapse", value: !isCollapse }))
      })}
    </React.Fragment>
  );
};

export default CollapseIcon;
