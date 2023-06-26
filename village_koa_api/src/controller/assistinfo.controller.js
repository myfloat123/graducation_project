const { addAssistinfoError, invalidAssistinfoId } = require('../constant/err.type')

const { addAssistinfo, findAssistinfo, updateAssistinfo, removeAssistinfo, restoreAssistinfo, findOneAssistinfo, findMoreAssistinfo } = require('../service/assistinfo.service')

class AssistinfoController {
  async add(ctx, next) {
    try {
      const res = await addAssistinfo(ctx.request.body)
      ctx.body = {
        code: 0,
        message: '新增帮扶信息成功',
        result: res
      }
    } catch (err) {
      console.error(err)
      return ctx.app.emit('error', addAssistinfoError, ctx)
    }
  }

  async findAll(ctx, next) {
    const { page = 1, limit = 3 } = ctx.request.query

    const res = await findAssistinfo(page, limit)
    if (res.list.length < 1) {
      ctx.body = {
        code: 0,
        message: '帮扶信息为空',
        result: res
      }
    } else {
      ctx.body = {
        code: 0,
        message: '获取帮扶信息成功',
        result: res
      }
    }

    return res
  }

  async findOne(ctx, next) {
    const res = await findOneAssistinfo(ctx.params.id)
    // console.log(res);
    try {
      if (res) {
        ctx.body = {
          code: 0,
          message: '查询帮扶信息成功',
          result: res.dataValues
        }
      } else {
        return ctx.app.emit('error', invalidAssistinfoId, ctx)
      }
    } catch (err) {
      console.error(err)
    }
  }

  async findMore(ctx, next) {
    const { recipient, executive_condition, page, limit } = ctx.request.query
    const res = await findMoreAssistinfo({ recipient, executive_condition }, page, limit)
    ctx.body = {
      code: 0,
      message: '获取任意帮扶信息成功',
      result: res
    }
  }

  async update(ctx, next) {
    console.log(ctx.params.id, ctx.request.body)
    try {
      const res = await updateAssistinfo(ctx.params.id, ctx.request.body)
      if (res) {
        ctx.body = {
          code: 0,
          message: '修改帮扶信息成功',
          result: ''
        }
      } else {
        return ctx.app.emit('error', invalidAssistinfoId, ctx)
      }
    } catch (err) {
      console.error(err)
    }
  }

  async remove(ctx, next) {
    console.log(ctx.params.id)
    const res = await removeAssistinfo(ctx.params.id)
    if (res) {
      ctx.body = {
        code: 0,
        message: '删除帮扶信息成功',
        result: ''
      }
    } else {
      return ctx.app.emit('error', invalidAssistinfoId, ctx)
    }
  }

  async restore(ctx, next) {
    const res = await restoreAssistinfo(ctx.params.id)
    if (res) {
      ctx.body = {
        code: 0,
        message: '恢复帮扶信息成功',
        result: ''
      }
    } else {
      return ctx.app.emit('error', invalidAssistinfoId, ctx)
    }
  }

  async batchRemove(ctx, next) {
    console.log(ctx.request.body)
    let Ids
    if (Object.prototype.toString.call(ctx.request.body) === '[object Array]') {
      const ids = ctx.request.body
      Ids = ids
    } else {
      const { ids } = ctx.request.body
      Ids = ids
    }
    console.log('assistinfo', Ids)
    let flag = null
    try {
      Ids.forEach(async Id => {
        await removeAssistinfo(Id)
      })
      ctx.body = {
        code: 0,
        message: '批量删除成功',
        result: ''
      }
    } catch (err) {
      console.error(err)
      return ctx.app.emit('error', invalidAssistinfoId, ctx)
    }
  }
}

module.exports = new AssistinfoController()