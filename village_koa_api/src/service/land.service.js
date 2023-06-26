const Land = require('../model/land.model')
const { Op } = require('sequelize')

class LandService {
  async addLand(land) {
    const res = await Land.create(land)
    return res.dataValues
  }

  async updateLand(id, land) {
    const res = await Land.update(land, { where: { id } })
    return res[0] > 0 ? true : false
  }

  async findLand({ land_code, land_transfer_person, land_receive_person, land_transfer_type }, pageNum, pageSize) {
    const whereOpt = {}
    const offset = (pageNum - 1) * pageSize
    land_code && Object.assign(whereOpt, { land_code })
    land_transfer_person && Object.assign(whereOpt, { land_transfer_person })
    land_receive_person && Object.assign(whereOpt, { land_receive_person })
    land_transfer_type && Object.assign(whereOpt, { land_transfer_type })
    console.log(whereOpt)

    if (whereOpt.land_code || whereOpt.land_transfer_person || whereOpt.land_receive_person || whereOpt.land_transfer_type) {
      console.log('whereOpt不为空')
      console.log(whereOpt)
      const res = await Land.findAll({
        where: {
          [Op.and]: [
            { land_status: 0 },
            {
              [Op.or]: [
                { land_code: whereOpt.land_code || '' },
                { land_transfer_person: whereOpt.land_transfer_person || '' },
                { land_receive_person: whereOpt.land_receive_person || '' },
                { land_transfer_type: whereOpt.land_transfer_type || '' },
              ]
            }
          ]
        },
        order: [
          ['createdAt', 'DESC']
        ]
      })

      const { count, rows } = await Land.findAndCountAll({
        offset: offset,
        limit: pageSize * 1,
        where: {
          [Op.and]: [
            { land_status: 0 },
            {
              [Op.or]: [
                { land_code: whereOpt.land_code || '' },
                { land_transfer_person: whereOpt.land_transfer_person || '' },
                { land_receive_person: whereOpt.land_receive_person || '' },
                { land_transfer_type: whereOpt.land_transfer_type || '' },
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
      const res = await Land.findAll({
        where: {
          land_status: 0
        },
        order: [
          ['createdAt', 'DESC']
        ]
      })
      console.log('whereOpt为空')

      const { count, rows } = await Land.findAndCountAll({
        offset: offset,
        limit: pageSize * 1,
        where: {
          land_status: 0
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

  async removeLand(id) {
    const res = await Land.update({ land_status: 1 }, { where: { id } })

    return res > 0 ? true : false
  }

  async restoreLand(id) {
    const res = await Land.update({ land_status: 0 }, { where: { id } })

    return res > 0 ? true : false
  }
}

module.exports = new LandService()