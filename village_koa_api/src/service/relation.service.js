const Relation = require('../model/relation.model')
const Household = require('../model/household.model')
const { Op } = require('sequelize')

class RelationService {
  async addRelation(relation) {
    const res = await Relation.create(relation)
    return res.dataValues
  }

  async findRelation(pageNum, pageSize) {
    const offset = (pageNum - 1) * pageSize
    const res = await Relation.findAll({
      where: { relation_status: 0 },
      include: {
        model: Household,
        as: 'household_info'
      }
    })
    const { count, rows } = await Relation.findAndCountAll({
      offset: offset,
      limit: pageSize * 1,
      where: { relation_status: 0 },
      include: {
        model: Household,
        as: 'household_info'
      }
    })
    return {
      page: pageNum,
      limit: pageSize,
      total: count,
      pageList: rows,
      list: res
    }
  }

  async findMoreRelation({ household_number }, pageNum, pageSize) {
    const whereOpt = {}
    const offset = (pageNum - 1) * pageSize

    household_number && Object.assign(whereOpt, { household_number })

    const res = await Relation.findAll({
      where: {
        [Op.and]: [
          { relation_status: 0 },
          {
            [Op.or]: [{ household_number: whereOpt.household_number || '' }]
          }
        ]
      }
    })

    const { count, rows } = await Relation.findAndCountAll({
      offset: offset,
      limit: pageSize * 1,
      where: {
        [Op.and]: [
          { relation_status: 0 },
          {
            [Op.or]: [{ household_number: whereOpt.household_number || '' }]
          }
        ]
      }
    })

    return {
      page: pageNum,
      limit: pageSize,
      total: count,
      pageList: rows,
      list: res
    }
  }

  async updateRelation(id, relation) {
    console.log(id)
    console.log(relation)
    const res = await Relation.update(relation, { where: { id } })
    console.log(res[0])

    return res[0] > 0 ? true : false
  }

  async removeRelation(id) {
    const res = await Relation.update({ relation_status: 1 }, { where: { id } })

    return res > 0 ? true : false
  }

  async restoreRelation(id) {
    const res = await Relation.update({ relation_status: 0 }, { where: { id } })
    console.log()

    return res > 0 ? true : false
  }
}

module.exports = new RelationService()
