const { format } = require('date-fns');

/**
 * @description: 格式化时间
 * @param {string} str 时间字符串
 */
function timeFormat(str) {
    return format(new Date(str), 'yyyy-MM-dd HH:mm:ss');
}

module.exports = {
    timeFormat,
};