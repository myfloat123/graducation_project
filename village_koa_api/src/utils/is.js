// 是否为手机号
export function isMobile(number) {
  if (number && /^1(3\d|47|(5[0-3|5-9])|(7[0|7|8])|(8[0-3|5-9]))-?\d{4}-?\d{4}$/.test(number)) {
    if (number.length > 11 || number.length < 11) {
      return false;
    }
    return true;
  } else {
    return false;
  }
}
