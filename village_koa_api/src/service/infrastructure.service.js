const Infrastructure = require('../model/infrastructure.model')
const { Op } = require('sequelize')

class InfrastructureService {
  async addInfrastructure(infrastructure) {
    const res = await Infrastructure.create(infrastructure)
    return res.dataValues
  }

  async updateInfrastructure(id, infrastructure) {
    const res = await Infrastructure.update(infrastructure, { where: { id } })

    return res[0] > 0 ? true : false
  }

  async findInfrastructure(pageNum, pageSize) {
    const offset = (pageNum - 1) * pageSize
    const res = await Infrastructure.findAll({ where: { infra_status: 0 } })
    const { count, rows } = await Infrastructure.findAndCountAll({
      offset: offset, limit: pageSize * 1, where: { infra_status: 0 }, order: [
        ['createdAt', 'DESC']
      ]
    })
    return {
      page: pageNum * 1,
      limit: pageSize * 1,
      total: count,
      pageList: rows,
      list: res
    }
  }

  async findOneInfrastructure(id) {
    const res = await Infrastructure.findOne({ where: { id } })
    return res
  }

  async findMoreInfrastructure({ infra_code, infra_name, construction_unit }, pageNum, pageSize) {
    let whereOpt = {}
    const offset = (pageNum - 1) * pageSize

    infra_code && Object.assign(whereOpt, { infra_code })
    infra_name && Object.assign(whereOpt, { infra_name })
    construction_unit && Object.assign(whereOpt, { construction_unit })

    console.log(whereOpt)
    // 定义处理[Op.and]的查询条件数组函数
    // function OpAndHandler(assistinfo_status, recipient, executive_condition) {
    //   let OpAnd = [
    //     { assistinfo_status },
    //     { recipient },
    //     { executive_condition }
    //   ]
    //   let arr = []
    //   arr = OpAnd.map(item => {
    //     for (const key in item) {
    //       return item[key]
    //     }
    //   })
    //   if (arr.indexOf(undefined) !== -1) {
    //     OpAnd.splice(arr.indexOf(undefined), 1)
    //   }
    //   return OpAnd
    // }

    const { count, rows } = await Infrastructure.findAndCountAll({
      offset: offset,
      limit: pageSize * 1,
      where: {
        [Op.and]: [
          { infra_status: 0 },
          {
            [Op.or]: [
              {
                infra_code: whereOpt.infra_code || ''
              },
              {

                infra_name: whereOpt.infra_name || ''
              },
              {
                construction_unit: whereOpt.construction_unit || ''
              },

            ]
          }
        ]
      },
      order: [
        ['createdAt', 'DESC']
      ]
    })

    const res = await Infrastructure.findAll({
      where: {
        [Op.and]: [
          { infra_status: 0 },
          {
            [Op.or]: [
              {
                infra_code: whereOpt.infra_code || ''
              },
              {
                infra_name: whereOpt.infra_name || ''
              },
              {
                construction_unit: whereOpt.construction_unit || ''
              },

            ]
          }
        ]
      },
      order: [
        ['createdAt', 'DESC']
      ]
    })

    return {
      page: pageNum * 1,
      limit: pageSize * 1,
      total: count,
      pageList: rows,
      list: res
    }
  }

  async removeInfrastructure(id) {
    const res = await Infrastructure.update({ infra_status: 1 }, { where: { id } })

    return res > 0 ? true : false
  }

  async restoreInfrastructure(id) {
    const res = await Infrastructure.update({ infra_status: 0 }, { where: { id } })

    return res > 0 ? true : false
  }
}

module.exports = new InfrastructureService()