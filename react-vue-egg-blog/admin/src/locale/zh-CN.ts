import localeSettings from './zh-CN/settings';
import localeMessageBox from '../components/MessageBox/locale/zh-CN';
import localeSearchTable from '../pages/search-table/locale/zh-CN';
import localeWelcome from '../pages/welcome/locale/zh-CN';
import login from '../pages/login/locale/zh-CN';

export default {
  'menu.welcome': '欢迎页',
  'menu.list': '列表页',
  '文章管理': '文章管理',
  'menu.categories': '分类管理',
  '标签管理': '标签管理',
  '关于管理': '关于管理',
  '用户管理': '用户管理',
  '评论管理': '评论管理',
  '网页配置': '网页配置',
  '主页配置': '主页配置',
  "顶部配置": "顶部配置",
  "侧边配置": "侧边配置",
  'navbar.docs': '文档中心',
  ...localeSettings,
  ...localeMessageBox,
  ...localeSearchTable,
  ...localeWelcome,
  ...login,
};
