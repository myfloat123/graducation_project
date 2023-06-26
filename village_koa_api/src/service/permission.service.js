const Permission = require('../model/permission.model')
const RolePermission = require('../model/role_permission.model')
const { Op } = require('sequelize')
class PermissionService {
  async createPermission(permission) {
    const res = await Permission.create(permission)
    return res.dataValues
  }

  async getPermissionInfo({ permission_name }, pageNum = 1, pageSize = 3) {
    const whereOpt = {}
    const offset = (pageNum - 1) * pageSize
    permission_name && Object.assign(whereOpt, { permission_name })
    console.log(whereOpt)

    if (whereOpt.permission_name) {
      console.log('whereOpt不为空')
      console.log(whereOpt)
      const res = await Permission.findAll({
        where: {
          [Op.and]: [
            { permission_status: 0 },
            { permission_name: whereOpt.permission_name }
          ]
        },
        order: [
          ['createdAt', 'DESC']
        ]
      })

      const { count, rows } = await Permission.findAndCountAll({
        offset: offset,
        limit: pageSize * 1,
        where: {
          [Op.and]: [
            { permission_status: 0 },
            { permission_name: whereOpt.permission_name }
          ]
        },
        order: [
          ['createdAt', 'DESC']
        ]
      })

      return {
        page: pageNum,
        limit: pageSize * 1,
        total: count,
        pageList: rows,
        list: res
      }
    } else {
      const res = await Permission.findAll({
        where: {
          permission_status: 0
        },
        order: [
          ['createdAt', 'DESC']
        ]
      })
      console.log('whereOpt为空')

      const { count, rows } = await Permission.findAndCountAll({
        offset: offset,
        limit: pageSize * 1,
        where: {
          permission_status: 0
        },
        order: [
          ['createdAt', 'DESC']
        ]
      })

      return {
        page: pageNum,
        limit: pageSize * 1,
        total: count,
        pageList: rows,
        list: res
      }
    }
  }

  async getOneRolePermissions(roleId, pageNum, pageSize) {
    // console.log(userId)
    const offset = (pageNum - 1) * pageSize
    const res = await RolePermission.findAll({
      where: { roleId }
    })
    let permissionIds = []
    res.forEach(item => {
      permissionIds.push(item.permissionId)
    })
    const permissions = await Permission.findAll({
      where: {
        id: {
          [Op.in]: permissionIds
        }
      }
    })

    const { count, rows } = await Permission.findAndCountAll({
      offset: offset,
      limit: pageSize * 1,
      where: {
        id: {
          [Op.in]: permissionIds
        }
      }
    })

    return {
      page: pageNum * 1,
      limit: pageSize * 1,
      total: count,
      pageList: rows,
      list: permissions,
      rolePermissionList: res
    }
  }

  async updatePermission(id, permission) {
    const res = await Permission.update(permission, { where: { id } })

    return res[0] > 0 ? true : false
  }

  async deleteOnePermissions(id) {
    return await Permission.destroy({
      where: {
        id
      }
    })
  }
}

module.exports = new PermissionService()