const { addRoleError, invalidRoleId } = require('../constant/err.type')

const Role = require('../model/role.model')

const { createRole, getRoleInfo, getRoleInfoById, updateRole, removeRole, restoreRole, deleteRoles, deleteOneRoles } = require('../service/role.service')

const { getOneRolePermissions } = require('../service/permission.service')
const { where } = require('sequelize')

class RoleController {
  async add(ctx, next) {
    try {
      const res = await createRole(ctx.request.body)
      let Pattern = /(管理员)|(行政村领导)|(办事员)|(会计)/
      let result = Pattern.exec(res.role_name)
      console.log(result)
      if (result) {
        switch (result[0]) {
          case '管理员':
            result[0] = 'admin'
            break
          case '行政村领导':
            result[0] = 'leader'
            break
          case '办事员':
            result[0] = 'officer'
            break
          case '会计':
            result[0] = 'accountant'
            break
        }
        await Role.update({ role_remark: result[0] }, { where: { id: res.id } })
      }
      ctx.body = {
        code: 0,
        message: '新增角色信息成功',
        result: res
      }
    } catch (err) {
      console.error(err)
      return ctx.app.emit('error', addRoleError, ctx)
    }
  }

  async find(ctx, next) {
    const { role_name, page = 1, limit = 3 } = ctx.request.query
    // console.log(page, limit)
    const res = await getRoleInfo({ role_name }, page, limit)
    if (res.list.length < 1) {
      ctx.body = {
        code: 0,
        message: '角色信息为空',
        result: res
      }
    } else {
      ctx.body = {
        code: 0,
        message: '获取角色信息成功',
        result: res
      }
    }

    return res
  }

  async findRoleById(ctx, next) {
    const id = ctx.params.id
    const res = await getRoleInfoById(id)
    if (res) {
      ctx.body = {
        code: 0,
        message: '获取角色信息成功',
        result: res
      }
    } else {
      ctx.body = {
        code: 0,
        message: '角色不存在',
        result: res
      }
    }
  }

  async getRolePermission(ctx, next) {
    const roleId = ctx.params.id
    const { page = 1, limit = 3 } = ctx.request.query
    const res = await getOneRolePermissions(roleId, page, limit)

    ctx.body = {
      code: 0,
      message: '获取角色所有权限信息成功',
      result: res
    }
  }

  async update(ctx, next) {
    const role = ctx.request.body

    try {
      const res = await updateRole(role.id, role)
      if (res) {
        ctx.body = {
          code: 0,
          message: '修改角色信息成功',
          result: ''
        }
      } else {
        return ctx.app.emit('error', invalidRoleId, ctx)
      }
    } catch (err) {
      console.error(err)
    }
  }

  async remove(ctx, next) {
    const res = await removeRole(ctx.params.id)
    if (res) {
      ctx.body = {
        code: 0,
        message: '删除角色信息成功',
        result: ''
      }
    } else {
      return ctx.app.emit('error', invalidRoleId, ctx)
    }
  }

  async restore(ctx, next) {
    const res = await restoreRole(ctx.params.id)
    if (res) {
      ctx.body = {
        code: 0,
        message: '恢复角色信息成功',
        result: ''
      }
    } else {
      return ctx.app.emit('error', invalidRoleId, ctx)
    }
  }

  async batchRemove(ctx, next) {
    // const { ids } = ctx.request.body
    // console.log(ctx.request.body)
    // console.log(Object.prototype.toString.call(ctx.request.body))
    let Ids
    if (Object.prototype.toString.call(ctx.request.body) === '[object Array]') {
      const ids = ctx.request.body
      Ids = ids
    } else {
      const { ids } = ctx.request.body
      Ids = ids
    }
    console.log('roles', Ids)
    let flag = null
    try {
      Ids.forEach(async Id => {
        await removeRole(Id)
      })
      ctx.body = {
        code: 0,
        message: '批量删除成功',
        result: ''
      }
    } catch (err) {
      console.error(err)
      return ctx.app.emit('error', invalidRoleId, ctx)
    }
  }

  async deleteRole(ctx, next) {
    const { ids } = ctx.request.body

    const res = await deleteRoles(ids)

    ctx.body = {
      code: 0,
      message: '批量删除角色成功',
      result: res
    }
  }

  async deleteOneRole(ctx, next) {
    const id = ctx.params.id

    const res = await deleteOneRoles(id)

    ctx.body = {
      code: 0,
      message: '删除角色成功',
      result: res
    }
  }
}

module.exports = new RoleController()