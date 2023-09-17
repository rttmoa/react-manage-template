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

  const breadcrumbAllList = useMemo(() => getAllBreadcrumbList(authMenuList), [authMenuList]);

  const [curBreadcrumbList, setCurBreadcrumbList] = useState<ItemType[]>([]);

  // Render Title
  const renderTitle = (item: RouteObjectType, isLink: boolean) => {
    const { icon, title } = item.meta || {};
    const content = (
      <React.Fragment>
        <span className="mr5">{breadcrumbIcon && <Icon name={icon!} />}</span>
        <span>{title}</span>
      </React.Fragment>
    );
    return isLink ? <Link to={item.path!}>{content}</Link> : content;
  };

  useEffect(() => {
    const meta = matches[matches.length - 1].data as MetaProps;
    if (!meta?.key) return;
    // console.log(matches);
    // console.log(meta);
    // console.log(breadcrumbAllList);
    // console.log(breadcrumbAllList);
    // return
    let breadcrumbList = breadcrumbAllList[meta.key] || [];

    // 首页不需要面包屑，可以删除以下判断
    if (breadcrumbList[0]?.path !== HOME_URL) {
      breadcrumbList.unshift({ path: HOME_URL, meta: { icon: "HomeOutlined", title: "首页" } }); // 数组头部插入
    }

    // 处理成antd面包屑需要的格式
    const antdBreadcrumbList = breadcrumbList.map(item => {
      // console.log(item);
      // console.log(breadcrumbList.lastIndexOf(item));
      const isLast = breadcrumbList.lastIndexOf(item) === breadcrumbList.length - 1;
      // console.log(isLast); // 最后一个为ture、其他为false

      // The last breadcrumb is not clickable （最后的面包屑是不能点击的）
      if (isLast) return { title: renderTitle(item, false) };

      // Render breadcrumb children （渲染面包屑 children）
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

      // Other breadcrumb
      return { title: renderTitle(item, true) };
    });
    // console.log(antdBreadcrumbList);
    setCurBreadcrumbList(antdBreadcrumbList);
  }, [matches, breadcrumbIcon]);
  // console.log("==============================");
  return <React.Fragment>{breadcrumb && <Breadcrumb items={curBreadcrumbList}></Breadcrumb>}</React.Fragment>;
};

export default BreadcrumbNav;
