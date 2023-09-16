import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "@/redux/interface";
import { getFlatMenuList, getShowMenuList } from "@/utils";

const authState: AuthState = {
  // 菜单权限列表
  authMenuList: [],
  // 菜单权限列表 ==> 左侧菜单栏渲染，需要移除 isHide == true
  showMenuList: [],
  // 菜单权限列表 ==> 扁平化一维数组菜单，主要用于添加动态路由
  flatMenuList: [],
  // 按钮权限列表
  authButtonList: {}
};

const authSlice = createSlice({
  name: "hooks-auth",
  initialState: authState,
  reducers: {
    setAuthButtonList(state, { payload }: PayloadAction<AuthState["authButtonList"]>) {
      state.authButtonList = payload;
    },
    setAuthMenuList(state, { payload }: PayloadAction<AuthState["authMenuList"]>) {
      state.authMenuList = payload;
      state.flatMenuList = getFlatMenuList(payload);
      state.showMenuList = getShowMenuList(payload);
    }
  }
});

export const { setAuthButtonList, setAuthMenuList } = authSlice.actions;
export default authSlice.reducer;
