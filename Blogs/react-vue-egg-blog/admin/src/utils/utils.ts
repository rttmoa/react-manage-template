import { colors } from '../const';




/** #### 生成随机数  */
export const randomNum = (m: number, n: number) => {
  return Math.floor(Math.random() * (m - n) + n);
};

/** #### 生成随机颜色  */
export const randomColor = () => {
  return colors[randomNum(1, 13)];
};
