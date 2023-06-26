const { addRelationError, invalidHouseholdId } = require('../constant/err.type')

const { addRelation, findRelation, updateRelation, removeRelation, restoreRelation, findMoreRelation } = require('../service/relation.service')

class RelationController {
  async add(ctx, next) {
    try {
      const { createdAt, updatedAt, ...res } = await addRelation(ctx.request.body)
      ctx.body = {
        code: 0,
        message: '新增户主关系信息成功',
        result: res
      }
    } catch (err) {
      console.error(err)
      return ctx.app.emit('error', addRelationError, ctx)
    }
  }

  async findAll(ctx, next) {
    const { page = 1, limit = 10 } = ctx.request.query
    // console.log(page, limit)
    const res = await findRelation(page, limit)
    if (res.list.length < 1) {
      ctx.body = {
        code: 0,
        message: '户主关系信息为空',
        result: res
      }
    } else {
      ctx.body = {
        code: 0,
        message: '获取户主关系信息成功',
        result: res
      }
    }

    return res
  }

  async findMore(ctx, next) {
    const { household_number, page, limit } = ctx.request.query

    const res = await findMoreRelation({ household_number }, page, limit)

    ctx.body = {
      code: 0,
      message: '获取每户信息成功',
      result: res
    }
  }

  async update(ctx, next) {
    console.log(ctx.params.id)
    console.log(ctx.request.body)
    try {
      const res = await updateRelation(ctx.params.id, ctx.request.body)
      if (res) {
        ctx.body = {
          code: 0,
          message: '修改户主关系信息成功',
          result: ''
        }
      } else {
        return ctx.app.emit('error', invalidHouseholdId, ctx)
      }
    } catch (err) {
      console.error(err)
    }
  }

  async remove(ctx, next) {
    const res = await removeRelation(ctx.params.id)
    if (res) {
      ctx.body = {
        code: 0,
        message: '删除户主关系信息成功',
        result: ''
      }
    } else {
      return ctx.app.emit('error', invalidHouseholdId, ctx)
    }
  }

  async restore(ctx, next) {
    // console.log(ctx.params.id)
    const res = await restoreRelation(ctx.params.id)
    if (res) {
      ctx.body = {
        code: 0,
        message: '恢复户主关系信息成功',
        result: ''
      }
    } else {
      return ctx.app.emit('error', invalidHouseholdId, ctx)
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
    console.log('relations', Ids)
    let flag = null
    try {
      Ids.forEach(async Id => {
        await removeRelation(Id)
      })
      ctx.body = {
        code: 0,
        message: '批量删除成功',
        result: ''
      }
    } catch (err) {
      console.error(err)
      return ctx.app.emit('error', invalidHouseholdId, ctx)
    }
  }
}

module.exports = new RelationController()
