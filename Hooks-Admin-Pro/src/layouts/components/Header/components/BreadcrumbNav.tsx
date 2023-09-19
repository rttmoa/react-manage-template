import React, { useEffect, useMemo, useState } from "react";
import { Breadcrumb } from "antd";
import { ItemType } from "antd/es/breadcrumb/Breadcrumb";
import { MetaProps, RouteObjectType } from "@/routers/interface";
import { Link, useMatches } from "react-router-dom";
import { RootState, useSelector } from "@/redux";
import { getAllBreadcrumbList } from "@/utils";
import { Icon } from "@/components/Icon";
import { HOME_URL } from "@/config";

// todo
// todo 处理 面包屑
// http://localhost:9527/#/feat/breadcrumb/children
const BreadcrumbNav: React.FC = () => {
  const matches = useMatches();

  const authMenuList = useSelector((state: RootState) => state.auth.authMenuList);
  const breadcrumb = useSelector((state: RootState) => state.global.breadcrumb); // 是否显示 面包屑
  const breadcrumbIcon = useSelector((state: RootState) => state.global.breadcrumbIcon); // 是否显示 面包屑图标
  // console.log(authMenuList);

  const breadcrumbAllList = useMemo(() => getAllBreadcrumbList(authMenuList), [authMenuList]);
  // console.log(breadcrumbAllList); // Object

  const [curBreadcrumbList, setCurBreadcrumbList] = useState<ItemType[]>([]); // 设置 当前路由的面包屑

  // Render Breadcrumb Title
  const renderTitle = (item: RouteObjectType, isLink: boolean) => {
    const { icon, title } = item.meta || {};
    const content = (
      <>
        <span className="mr5">{breadcrumbIcon && <Icon name={icon!} />}</span>
        <span>{title}</span>
      </>
    );
    return isLink ? <Link to={item.path!}>{content}</Link> : content;
  };

  useEffect(() => {
    const meta = matches[matches.length - 1].data as MetaProps;
    if (!meta?.key) return;
    let breadcrumbList = breadcrumbAllList[meta.key] || [];

    if (breadcrumbList[0]?.path !== HOME_URL) {
      // 处理为面包屑格式：比如； 首页 / 常用功能 / 面包屑 / 平级模式
      breadcrumbList.unshift({ path: HOME_URL, meta: { icon: "HomeOutlined", title: "首页" } }); // 数组头部插入
    }

    // todo 处理成 antd 面包屑需要的格式
    const AsAntdBreadcrumbList = breadcrumbList.map(item => {
      // console.log(item);
      // console.log(breadcrumbList.lastIndexOf(item));
      const isLastElement = breadcrumbList.lastIndexOf(item) === breadcrumbList.length - 1;
      // console.log(isLast); // 最后一个为ture、其他为false

      if (isLastElement) return { title: renderTitle(item, false) }; // 最后一项的面包屑是不能点击的

      if (item.children) {
        // 过滤掉children中有isHide属性的，比如：常用功能》面包屑》平级详情 被隐藏
        const items = item.children.filter(child => !child.meta?.isHide);
        return items.length
          ? {
              dropdownProps: { arrow: { pointAtCenter: true } },
              title: <a>{renderTitle(item, false)}</a>,
              menu: {
                items: items.map(child => {
                  return { title: renderTitle(child, true) };
                })
              }
            }
          : { title: renderTitle(item, true) };
      }

      // Other Breadcrumb
      return { title: renderTitle(item, true) };
    });
    // console.log(AsAntdBreadcrumbList);
    setCurBreadcrumbList(AsAntdBreadcrumbList);
  }, [matches, breadcrumbIcon]);
  // console.log("当前访问页面包屑数组：", curBreadcrumbList);
  // console.log("==============================");
  // Typescript Breadcrumb || https://ant.design/components/breadcrumb-cn#api
  return <>{breadcrumb && <Breadcrumb items={curBreadcrumbList}></Breadcrumb>}</>;
};

export default BreadcrumbNav;
