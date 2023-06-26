const { addHygieneError, invalidHygieneId } = require('../constant/err.type')

const { addHygiene, updateHygiene, findHygiene, removeHygiene, restoreHygiene } = require('../service/hygiene.service')

class HygieneController {
  async add(ctx, next) {
    try {
      const res = await addHygiene(ctx.request.body)
      ctx.body = {
        code: 0,
        message: '新增环境卫生信息成功',
        result: res
      }
    } catch (err) {
      console.error(err)
      return ctx.app.emit('error', addHygieneError, ctx)
    }
  }

  async update(ctx, next) {
    try {
      const res = await updateHygiene(ctx.params.id, ctx.request.body)
      if (res) {
        ctx.body = {
          code: 0,
          message: '修改环境卫生信息成功',
          result: ''
        }
      } else {
        return ctx.app.emit('error', invalidHygieneId, ctx)
      }
    } catch (err) {
      console.error(err)
    }
  }

  async find(ctx, next) {
    const { hygiene_code, hygiene_accendant, page = 1, limit = 3 } = ctx.request.query
    // console.log(page, limit)
    const res = await findHygiene({ hygiene_code, hygiene_accendant }, page, limit)
    if (res.list.length < 1) {
      ctx.body = {
        code: 0,
        message: '环境卫生信息为空',
        result: res
      }
    } else {
      ctx.body = {
        code: 0,
        message: '获取环境卫生信息成功',
        result: res
      }
    }

    return res
  }

  async remove(ctx, next) {
    const res = await removeHygiene(ctx.params.id)
    if (res) {
      ctx.body = {
        code: 0,
        message: '删除环境卫生信息成功',
        result: ''
      }
    } else {
      return ctx.app.emit('error', invalidHygieneId, ctx)
    }
  }

  async restore(ctx, next) {
    const res = await restoreHygiene(ctx.params.id)
    if (res) {
      ctx.body = {
        code: 0,
        message: '恢复环境卫生信息成功',
        result: ''
      }
    } else {
      return ctx.app.emit('error', invalidHygieneId, ctx)
    }
  }

  async batchRemove(ctx, next) {
    let Ids
    if (Object.prototype.toString.call(ctx.request.body) === '[object Array]') {
      const ids = ctx.request.body
      Ids = ids
    } else {
      const { ids } = ctx.request.body
      Ids = ids
    }
    console.log('hygienes', Ids)
    let flag = null
    try {
      Ids.forEach(async Id => {
        await removeHygiene(Id)
      })
      ctx.body = {
        code: 0,
        message: '批量删除成功',
        result: ''
      }
    } catch (err) {
      console.error(err)
      return ctx.app.emit('error', invalidHygieneId, ctx)
    }
  }
}

module.exports = new HygieneController()