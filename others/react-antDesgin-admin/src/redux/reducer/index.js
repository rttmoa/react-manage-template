import { type } from '../action';




const initialState = {
  menuName: ['首页']
};


// Redux中menuName默认是首页、但是SiderBarjs中将titleArray传递到redux中、供HeaderBarjs渲染面包屑
export default (state = initialState , action) => {
  switch (action.type) {
    case type.SWITCH_MENU:
      return {
        menuName: action.menuName
      };
    default:
      return state;
  }
}