/**
 * 基础模块
 */
class BaseModel {
  constructor({ code, data, message }) {
    this.code = code;
    if (data) {
      this.data = data;
    }
    if (message) {
      this.message = message;
    }
  }
}

/**
 * 成功的数据模型
 */
class SuccessModel extends BaseModel {
  constructor(data = {}) {
    super({
      code: 0,
      data,
      message: 'success',
    });
  }
}

/**
 * 失败的数据模型
 */
class ErrorModel extends BaseModel {
  constructor({ message = "", data = {} }) {
    super({
      code: 1,
      data,
      message,
    });
  }
}

module.exports = {
  SuccessModel,
  ErrorModel,
};
