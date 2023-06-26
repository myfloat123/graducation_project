const { addHouseholdError, invalidHouseholdId } = require('../constant/err.type')

const { addHousehold, updateHousehold, findMoreHousehold, findHousehold, removeHousehold, restoreHousehold, findHouseholdPoor, patchUpdateHousehold, findHouseholdNotPoor } = require('../service/household.service')

class HouseholdController {
  async add(ctx, next) {
    try {
      const { createdAt, updatedAt, ...res } = await addHousehold(ctx.request.body)
      ctx.body = {
        code: 0,
        message: '新增每户信息成功',
        result: res
      }
    } catch (err) {
      console.error(err)
      return ctx.app.emit('error', addHouseholdError, ctx)
    }
  }

  async update(ctx, next) {
    console.log(ctx.params.id, ctx.request.body)
    try {
      const res = await updateHousehold(ctx.params.id, ctx.request.body)
      if (res) {
        ctx.body = {
          code: 0,
          message: '修改每户信息成功',
          result: ''
        }
      } else {
        return ctx.app.emit('error', invalidHouseholdId, ctx)
      }
    } catch (err) {
      console.error(err)
    }
  }

  async patchUpdate(ctx, next) {
    try {
      const res = await patchUpdateHousehold(ctx.params.id, ctx.request.body)
      if (res) {
        ctx.body = {
          code: 0,
          message: '修改贫困信息成功',
          result: ''
        }
      } else {
        return ctx.app.emit('error', invalidHouseholdId, ctx)
      }
    } catch (err) {
      console.error(err)
    }
  }

  async findMore(ctx, next) {
    const { household_number, household_name, page, limit } = ctx.request.query

    const res = await findMoreHousehold({ household_number, household_name }, page, limit)

    ctx.body = {
      code: 0,
      message: '获取每户信息成功',
      result: res
    }
  }

  async findAll(ctx, next) {
    const { page = 1, limit = 10 } = ctx.request.query
    // console.log(page, limit)
    const res = await findHousehold(page, limit)
    if (res.list.length < 1) {
      ctx.body = {
        code: 0,
        message: '户口信息为空',
        result: res
      }
    } else {
      ctx.body = {
        code: 0,
        message: '获取户口信息成功',
        result: res
      }
    }

    return res
  }

  async findAllPoor(ctx, next) {
    const { household_number, household_name, page = 1, limit = 3 } = ctx.request.query
    const res = await findHouseholdPoor({ household_number, household_name }, page, limit)
    if (res.list.length < 1) {
      ctx.body = {
        code: 0,
        message: '贫困家庭信息为空',
        result: res
      }
    } else {
      ctx.body = {
        code: 0,
        message: '获取贫困家庭信息成功',
        result: res
      }
    }

    return res
  }

  async findAllNotpoor(ctx, next) {
    const { household_number, household_name, page = 1, limit = 3 } = ctx.request.query
    const res = await findHouseholdNotPoor({ household_number, household_name }, page, limit)
    if (res.list.length < 1) {
      ctx.body = {
        code: 0,
        message: '脱贫家庭信息为空',
        result: res
      }
    } else {
      ctx.body = {
        code: 0,
        message: '获取脱贫家庭信息成功',
        result: res
      }
    }

    return res
  }

  async remove(ctx, next) {
    console.log(ctx.params.id)
    const res = await removeHousehold(ctx.params.id)
    if (res) {
      ctx.body = {
        code: 0,
        message: '删除户口信息成功',
        result: ''
      }
    } else {
      return ctx.app.emit('error', invalidHouseholdId, ctx)
    }
  }

  async restore(ctx, next) {
    const res = await restoreHousehold(ctx.params.id)
    if (res) {
      ctx.body = {
        code: 0,
        message: '恢复户口信息成功',
        result: ''
      }
    } else {
      return ctx.app.emit('error', invalidHouseholdId, ctx)
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
    console.log('household', Ids)
    let flag = null
    try {
      Ids.forEach(async Id => {
        await removeHousehold(Id)
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

module.exports = new HouseholdController()
