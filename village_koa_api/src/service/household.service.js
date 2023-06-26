const Household = require('../model/household.model')
const Relation = require('../model/relation.model')
const { Op } = require('sequelize')

class HouseholdService {
  async addHousehold(household) {
    const res = await Household.create(household)
    return res.dataValues
  }

  async updateHousehold(id, household) {
    console.log(id)
    console.log(household)
    const res = await Household.update(household, { where: { id } })

    return res[0] > 0 ? true : false
  }

  async patchUpdateHousehold(id, household) {
    console.log(id)
    console.log(household)
    const res = await Household.update(household, { where: { id } })

    return res[0] > 0 ? true : false
  }

  async findMoreHousehold({ household_number, household_name }, pageNum, pageSize) {
    const whereOpt = {}
    const offset = (pageNum - 1) * pageSize

    household_number && Object.assign(whereOpt, { household_number })
    household_name && Object.assign(whereOpt, { household_name })
    if (whereOpt.household_number !== undefined && whereOpt.household_name !== undefined) {
      const res = await Household.findAll({
        where: {
          [Op.and]: [
            { household_status: 0 },
            {
              [Op.and]: [{ household_number: whereOpt.household_number || '' }, { household_name: whereOpt.household_name || '' }]
            }
          ]
        },
        order: [
          ['createdAt', 'DESC']
        ]
      })

      const { count, rows } = await Household.findAndCountAll({
        offset: offset,
        limit: pageSize * 1,
        where: {
          [Op.and]: [
            { household_status: 0 },
            {
              [Op.and]: [{ household_number: whereOpt.household_number || '' }, { household_name: whereOpt.household_name || '' }]
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

    const res = await Household.findAll({
      where: {
        [Op.and]: [
          { household_status: 0 },
          {
            [Op.or]: [{ household_number: whereOpt.household_number || '' }, { household_name: whereOpt.household_name || '' }]
          }
        ]
      },
      order: [
        ['createdAt', 'DESC']
      ]
    })

    const { count, rows } = await Household.findAndCountAll({
      offset: offset,
      limit: pageSize * 1,
      where: {
        [Op.and]: [
          { household_status: 0 },
          {
            [Op.or]: [{ household_number: whereOpt.household_number || '' }, { household_name: whereOpt.household_name || '' }]
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

  async findHousehold(pageNum, pageSize) {
    const offset = (pageNum - 1) * pageSize
    const res = await Household.findAll({
      where: { household_status: 0 }, order: [
        ['createdAt', 'DESC']
      ]
    })
    const { count, rows } = await Household.findAndCountAll({
      offset: offset, limit: pageSize * 1, where: { household_status: 0 }, order: [
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

  async findHouseholdPoor({ household_number, household_name }, pageNum, pageSize) {
    const whereOpt = {}
    const offset = (pageNum - 1) * pageSize
    household_number && Object.assign(whereOpt, { household_number })
    household_name && Object.assign(whereOpt, { household_name })
    console.log(whereOpt)

    if (whereOpt.household_number || whereOpt.household_name) {
      console.log('whereOpt不为空')
      console.log(whereOpt)
      const res = await Household.findAll({
        where: {
          [Op.and]: [
            { household_status: 0 },
            { is_poor_household: 1 },
            {
              [Op.or]: [
                { household_number: whereOpt.household_number || '' },
                { household_name: whereOpt.household_name || '' },

              ]
            }
          ]
        },
        order: [
          ['createdAt', 'DESC']
        ]
      })

      const { count, rows } = await Household.findAndCountAll({
        offset: offset,
        limit: pageSize * 1,
        where: {
          [Op.and]: [
            { household_status: 0 },
            { is_poor_household: 1 },
            {
              [Op.or]: [
                { household_number: whereOpt.household_number || '' },
                { household_name: whereOpt.household_name || '' },

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
      const res = await Household.findAll({
        where: {

          [Op.and]: [
            { is_poor_household: 1 },
            { household_status: 0 }
          ]
        },
        order: [
          ['createdAt', 'DESC']
        ]
      })
      console.log('whereOpt为空')

      const { count, rows } = await Household.findAndCountAll({
        offset: offset,
        limit: pageSize * 1,
        where: {
          [Op.and]: [
            { is_poor_household: 1 },
            { household_status: 0 }
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
    }


  }

  async findHouseholdNotPoor({ household_number, household_name }, pageNum, pageSize) {
    const whereOpt = {}
    const offset = (pageNum - 1) * pageSize
    household_number && Object.assign(whereOpt, { household_number })
    household_name && Object.assign(whereOpt, { household_name })
    console.log(whereOpt)

    if (whereOpt.household_number || whereOpt.household_name) {
      console.log('whereOpt不为空')
      console.log(whereOpt)
      const res = await Household.findAll({
        where: {
          [Op.and]: [
            { household_status: 0 },
            { is_poor_household: 0 },
            {
              [Op.or]: [
                { household_number: whereOpt.household_number || '' },
                { household_name: whereOpt.household_name || '' },

              ]
            }
          ]
        },
        order: [
          ['createdAt', 'DESC']
        ]
      })

      const { count, rows } = await Household.findAndCountAll({
        offset: offset,
        limit: pageSize * 1,
        where: {
          [Op.and]: [
            { household_status: 0 },
            { is_poor_household: 0 },
            {
              [Op.or]: [
                { household_number: whereOpt.household_number || '' },
                { household_name: whereOpt.household_name || '' },

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
      const res = await Household.findAll({
        where: {

          [Op.and]: [
            { is_poor_household: 0 },
            { household_status: 0 }
          ]
        },
        order: [
          ['createdAt', 'DESC']
        ]
      })
      console.log('whereOpt为空')

      const { count, rows } = await Household.findAndCountAll({
        offset: offset,
        limit: pageSize * 1,
        where: {
          [Op.and]: [
            { is_poor_household: 0 },
            { household_status: 0 }
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
    }


  }

  async removeHousehold(id) {
    const res = await Household.update({ household_status: 1 }, { where: { id } })

    return res > 0 ? true : false
  }

  async restoreHousehold(id) {
    const res = await Household.update({ household_status: 0 }, { where: { id } })

    return res > 0 ? true : false
  }
}

module.exports = new HouseholdService()
