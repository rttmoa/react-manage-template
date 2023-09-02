/**
 * Created by wyf on 2017/1/13.
 */

/** #### TODO: 获取Token  */
function getAuthToken(len) {
    let tokenStr = '0123456789abcdefghijklmnopqrstuvwxy';
    let token = '';
    for (let i = 0; i < len; i++) {
        token += tokenStr[Math.floor(Math.random() * tokenStr.length)];
    }
    return token;
}

/** #### TODO: 获取订单号  */
function getOrderNumber(number) {
	return getNumber('MDC', number);
}

/** #### TODO: 获取记录号  */
function getNoteNumber(number) {
	return getNumber('MDS', number);
}

function prefixO(number) { return ('0' + number).substr(-2); }
function prefixOOO(number) { return ('000' + number).substr(-4); }
function getNumber(prefix, number) {
	let date = new Date();
	let year = date.getFullYear();
	let month = prefixO(date.getMonth() + 1);
	let day = prefixO(date.getDate());
	return prefix + year + month + day + (prefixOOO(number));
}


module.exports = {
    getAuthToken: getAuthToken,
    getOrderNumber: getOrderNumber,
	getNoteNumber: getNoteNumber
};
