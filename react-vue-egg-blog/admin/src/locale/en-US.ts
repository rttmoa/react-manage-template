import localeSettings from './en-US/settings';
import localeMessageBox from '../components/MessageBox/locale/en-US';
import localeSearchTable from '../pages/search-table/locale/en-US';
import localeWelcome from '../pages/welcome/locale/en-US';
import login from '../pages/login/locale/en-US';

export default {
  'menu.welcome': 'Welcome',
  'menu.list': 'List',
  '文章管理': 'Articles',
  'menu.categories': 'Categories',
  '标签管理': 'Tags',
  '关于管理': 'About',
  '用户管理': 'User',
  '评论管理': 'Comment',
  '网页配置': 'PagesConfig',
  '主页配置': 'HomeConfig',
  "顶部配置": "NavConfig",
  "侧边配置": "AsideConfig",
  'navbar.docs': 'Docs',
  ...localeSettings,
  ...localeMessageBox,
  ...localeSearchTable,
  ...localeWelcome,
  ...login,
};
