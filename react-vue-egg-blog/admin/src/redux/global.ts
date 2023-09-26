import defaultSettings from '../settings.json';

const defaultTheme = localStorage.getItem('arco-theme') || 'light';





function changeTheme(newTheme?: 'string') {
  // 暗黑模式：https://arco.design/react/docs/dark
  if ((newTheme || defaultTheme) === 'dark') document.body.setAttribute('arco-theme', 'dark'); 
  else document.body.removeAttribute('arco-theme');
}
// 初始化主题 / 切换主题 ( light / dark )
changeTheme();



export interface GlobalState {
  theme?: string;
  settings?: typeof defaultSettings;
  collapsed?: boolean;
  userInfo?: {
    name?: string;
    avatar?: string;
    job?: string;
    organization?: string;
    location?: string;
    email?: string;
  };
}
const initialState: GlobalState = {
  theme: defaultTheme,
  settings: defaultSettings,
  collapsed: false,
  userInfo: {
    name: 'never',
    avatar: 'http://nevergiveupt.top:3000/static/mine.d0f112df.jpeg',
  },
};
export default function(state = initialState, action) {
  switch (action.type) {
    // 切换主题
    case 'toggle-theme': {
      const { theme } = action.payload;
      if (theme === 'light' || theme === 'dark') {
        localStorage.setItem('arco-theme', theme);
        changeTheme(theme);
      }
      return {
        ...state,
        theme,
      };
    }
    // 页面配置
    case 'update-settings': {
      const { settings } = action.payload; // settings: {colorWeek: false, navbar: true, menu: true, footer: true, themeColor: '#165DFF', …}
      return {
        ...state,
        settings,
      };
    }
    // 展开关闭折叠
    case 'TOGGLE_COLLAPSED': { 
      return {
        ...state,
        collapsed: action.payload, // true / false
      };
    }
    default:
      return state;
  }
}
