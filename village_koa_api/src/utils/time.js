import moment from "moment";

// 获取当前时间24小时制
export const getCurrentTime = () => {
    return moment(Date.now()).format('YYYY-MM-DD HH:mm:ss');
}