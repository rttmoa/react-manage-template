import { useContext } from 'react';
import { GlobalContext } from '../context';






// creatContent和useContext的使用: https://www.shuzhiduo.com/A/Gkz13gNZ5R/
function useLocale() {
  const { locale } = useContext(GlobalContext);
  return locale;
}
export default useLocale;
