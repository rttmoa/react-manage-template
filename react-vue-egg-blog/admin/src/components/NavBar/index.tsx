import React from 'react';
import {  Tooltip,  Button,  Avatar,  Select,  Typography,  Dropdown,  Menu,  Space,  Message, } from '@arco-design/web-react';
import { IconSunFill, IconMoonFill } from '@arco-design/web-react/icon';
import { useSelector, useDispatch } from 'react-redux';
import { ReducerState } from '../../redux';
import useLocale from '../../utils/useLocale';
import Logo from '../../assets/logo.svg';
import history from '../../history';
import { logout } from '../../api/login';
import img from "./kaaa.png"
// import MessageBox from '../MessageBox';
import styles from './style/index.module.less';






/***
 * 选择中文/英文-> 全局变量的使用  locale-useContext ?? 使用和封装 
 * 选择中文/英文-> localStorage存储/获取
 * 组件? Space(间距)、 Select(选择)、 Tooltip(文字气泡)、 Dropdown(抽屉)中渲染Menu(菜单)->Menu.Item、 Typography(排版)
 * 右侧 ul>li 渲染三部分、  NavBar结构
 * localStorage.setItem('arco-lang', value);
 * dispatch({ type: 'toggle-theme',payload: { theme: theme === 'light' ? 'dark' : 'light' }, })
 */
function Navbar() {
  const locale = useLocale();/**--- 获取中文/英文 属性名和属性值 ---**/
  // console.log('locale', locale)
  const theme = useSelector((state: ReducerState) => state.global.theme);/**--- REDUX中主题颜色：light、dark ---**/
  const userInfo = useSelector((state: ReducerState) => state.login.userInfo);/**--- REDUX中用户信息：头像、姓名、用户姓名、token ---**/
  const dispatch = useDispatch();
  
  const onMenuItemClick = async (key) => {//key是Menu.Item中的唯一标识
    if (key === 'logout') {
      const res: any = await logout();
      if (res.code === 0) {
        localStorage.removeItem('token');
        localStorage.removeItem('userInfo');
        Message.success(res.msg);
        history.push('/admin/login');
      }
    }
    if (key === 'publish') {
      alert('发布文章功能未实现！')
    }
  };

  return (
    <div className={styles.navbar}>
      {/* 导航栏 左侧 */}
      <div className={styles.left}>
        <Space size={8}>
          <Logo />
          <Typography.Title style={{ margin: 0, fontSize: 18 }} heading={5}> {/* heading：标题级别 */}
            BlogManagementSystem 
          </Typography.Title>
        </Space>
      </div>

      {/* 导航栏 右侧 */}
      <ul className={styles.right}>
        {/* <li>
          <MessageBox />
        </li>
        <li>
          <a>{locale['navbar.docs']}</a>
        </li> */}
        <li>
          <Select
            options={[
              { label: '中文', value: 'zh-CN' },
              { label: 'English', value: 'en-US' },
            ]}
            value={localStorage.getItem('arco-lang')}
            bordered={false}
            triggerProps={{
              autoAlignPopupWidth: false,
              autoAlignPopupMinWidth: true,
              position: 'bl',
            }}
            onChange={(value) => {
              localStorage.setItem('arco-lang', value);
              window.location.reload();
            }}
          />
        </li>
        <li>
          {/* 文字气泡：鼠标悬停、聚焦或点击在某个组件时，弹出的文字提示。 */}
          <Tooltip
          // 如果主题是light 鼠标移动上显示 点击切换为黑暗模式    内容使用全局属性显示中/英文
            content={
              theme === 'light'
                ? locale['settings.navbar.theme.toDark']
                : locale['settings.navbar.theme.toLight']
            }
          >
            <Button
              type="text"
              icon={theme === 'light' ? <IconMoonFill /> : <IconSunFill />}
              onClick={() =>
                dispatch({
                  type: 'toggle-theme',
                  payload: { theme: theme === 'light' ? 'dark' : 'light' },
                })
              }
              style={{ fontSize: 20 }}
            />
          </Tooltip>
        </li>
        {/* 如果userInfo存在  渲染用户结构 */}
        {
          userInfo && (
            <li>
              <Avatar size={24} style={{ marginRight: 8 }}>
                {/* <img alt="avatar" src={userInfo.avatar} /> */}
                <img alt="avatar" src={img} />
              </Avatar>
              {/* 抽屉组件：https://arco.design/react/components/drawer */}
              {/* 悬浮按钮菜单：https://arco.design/react/components/menu */}
              <Dropdown
                trigger="click"
                droplist={
                  <div>
                    <Menu onClickMenuItem={onMenuItemClick}>
                      <Menu.Item key="publish">发布文章</Menu.Item>
                    </Menu>
                    <Menu onClickMenuItem={onMenuItemClick}>
                      <Menu.Item key="logout">退出登录</Menu.Item>
                    </Menu>
                  </div>
                }
              >
                <Typography.Text className={styles.username}>{userInfo.name}</Typography.Text>
              </Dropdown>
            </li>
          )
        }
      </ul>
    </div>
  );
}

export default Navbar;
