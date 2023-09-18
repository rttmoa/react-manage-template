import { useEffect, useMemo, useState } from "react";
import { Menu, MenuProps } from "antd";
import { useLocation, useNavigate, useMatches } from "react-router-dom";
import { RouteObjectType, MetaProps } from "@/routers/interface";
import { RootState, useSelector } from "@/redux";
import { shallowEqual } from "react-redux";
import { getOpenKeys } from "@/utils";
import { Icon } from "@/components/Icon";
import "./index.less";

interface LayoutMenuProps {
  mode: MenuProps["mode"]; // Props: "inline" || "horizontal" || "vertical"
  menuList?: RouteObjectType[];
  menuSplit?: boolean;
}

// todo
// todo 菜单逻辑
const LayoutMenu: React.FC<LayoutMenuProps> = ({ mode, menuList, menuSplit }) => {
  const matches = useMatches();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const { layout, isDark, accordion, isCollapse, siderInverted, headerInverted, showMenuList, flatMenuList } = useSelector(
    (state: RootState) => ({
      layout: state.global.layout,
      isDark: state.global.isDark,
      accordion: state.global.accordion,
      isCollapse: state.global.isCollapse,
      siderInverted: state.global.siderInverted,
      headerInverted: state.global.headerInverted,
      showMenuList: state.auth.showMenuList,
      flatMenuList: state.auth.flatMenuList
    }),
    shallowEqual
  );

  const [openKeys, setOpenKeys] = useState<string[]>([]); // todo 当前展开的 SubMenu 菜单项 key 数组
  const [selectedKeys, setSelectedKeys] = useState<string[]>([]); // todo 当前选中的菜单项 key 数组
  const [splitSelectedKeys, setSplitSelectedKeys] = useState<string[]>([]);

  type MenuItem = Required<MenuProps>["items"][number];
  function getItem(
    label: React.ReactNode,
    key?: React.Key | null,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: "group"
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
      type
    } as MenuItem;
  }
  const AsAntdMenu = (list: RouteObjectType[]): MenuItem[] => {
    // console.log(list); // (13)[{…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}, {…}]
    return list.map(item => {
      return !item?.children?.length
        ? getItem(item.meta?.title, item.path, <Icon name={item.meta!.icon!} />)
        : getItem(item.meta?.title, item.path, <Icon name={item.meta!.icon!} />, AsAntdMenu(item.children!));
    });
  };
  // todo Menu['items']：Menu列表结构 （处理菜单为Antd所需要的格式）
  const antdMenuList = useMemo(() => AsAntdMenu(menuList ?? showMenuList), [menuList, showMenuList]);

  useEffect(() => {
    const meta = matches[matches.length - 1].data as MetaProps;
    const path = meta?.activeMenu ?? pathname;
    setSelectedKeys([path]);

    const splitPath = `/${path.split("/")[1]}`;
    const splitKeys = showMenuList.find(item => item.path === splitPath) ? splitPath : path;
    setSplitSelectedKeys([splitKeys]);

    // Use setTimeout to prevent style exceptions from menu expansion
    if (accordion) setTimeout(() => isCollapse || setOpenKeys(getOpenKeys(pathname)));
  }, [matches, isCollapse]);

  // todo Menu['onOpenChange']： SubMenu 展开/关闭的回调
  // Menu['openKeys']：当前展开的 SubMenu 菜单项 key 数组
  const onOpenChange: MenuProps["onOpenChange"] = openKeys => {
    // console.log("SubMenu 展开/关闭的回调");
    // console.log(openKeys);
    if (openKeys.length === 0 || openKeys.length === 1) return setOpenKeys(openKeys);
    const latestOpenKey = openKeys[openKeys.length - 1];
    if (latestOpenKey.includes(openKeys[0])) return setOpenKeys(openKeys);
    setOpenKeys([latestOpenKey]);
  };

  const handleMenuNavigation = (path: string) => {
    const menuItem = flatMenuList.find(item => item.path === path);
    if (menuItem?.meta?.isLink) window.open(menuItem.meta.isLink, "_blank");
    navigate(path);
  };
  // todo Menu['onClick']: 点击事件
  const clickMenu: MenuProps["onClick"] = ({ key }) => {
    // console.log("clickMenu", key);
    if (menuSplit) {
      // 菜单分割：经典模式下
      const children = showMenuList.find(item => item.path === key)?.children;
      if (children?.length) return handleMenuNavigation(children[0].path!);
      handleMenuNavigation(key);
    } else {
      return handleMenuNavigation(key);
    }
  };

  const isClassicLayout = useMemo(() => layout === "classic", [layout]); // 经典布局
  const isTransverseLayout = useMemo(() => layout === "transverse", [layout]);
  // 是否是黑暗模式
  const isDarkTheme = useMemo(() => {
    if (isDark) return true;
    if (headerInverted && isTransverseLayout) return true;
    if (headerInverted && isClassicLayout && menuSplit) return true;
    if (siderInverted && !isTransverseLayout && !menuSplit) return true;
    return false;
  }, [layout, isDark, headerInverted, siderInverted, menuSplit]);

  return (
    <Menu
      // todo Menu-Api：https://ant.design/components/menu-cn#api
      // Menu主题是 Dark
      theme={isDarkTheme ? "dark" : "light"}
      // Props: "inline" || "horizontal" || "vertical"
      mode={mode}
      selectedKeys={menuSplit ? splitSelectedKeys : selectedKeys}
      onClick={clickMenu}
      items={antdMenuList}
      {...(!isTransverseLayout && accordion && { openKeys, onOpenChange })}
    />
  );
};

export default LayoutMenu;
