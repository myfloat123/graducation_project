const Hygiene = require('../model/hygiene.model')
const { Op } = require('sequelize')

class HygieneService {
  async addHygiene(hygiene) {
    const res = await Hygiene.create(hygiene)
    return res.dataValues
  }

  async updateHygiene(id, hygiene) {
    const res = await Hygiene.update(hygiene, { where: { id } })
    return res[0] > 0 ? true : false
  }

  async findHygiene({ hygiene_code, hygiene_accendant }, pageNum, pageSize) {
    const whereOpt = {}
    const offset = (pageNum - 1) * pageSize
    hygiene_code && Object.assign(whereOpt, { hygiene_code })
    hygiene_accendant && Object.assign(whereOpt, { hygiene_accendant })
    console.log(whereOpt)

    if (whereOpt.hygiene_code || whereOpt.hygiene_accendant) {
      console.log('whereOpt不为空')
      console.log(whereOpt)
      const res = await Hygiene.findAll({
        where: {
          [Op.and]: [
            { hygiene_status: 0 },
            {
              [Op.or]: [
                { hygiene_code: whereOpt.hygiene_code || '' },
                { hygiene_accendant: whereOpt.hygiene_accendant || '' }
              ]
            }
          ]
        },
        order: [
          ['createdAt', 'DESC']
        ]
      })

      const { count, rows } = await Hygiene.findAndCountAll({
        offset: offset,
        limit: pageSize * 1,
        where: {
          [Op.and]: [
            { hygiene_status: 0 },
            {
              [Op.or]: [
                { hygiene_code: whereOpt.hygiene_code || '' },
                { hygiene_accendant: whereOpt.hygiene_accendant || '' }
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
      const res = await Hygiene.findAll({
        where: {
          hygiene_status: 0
        },
        order: [
          ['createdAt', 'DESC']
        ]
      })
      console.log('whereOpt为空')

      const { count, rows } = await Hygiene.findAndCountAll({
        offset: offset,
        limit: pageSize * 1,
        where: {
          hygiene_status: 0
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

  async removeHygiene(id) {
    const res = await Hygiene.update({ hygiene_status: 1 }, { where: { id } })

    return res > 0 ? true : false
  }

  async restoreHygiene(id) {
    const res = await Hygiene.update({ hygiene_status: 0 }, { where: { id } })

    return res > 0 ? true : false
  }
}

module.exports = new HygieneService()