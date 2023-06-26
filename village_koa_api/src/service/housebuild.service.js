const Housebuild = require('../model/housebuild.model')
const { Op } = require('sequelize')

class HousebuildService {
  async addHousebuild(housebuild) {
    const res = await Housebuild.create(housebuild)
    return res.dataValues
  }

  async updateHousebuild(id, housebuild) {
    const res = await Housebuild.update(housebuild, { where: { id } })
    return res[0] > 0 ? true : false
  }

  async findHousebuild({ housebuild_code, villager_name }, pageNum, pageSize) {
    const whereOpt = {}
    const offset = (pageNum - 1) * pageSize
    housebuild_code && Object.assign(whereOpt, { housebuild_code })
    villager_name && Object.assign(whereOpt, { villager_name })
    console.log(whereOpt)

    if (whereOpt.housebuild_code || whereOpt.villager_name) {
      console.log('whereOpt不为空')
      console.log(whereOpt)
      const res = await Housebuild.findAll({
        where: {
          [Op.and]: [
            { housebuild_status: 0 },
            {
              [Op.or]: [
                { housebuild_code: whereOpt.housebuild_code || '' },
                { villager_name: whereOpt.villager_name || '' }
              ]
            }
          ]
        },
        order: [
          ['createdAt', 'DESC']
        ]

      })

      const { count, rows } = await Housebuild.findAndCountAll({
        offset: offset,
        limit: pageSize * 1,
        where: {
          [Op.and]: [
            { housebuild_status: 0 },
            {
              [Op.or]: [
                { housebuild_code: whereOpt.housebuild_code || '' },
                { villager_name: whereOpt.villager_name || '' }
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
      const res = await Housebuild.findAll({
        where: {
          housebuild_status: 0
        },
        order: [
          ['createdAt', 'DESC']
        ]
      })
      console.log('whereOpt为空')

      const { count, rows } = await Housebuild.findAndCountAll({
        offset: offset,
        limit: pageSize * 1,
        where: {
          housebuild_status: 0
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

  async removeHousebuild(id) {
    const res = await Housebuild.update({ housebuild_status: 1 }, { where: { id } })

    return res > 0 ? true : false
  }

  async restoreHousebuild(id) {
    const res = await Housebuild.update({ housebuild_status: 0 }, { where: { id } })

    return res > 0 ? true : false
  }
}

module.exports = new HousebuildService()