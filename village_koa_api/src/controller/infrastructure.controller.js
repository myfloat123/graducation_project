const { addInfrastructureError, invalidInfrastructureId } = require('../constant/err.type')

const { addInfrastructure, updateInfrastructure, findInfrastructure, findOneInfrastructure, findMoreInfrastructure, removeInfrastructure, restoreInfrastructure } = require('../service/infrastructure.service')

const batchRemoveByIdsHandler = require('../utils/batchRemoveByIdsHandler')

class InfrastructureController {
  async add(ctx, next) {
    try {
      const res = await addInfrastructure(ctx.request.body)

      ctx.body = {
        code: 0,
        message: '新增基础设施成功',
        result: res
      }
    } catch (err) {
      console.error(err)
      return ctx.app.emit('error', addInfrastructureError, ctx)
    }
  }

  async update(ctx, next) {
    try {
      const res = await updateInfrastructure(ctx.params.id, ctx.request.body)
      console.log('修改基础设施', res)
      if (res) {
        ctx.body = {
          code: 0,
          message: '修改基础设施成功',
          result: ''
        }
      } else {
        return ctx.app.emit('error', invalidInfrastructureId, ctx)
      }
    } catch (err) {
      console.error(err)
    }
  }

  async findAll(ctx, next) {
    const { page = 1, limit = 3 } = ctx.request.query

    const res = await findInfrastructure(page, limit)
    if (res.list.length < 1) {
      ctx.body = {
        code: 0,
        message: '基础设施信息为空',
        result: res
      }
    } else {
      ctx.body = {
        code: 0,
        message: '获取基础设施信息成功',
        result: res
      }
    }

    return res
  }

  async findOne(ctx, next) {
    const res = await findOneInfrastructure(ctx.params.id)

    try {
      if (res) {
        ctx.body = {
          code: 0,
          message: '查询基础设施信息成功',
          result: res.dataValues
        }
      } else {
        return ctx.app.emit('error', invalidInfrastructureId, ctx)
      }
    } catch (err) {
      console.error(err)
    }
  }

  async findMore(ctx, next) {
    const { infra_code, infra_name, construction_unit, page, limit } = ctx.request.query

    const res = await findMoreInfrastructure({ infra_code, infra_name, construction_unit }, page, limit)

    ctx.body = {
      code: 0,
      message: '获取基础设施信息成功',
      result: res
    }
  }

  async remove(ctx, next) {
    const res = await removeInfrastructure(ctx.params.id)
    if (res) {
      ctx.body = {
        code: 0,
        message: '删除基础设施成功',
        result: ''
      }
    } else {
      return ctx.app.emit('error', invalidInfrastructureId, ctx)
    }
  }

  async restore(ctx, next) {
    const res = await restoreInfrastructure(ctx.params.id)
    if (res) {
      ctx.body = {
        code: 0,
        message: '恢复基础设施成功',
        result: ''
      }
    } else {
      return ctx.app.emit('error', invalidInfrastructureId, ctx)
    }
  }

  async batchRemove(ctx, next) {
    const ids = ctx.request.body
    batchRemoveByIdsHandler(ctx, ids, removeInfrastructure, invalidInfrastructureId)
  }
}

module.exports = new InfrastructureController()