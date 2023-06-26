const User = require('../model/user.model')
const UserRole = require('../model/user_role.model')
const Role = require('../model/role.model')
const RolePermission = require('../model/role_permission.model')
const Permission = require('../model/permission.model')
const { Op } = require('sequelize')
class UserService {
  async createUser(user_name, password) {
    const res = await User.create({ user_name, password })
    return res.dataValues
  }

  async getUserInfo({ id, user_name, password, avatar, state }) {
    const whereOpt = {}

    id && Object.assign(whereOpt, { id })
    user_name && Object.assign(whereOpt, { user_name })
    password && Object.assign(whereOpt, { password })
    avatar && Object.assign(whereOpt, { avatar })
    state && Object.assign(whereOpt, { state })

    const res = await User.findOne({
      attributes: ['id', 'user_name', 'password', 'avatar', 'state', 'role_name'],
      where: whereOpt
    })

    return res ? res.dataValues : null
  }

  async findUser({ user_name }, pageNum, pageSize) {
    const whereOpt = {}
    const offset = (pageNum - 1) * pageSize
    user_name && Object.assign(whereOpt, { user_name })
    console.log(whereOpt)
    if (whereOpt.user_name) {
      const res = await User.findAll({
        where: {
          [Op.and]: [
            { user_status: 0 },
            { user_name: whereOpt.user_name }
          ]
        },
        order: [
          ['createdAt', 'DESC']
        ]
      })

      const { count, rows } = await User.findAndCountAll({
        offset: offset,
        limit: pageSize * 1,
        where: {
          [Op.and]: [
            { user_status: 0 },
            { user_name: whereOpt.user_name }
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
      const res = await User.findAll({
        where: {
          user_status: 0
        },
        order: [
          ['createdAt', 'DESC']
        ]
      })
      console.log('whereOpt为空')

      const { count, rows } = await User.findAndCountAll({
        offset: offset,
        limit: pageSize * 1,
        where: {
          user_status: 0
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

  async getOneUserRoles(userId, pageNum = 1, pageSize = 3) {
    // console.log(userId)
    const offset = (pageNum - 1) * pageSize
    const res = await UserRole.findAll({
      where: { userId }
    })
    let roleIds = []
    res.forEach(item => {
      roleIds.push(item.roleId)
    })
    const roles = await Role.findAll({
      where: {
        id: {
          [Op.in]: roleIds
        }
      }
    })

    const { count, rows } = await Role.findAndCountAll({
      offset: offset,
      limit: pageSize * 1,
      where: {
        id: {
          [Op.in]: roleIds
        }
      }
    })

    return {
      page: pageNum * 1,
      limit: pageSize * 1,
      total: count,
      pageList: rows,
      list: roles,
      userRoleList: res
    }
  }

  async getUserPermissions({ userId }, pageNum, pageSize) {
    const whereOpt = {}
    const offset = (pageNum - 1) * pageSize
    userId && Object.assign(whereOpt, { userId })
    if (whereOpt.userId) {
      const userRoleIdList = await UserRole.findAll({
        where: { userId }
      })
      let roleIds = []
      userRoleIdList.forEach(item => {
        roleIds.push(item.roleId)
      })

      const rolePermissionList = await RolePermission.findAll({
        where: {
          roleId: {
            [Op.in]: roleIds
          }
        }
      })
      let permissionIds = []
      rolePermissionList.forEach(item => {
        permissionIds.push(item.permissionId)
      })

      const PermissionList = await Permission.findAll({
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
        list: PermissionList
      }
    } else {
      const userRoleIdList = await UserRole.findAll()

      const rolePermissionList = await RolePermission.findAll()
      const PermissionList = await Permission.findAll()

      const { count, rows } = await Permission.findAndCountAll({
        offset: offset,
        limit: pageSize * 1,

      })

      return {
        page: pageNum * 1,
        limit: pageSize * 1,
        total: count,
        pageList: rows,
        list: PermissionList
      }
    }

  }

  async updateById({ id, user_name, password, state, avatar }) {
    const whereOpt = { id }
    const newUser = {}

    user_name && Object.assign(newUser, { user_name })
    password && Object.assign(newUser, { password })
    state && Object.assign(newUser, { state })
    avatar && Object.assign(newUser, { avatar })

    const res = await User.update(newUser, { where: whereOpt })

    return res[0] > 0 ? true : false
  }

  async updateUser(id, user) {
    const res = await User.update(user, { where: { id } })

    return res[0] > 0 ? true : false
  }

  async removeUser(id) {
    const res = await User.update({ user_status: 1 }, { where: { id } })

    return res > 0 ? true : false
  }

  async deleteUsers(ids) {
    return await User.destroy({
      where: {
        id: {
          [Op.in]: ids
        }
      }
    })
  }

  async deleteOneUsers(id) {
    return await User.destroy({
      where: {
        id
      }
    })
  }

  async restoreUser(id) {
    const res = await User.update({ user_status: 0 }, { where: { id } })

    return res > 0 ? true : false
  }
}

module.exports = new UserService()
