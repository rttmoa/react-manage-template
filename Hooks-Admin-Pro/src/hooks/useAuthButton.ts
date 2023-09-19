import { RootState, useSelector } from "@/redux";
import { getMenuByPath } from "@/utils";

/**
 * @description  use Hooks 设置auth button
 */
const useAuthButton = () => {
  const authButtonList = useSelector((state: RootState) => state.auth.authButtonList);
  console.log(authButtonList);
  const meta = getMenuByPath()?.meta ?? {};

  let currentPageAuthButton: { [key: string]: boolean } = {};

  authButtonList[meta.key!]?.forEach(item => (currentPageAuthButton[item] = true));

  return {
    BUTTONS: currentPageAuthButton
  };
};

export default useAuthButton;
