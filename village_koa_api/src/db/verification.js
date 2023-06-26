const { ErrorModel } = require('../utils/respond/ResModel');
const { isEmpty, typeOf, modleTypeEqual } = require('../utils/common')

/**
 * 数据校验
 * @param data:用户传的数据
 * @param model:数据库定义的字段
 * @param exclude:本次校验排除的字段(数据库定义为必填。这次校验为非必填，比如注册需要填用户名，登录只需要账号，不需要用户名)
 */
const verification = (data, model, exclude = []) => {
    try {
        // 1. 校验必填
        let keys = Object.keys(model);
        for (let index = 0; index < keys.length; index++) {
            const field = keys[index];
            const allowNull = model[field].allowNull; // 是否为必填
            const verification = model[field].verification;
            // 如果该字段必填
            if (!allowNull && exclude.indexOf(field) === -1) {
                // 前端没传
                if (isEmpty(data[field])) {
                    return {
                        checkSuccess: false,
                        checkResult: new ErrorModel({ message: `${field}:[${model[field].comment}]为必填字段` })
                    }
                } else if (!modleTypeEqual(data[field], model[field])) {
                    return {
                        checkSuccess: false,
                        checkResult: new ErrorModel({ message: `${field}:数据格式错误，传了${typeOf(data[field])}类型，应为${verification}类型` })
                    }
                }
            } else {
                // 如果字段非必填，如果前端传了,就校验格式
                if (!isEmpty(data[field])) {
                    if (!modleTypeEqual(data[field], model[field])) {
                        return {
                            checkSuccess: false,
                            checkResult: new ErrorModel({ message: `${field}:数据格式错误，传了${typeOf(data[field])}类型，应为${verification}类型` })
                        }
                    }
                }
            }
        }
        return {
            checkSuccess: true,
            checkResult: null
        }
    } catch (error) {
        console.log('error', error);

    }
}
module.exports = {
    verification
}