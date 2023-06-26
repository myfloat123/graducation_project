const { Op } = require('sequelize')

const { addPermissionError, invalidPermissionId } = require('../constant/err.type')

const Role = require('../model/role.model')
const Permission = require('../model/permission.model')

const { createPermission, getPermissionInfo, updatePermission, getOneRolePermissions, deleteOnePermissions } = require('../service/permission.service')

class PermissionController {
  async add(ctx, next) {
    try {
      const res = await createPermission(ctx.request.body)
      ctx.body = {
        code: 0,
        message: '新增权限信息成功',
        result: res
      }
    } catch (err) {
      console.error(err)
      addPermissionError.result = err
      return ctx.app.emit('error', addPermissionError, ctx)
    }
  }

  async find(ctx, next) {
    const { permission_name, page = 1, limit = 3 } = ctx.request.query
    // console.log(page, limit)
    const res = await getPermissionInfo({ permission_name }, page, limit)
    if (res.list.length < 1) {
      ctx.body = {
        code: 0,
        message: '权限信息为空',
        result: res
      }
    } else {
      ctx.body = {
        code: 0,
        message: '获取权限信息成功',
        result: res
      }
    }

    return res
  }

  async update(ctx, next) {
    const permission = ctx.request.body

    try {
      const res = await updatePermission(permission.id, permission)
      if (res) {
        ctx.body = {
          code: 0,
          message: '修改权限信息成功',
          result: ''
        }
      } else {
        return ctx.app.emit('error', invalidPermissionId, ctx)
      }
    } catch (err) {
      console.error(err)
    }
  }

  async doAssign(ctx, next) {
    // 获取请求体中的角色id，权限id和操作类型（add或remove）
    const { roleId, permissionIds, action } = ctx.request.body
    // 查询数据库中是否有该用户和该角色
    const role = await Role.findByPk(roleId)
    const permissionList = await Permission.findAll({
      where: {
        id: {
          [Op.in]: permissionIds
        }
      }
    })
    let permissions = []
    permissions = permissionList.map(item => item.id)
    // const user = await getUserInfo(userId)
    // const role = await getRoleInfoById(roleId)
    // 如果没有该用户或该角色，返回400错误
    // if (!permissionIds.length===0 || !role) {
    //   ctx.status = 400
    //   ctx.body = { code: -1, message: '无效的参数' }
    //   return
    // }
    // 如果有该用户和该角色，根据操作类型添加或删除用户和角色的关联
    if (action === 'add') {
      await role.setPermissions(permissions)
      ctx.body = { code: 0, message: '分配权限成功' }
      return
    } else if (action === 'remove') {
      await role.removePermissions(permissions)
      ctx.body = { code: 0, message: '取消权限成功' }
      return
    } else {
      // 如果操作类型不是add或remove，返回400错误
      ctx.status = 400
      ctx.body = { code: -1, message: '无效的操作类型' }
      return
    }

  }

  async getPermissions(ctx, next) {
    const roleId = ctx.params.id
    const { page = 1, limit = 3 } = ctx.request.query
    const res = await getOneRolePermissions(roleId, page, limit)

    ctx.body = {
      code: 0,
      message: '获取角色所有权限信息成功',
      result: res
    }
  }

  async deleteOnePermission(ctx, next) {
    const id = ctx.params.id

    const res = await deleteOnePermissions(id)

    ctx.body = {
      code: 0,
      message: '删除权限成功',
      result: res
    }
  }
}

module.exports = new PermissionController()