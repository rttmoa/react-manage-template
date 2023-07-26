


export const type = {
  SWITCH_MENU: 'SWITCH_MENU'
};



/***--- 切换Menu ---**/
export function switchMenu(menuName) {
  return {
    type: type.SWITCH_MENU,
    menuName
  }
}