const { addLandError, invalidLandId } = require('../constant/err.type')

const { addLand, updateLand, findLand, removeLand, restoreLand } = require('../service/land.service')

class LandController {
  async add(ctx, next) {
    try {
      const res = await addLand(ctx.request.body)
      ctx.body = {
        code: 0,
        message: '新增土地流转信息成功',
        result: res
      }
    } catch (err) {
      console.error(err)
      return ctx.app.emit('error', addLandError, ctx)
    }
  }

  async update(ctx, next) {
    try {
      const res = await updateLand(ctx.params.id, ctx.request.body)
      if (res) {
        ctx.body = {
          code: 0,
          message: '修改土地流转信息成功',
          result: ''
        }
      } else {
        return ctx.app.emit('error', invalidLandId, ctx)
      }
    } catch (err) {
      console.error(err)
    }
  }

  async find(ctx, next) {
    const { land_code, land_transfer_person, land_receive_person, land_transfer_type, page = 1, limit = 3 } = ctx.request.query
    // console.log(page, limit)
    const res = await findLand({ land_code, land_transfer_person, land_receive_person, land_transfer_type }, page, limit)
    if (res.list.length < 1) {
      ctx.body = {
        code: 0,
        message: '土地流转信息为空',
        result: res
      }
    } else {
      ctx.body = {
        code: 0,
        message: '获取土地流转信息成功',
        result: res
      }
    }

    return res
  }

  async remove(ctx, next) {
    const res = await removeLand(ctx.params.id)
    if (res) {
      ctx.body = {
        code: 0,
        message: '删除土地流转信息成功',
        result: ''
      }
    } else {
      return ctx.app.emit('error', invalidLandId, ctx)
    }
  }

  async restore(ctx, next) {
    const res = await restoreLand(ctx.params.id)
    if (res) {
      ctx.body = {
        code: 0,
        message: '恢复土地流转信息成功',
        result: ''
      }
    } else {
      return ctx.app.emit('error', invalidLandId, ctx)
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
    console.log('lands', Ids)
    let flag = null
    try {
      Ids.forEach(async Id => {
        await removeLand(Id)
      })
      ctx.body = {
        code: 0,
        message: '批量删除成功',
        result: ''
      }
    } catch (err) {
      console.error(err)
      return ctx.app.emit('error', invalidLandId, ctx)
    }
  }
}

module.exports = new LandController()