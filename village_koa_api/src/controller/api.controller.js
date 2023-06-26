const { Controller, Get, Post, ApiInfo, JwtUnless, ApiNoAuthRequired } = require('../libs/koa-action-decorator/index')
const { SuccessModel } = require('../utils/respond/ResModel')
const { syncApis } = require('../service/api.service')

class ApiController {
  async syncApi(ctx) {
    await syncApis()
    ctx.body = new SuccessModel({ msg: '同步成功😊😊😂😂' })
  }
}

module.exports = new ApiController()