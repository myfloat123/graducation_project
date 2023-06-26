const { addAssistplanError, invalidAssistplanId } = require('../constant/err.type')

const { addAssistplan, findAssistplan, updateAssistplan, removeAssistplan, restoreAssistplan, findOneAssistplan, removeAssistplanByAssistCode, restoreAssistplanByAssistCode } = require('../service/assistplan.service')

const batchRemoveHandler = require('../utils/batchRemoveByIdsHandler')

class AssistplanController {
  async add(ctx, next) {
    try {
      const res = await addAssistplan(ctx.request.body)
      ctx.body = {
        code: 0,
        message: '新增帮扶计划成功',
        result: res
      }
    } catch (err) {
      console.error(err)
      return ctx.app.emit('error', addAssistplanError, ctx)
    }
  }

  async findAll(ctx, next) {
    const { page = 1, limit = 3 } = ctx.request.query

    const res = await findAssistplan(page, limit)
    if (res.list.length < 1) {
      ctx.body = {
        code: 0,
        message: '帮扶计划为空',
        result: res
      }
    } else {
      ctx.body = {
        code: 0,
        message: '获取帮扶计划成功',
        result: res
      }
    }

    return res
  }

  async findOne(ctx, next) {
    // console.log(typeof +ctx.params.id)
    const id = +ctx.params.id
    let res
    if (id) {
      console.log('使用id查询', id)
      res = await findOneAssistplan(id)
    } else {
      console.log('使用assist_code查询', ctx.params.assist_code)
      res = await findOneAssistplan(ctx.params.assist_code)
    }

    // console.log(res)
    try {
      if (res) {
        ctx.body = {
          code: 0,
          message: '查询帮扶计划接口成功',
          result: res.dataValues
        }
      } else {
        return ctx.app.emit('error', invalidAssistplanId, ctx)
      }
    } catch (err) {
      console.error(err)
    }
  }


  async update(ctx, next) {
    console.log(ctx.params.id, ctx.request.body)
    try {
      const res = await updateAssistplan(ctx.params.id, ctx.request.body)
      console.log('修改帮扶计划', res)
      if (res) {
        ctx.body = {
          code: 0,
          message: '修改帮扶计划成功',
          result: ''
        }
      } else {
        return ctx.app.emit('error', invalidAssistplanId, ctx)
      }
    } catch (err) {
      console.error(err)
    }
  }

  async remove(ctx, next) {
    console.log(ctx.params.id)
    const res = await removeAssistplan(ctx.params.id)
    if (res) {
      ctx.body = {
        code: 0,
        message: '删除帮扶计划成功',
        result: ''
      }
    } else {
      return ctx.app.emit('error', invalidAssistplanId, ctx)
    }
  }

  async removeByAssistCode(ctx, next) {
    const res = await removeAssistplanByAssistCode(ctx.params.assist_code)
    console.log(res)
    if (res) {
      ctx.body = {
        code: 0,
        message: '删除帮扶计划成功',
        result: ''
      }
    } else {
      return ctx.app.emit('error', invalidAssistplanId, ctx)
    }
  }

  async restore(ctx, next) {
    const res = await restoreAssistplan(ctx.params.id)
    if (res) {
      ctx.body = {
        code: 0,
        message: '恢复帮扶计划成功',
        result: ''
      }
    } else {
      return ctx.app.emit('error', invalidAssistplanId, ctx)
    }
  }

  async restoreByAssistCode(ctx, next) {
    const res = await restoreAssistplanByAssistCode(ctx.params.assist_code)
    if (res) {
      ctx.body = {
        code: 0,
        message: '恢复帮扶计划成功',
        result: ''
      }
    } else {
      return ctx.app.emit('error', invalidAssistplanId, ctx)
    }
  }

  async batchRemove(ctx, next) {
    const ids = ctx.request.body
    batchRemoveHandler(ctx, ids, removeAssistplan, invalidAssistplanId)

  }

  async batchRemoveByAssistCode(ctx, next) {
    const assist_codes = ctx.request.body
    batchRemoveHandler(ctx, assist_codes, removeAssistplanByAssistCode, invalidAssistplanId)

  }
}

module.exports = new AssistplanController()