const Villager = require('../model/villager.model')
const { Op } = require('sequelize')

class VillagerService {
  async addVillager(villager) {
    const res = await Villager.create(villager)
    return res.dataValues
  }

  async updateVillager(id, villager) {
    const res = await Villager.update(villager, { where: { id } })

    return res[0] > 0 ? true : false
  }

  // async findVillager(pageNum, pageSize) {
  //   const offset = (pageNum - 1) * pageSize
  //   const { count, rows } = await Villager.findAndCountAll({ offset: offset, limit: pageSize * 1, where: { villager_status: 0 } })
  //   return {
  //     pageNum,
  //     pageSize,
  //     total: count,
  //     list: rows
  //   }
  // }
  async findVillager(pageNum, pageSize) {
    const offset = (pageNum - 1) * pageSize
    const res = await Villager.findAll({ where: { villager_status: 0 }, order: [['createdAt', 'DESC']] })
    const { count, rows } = await Villager.findAndCountAll({ offset: offset, limit: pageSize * 1, where: { villager_status: 0 }, order: [['createdAt', 'DESC']] })
    return {
      page: pageNum,
      limit: pageSize,
      total: count,
      pageList: rows,
      list: res
    }
  }

  async findOneVillager({ villager_name, villager_ID_number, villager_phone }) {
    const whereOpt = {}

    villager_name && Object.assign(whereOpt, { villager_name })
    villager_ID_number && Object.assign(whereOpt, { villager_ID_number })
    villager_phone && Object.assign(whereOpt, { villager_phone })
    console.log(whereOpt)

    const res = await Villager.findOne({
      where: whereOpt,
      order: [
        ['createdAt', 'DESC']
      ]
    })

    return res ? res.dataValues : null
  }

  async findMoreVillager({ villager_name, villager_ID_number, villager_phone }, pageNum, pageSize) {
    const whereOpt = {}
    const offset = (pageNum - 1) * pageSize

    villager_name && Object.assign(whereOpt, { villager_name })
    villager_ID_number && Object.assign(whereOpt, { villager_ID_number })
    villager_phone && Object.assign(whereOpt, { villager_phone })
    console.log(whereOpt)

    const res = await Villager.findAll({
      where: {
        [Op.and]: [
          { villager_status: 0 },
          {
            [Op.or]: [
              { villager_name: whereOpt.villager_name || '' },
              { villager_ID_number: whereOpt.villager_ID_number || '' },
              { villager_phone: whereOpt.villager_phone || '' }
            ]
          }
        ]
      },
      order: [
        ['createdAt', 'DESC']
      ]
    })

    const { count, rows } = await Villager.findAndCountAll({
      offset: offset,
      limit: pageSize * 1,
      where: {
        [Op.and]: [
          { villager_status: 0 },
          {
            [Op.or]: [
              { villager_name: whereOpt.villager_name || '' },
              { villager_ID_number: whereOpt.villager_ID_number || '' },
              { villager_phone: whereOpt.villager_phone || '' }
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
      limit: pageSize,
      total: count,
      pageList: rows,
      list: res
    }
  }

  async removeVillager(id) {
    const res = await Villager.update({ villager_status: 1 }, { where: { id } })

    return res > 0 ? true : false
  }

  async restoreVillager(id) {
    const res = await Villager.update({ villager_status: 0 }, { where: { id } })

    return res > 0 ? true : false
  }
}

module.exports = new VillagerService()
