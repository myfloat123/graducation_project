const { addHousebuildError, invalidHousebuildId } = require('../constant/err.type')

const { addHousebuild, updateHousebuild, findHousebuild, removeHousebuild, restoreHousebuild } = require('../service/housebuild.service')

class HousebuildController {
  async add(ctx, next) {
    try {
      const res = await addHousebuild(ctx.request.body)
      ctx.body = {
        code: 0,
        message: '新增房屋建筑信息成功',
        result: res
      }
    } catch (err) {
      console.error(err)
      return ctx.app.emit('error', addHousebuildError, ctx)
    }
  }

  async update(ctx, next) {
    try {
      const res = await updateHousebuild(ctx.params.id, ctx.request.body)
      if (res) {
        ctx.body = {
          code: 0,
          message: '修改房屋建筑信息成功',
          result: ''
        }
      } else {
        return ctx.app.emit('error', invalidHousebuildId, ctx)
      }
    } catch (err) {
      console.error(err)
    }
  }

  async find(ctx, next) {
    const { housebuild_code, villager_name, page = 1, limit = 3 } = ctx.request.query
    // console.log(page, limit)
    const res = await findHousebuild({ housebuild_code, villager_name }, page, limit)
    if (res.list.length < 1) {
      ctx.body = {
        code: 0,
        message: '房屋建筑信息为空',
        result: res
      }
    } else {
      ctx.body = {
        code: 0,
        message: '获取房屋建筑信息成功',
        result: res
      }
    }

    return res
  }

  async remove(ctx, next) {
    const res = await removeHousebuild(ctx.params.id)
    if (res) {
      ctx.body = {
        code: 0,
        message: '删除房屋建筑信息成功',
        result: ''
      }
    } else {
      return ctx.app.emit('error', invalidHousebuildId, ctx)
    }
  }

  async restore(ctx, next) {
    const res = await restoreHousebuild(ctx.params.id)
    if (res) {
      ctx.body = {
        code: 0,
        message: '恢复房屋建筑信息信息成功',
        result: ''
      }
    } else {
      return ctx.app.emit('error', invalidHousebuildId, ctx)
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
    console.log('housebuild', Ids)
    let flag = null
    try {
      Ids.forEach(async Id => {
        await removeHousebuild(Id)
      })
      ctx.body = {
        code: 0,
        message: '批量删除成功',
        result: ''
      }
    } catch (err) {
      console.error(err)
      return ctx.app.emit('error', invalidHousebuildId, ctx)
    }
  }
}

module.exports = new HousebuildController()