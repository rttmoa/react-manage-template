/**
 * Created by hanlu on 2017/3/27.
 */
import numeral from 'numeral';



// TODO: 数字可以格式化成货币、百分比、时间，甚至是带有小数点、千分位和缩写
// http://numeraljs.com/
// https://www.jianshu.com/p/d2354456105a
const numberFormat = (number) => numeral(number).format('0,0.00');

export default numberFormat;
