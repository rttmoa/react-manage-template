import React, { useEffect } from "react";
import { Tabs } from "antd";
import { Icon } from "@/components/Icon";
import { CSS } from "@dnd-kit/utilities";
import { type DragEndEvent, DndContext, PointerSensor, useSensor } from "@dnd-kit/core";
import { arrayMove, horizontalListSortingStrategy, SortableContext, useSortable } from "@dnd-kit/sortable";
import { useLocation, useMatches, useNavigate } from "react-router-dom";
import { RootState, useDispatch, useSelector } from "@/redux";
import { addTab, removeTab, setTabsList } from "@/redux/modules/tabs";
import { TabsListProp } from "@/redux/interface";
import { MetaProps } from "@/routers/interface";
import MoreButton from "./components/MoreButton";
import "./index.less";

type TargetKey = string | React.MouseEvent<Element, MouseEvent> | React.KeyboardEvent<Element>;

interface DraggableTabPaneProps extends React.HTMLAttributes<HTMLDivElement> {
  "data-node-key": string;
}

// todo 拖拽
const DraggableTabNode = ({ ...props }: DraggableTabPaneProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } = useSortable({
    id: props["data-node-key"]
  });

  const style: React.CSSProperties = {
    ...props.style,
    transform: CSS.Transform.toString(transform && { ...transform, scaleX: 1 }),
    transition
  };

  return React.cloneElement(props.children as React.ReactElement, {
    ref: setNodeRef,
    style,
    ...attributes,
    ...listeners
  });
};

// todo
//  todo Tabs 的增删查
const LayoutTabs: React.FC = () => {
  const matches = useMatches();
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  // console.log("matches", matches);
  // console.log("location", location);
  // console.log("navigate", navigate);

  const path = location.pathname + location.search; // Tabs['activeKey']
  // console.log(path);

  const tabs = useSelector((state: RootState) => state.global.tabs); // 是否显示 Tabs
  const tabsIcon = useSelector((state: RootState) => state.global.tabsIcon); // 是否显示 Tabs图标
  const tabsDrag = useSelector((state: RootState) => state.global.tabsDrag); // 是否 可拖拽
  const tabsList = useSelector((state: RootState) => state.tabs.tabsList);
  const flatMenuList = useSelector((state: RootState) => state.auth.flatMenuList);

  const sensor = useSensor(PointerSensor, { activationConstraint: { distance: 10 } });

  useEffect(() => initTabs(), []);
  const initTabs = () => {
    flatMenuList.forEach(item => {
      if (item.meta?.isAffix && !item.meta.isHide && !item.meta.isFull) {
        const tabValue = {
          icon: item.meta.icon!,
          title: item.meta.title!,
          path: item.path!,
          closable: !item.meta.isAffix
        };
        dispatch(addTab(tabValue));
      }
    });
  };

  // todo 监听路由变化 > addTab()
  useEffect(() => {
    const meta = matches[matches.length - 1].data as MetaProps & { redirect: boolean };
    if (!meta?.redirect) {
      const tabValue = {
        icon: meta.icon!,
        title: meta.title!,
        path: path,
        closable: !meta.isAffix
      };
      // console.log(tabValue);
      dispatch(addTab(tabValue));
    }
  }, [matches]);

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      const activeIndex = tabsList.findIndex(i => i.path === active.id);
      const overIndex = tabsList.findIndex(i => i.path === over?.id);
      dispatch(setTabsList(arrayMove<TabsListProp>(tabsList, activeIndex, overIndex)));
    }
  };

  // Tabs['items']：渲染 tabs
  const items = tabsList.map(item => {
    let tabsItem = {
      key: item.path,
      label: (
        <React.Fragment>
          {tabsIcon && <Icon name={item.icon} />}
          {item.title}
        </React.Fragment>
      ),
      closable: item.closable
    };
    return tabsItem;
  });

  // Tabs['onEdit']： removeTab()
  const onEdit = (targetKey: TargetKey, action: "add" | "remove") => {
    // console.log(action); // add 被隐藏
    if (action === "remove" && typeof targetKey === "string") {
      // path：/assembly/svgIcon   isCurrent：是否当前访问页
      dispatch(removeTab({ path: targetKey, isCurrent: targetKey == path }));
    }
  };

  return (
    <React.Fragment>
      {tabs && (
        <Tabs
          // Tabs-Api：https://ant.design/components/tabs-cn#api
          hideAdd
          type="editable-card"
          className="tabs-box"
          size="middle"
          items={items}
          activeKey={path}
          onEdit={onEdit}
          onChange={(path: string) => navigate(path)}
          tabBarExtraContent={<MoreButton path={path} />}
          {...(tabsDrag && {
            // 拖拽部分
            renderTabBar: (tabBarProps, DefaultTabBar) => (
              <DndContext sensors={[sensor]} onDragEnd={onDragEnd}>
                <SortableContext items={items.map(i => i.key)} strategy={horizontalListSortingStrategy}>
                  <DefaultTabBar {...tabBarProps}>
                    {node => (
                      <DraggableTabNode {...node.props} key={node.key}>
                        {node}
                      </DraggableTabNode>
                    )}
                  </DefaultTabBar>
                </SortableContext>
              </DndContext>
            )
          })}
        />
      )}
    </React.Fragment>
  );
};

export default LayoutTabs;
