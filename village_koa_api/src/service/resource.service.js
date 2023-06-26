const Resource = require('../model/resource.model')
const { Op } = require('sequelize')

class ResourceService {
  async addResource(resource) {
    const res = await Resource.create(resource)
    return res.dataValues
  }

  async updateResource(id, resource) {
    const res = await Resource.update(resource, { where: { id } })
    return res[0] > 0 ? true : false
  }

  async findResource({ resource_code, resource_name, resource_kind }, pageNum, pageSize) {
    const whereOpt = {}
    const offset = (pageNum - 1) * pageSize
    resource_code && Object.assign(whereOpt, { resource_code })
    resource_name && Object.assign(whereOpt, { resource_name })
    resource_kind && Object.assign(whereOpt, { resource_kind })
    console.log(whereOpt)

    if (whereOpt.resource_code || whereOpt.resource_name || whereOpt.resource_kind) {
      console.log('whereOpt不为空')
      console.log(whereOpt)
      const res = await Resource.findAll({
        where: {
          [Op.and]: [
            { resource_status: 0 },
            {
              [Op.or]: [
                { resource_code: whereOpt.resource_code || '' },
                { resource_name: whereOpt.resource_name || '' },
                { resource_kind: whereOpt.resource_kind || '' },
              ]
            }
          ]
        },
        order: [
          ['createdAt', 'DESC']
        ]
      })

      const { count, rows } = await Resource.findAndCountAll({
        offset: offset,
        limit: pageSize * 1,
        where: {
          [Op.and]: [
            { resource_status: 0 },
            {
              [Op.or]: [
                { resource_code: whereOpt.resource_code || '' },
                { resource_name: whereOpt.resource_name || '' },
                { resource_kind: whereOpt.resource_kind || '' },
              ]
            }
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
      const res = await Resource.findAll({
        where: {
          resource_status: 0
        },
        order: [
          ['createdAt', 'DESC']
        ]
      })
      console.log('whereOpt为空')

      const { count, rows } = await Resource.findAndCountAll({
        offset: offset,
        limit: pageSize * 1,
        where: {
          resource_status: 0
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

  async removeResource(id) {
    const res = await Resource.update({ resource_status: 1 }, { where: { id } })

    return res > 0 ? true : false
  }

  async restoreResource(id) {
    const res = await Resource.update({ resource_status: 0 }, { where: { id } })

    return res > 0 ? true : false
  }
}

module.exports = new ResourceService()