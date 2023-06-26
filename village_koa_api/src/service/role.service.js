const Role = require('../model/role.model')
const { Op } = require('sequelize')
class RoleService {
  async createRole(role) {
    const res = await Role.create(role)
    return res.dataValues
  }

  async getRoleInfo({ role_name }, pageNum = 1, pageSize = 3) {
    const whereOpt = {}
    const offset = (pageNum - 1) * pageSize
    role_name && Object.assign(whereOpt, { role_name })
    console.log(whereOpt)

    if (whereOpt.role_name) {
      console.log('whereOpt不为空')
      console.log(whereOpt)
      const res = await Role.findAll({
        where: {
          [Op.and]: [
            { role_status: 0 },
            { role_name: whereOpt.role_name }
          ]
        },
        order: [
          ['createdAt', 'DESC']
        ]
      })

      const { count, rows } = await Role.findAndCountAll({
        offset: offset,
        limit: pageSize * 1,
        where: {
          [Op.and]: [
            { role_status: 0 },
            { role_name: whereOpt.role_name }
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
      const res = await Role.findAll({
        where: {
          role_status: 0
        },
        order: [
          ['createdAt', 'DESC']
        ]
      })
      console.log('whereOpt为空')

      const { count, rows } = await Role.findAndCountAll({
        offset: offset,
        limit: pageSize * 1,
        where: {
          role_status: 0
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

  async getRoleInfoById(id) {
    const res = await Role.findByPk(id)
    // console.log(res)
    return res ? res.dataValues : null
  }

  async updateRole(id, role) {
    const res = await Role.update(role, { where: { id } })

    return res[0] > 0 ? true : false
  }

  async removeRole(id) {
    const res = await Role.update({ role_status: 1 }, { where: { id } })

    return res > 0 ? true : false
  }

  async restoreRole(id) {
    const res = await Role.update({ role_status: 0 }, { where: { id } })

    return res > 0 ? true : false
  }

  async deleteRoles(ids) {
    return await Role.destroy({
      where: {
        id: {
          [Op.in]: ids
        }
      }
    })
  }

  async deleteOneRoles(id) {
    return await Role.destroy({
      where: {
        id
      }
    })
  }
}

module.exports = new RoleService()