const Finance = require('../model/finance.model')
const { Op } = require('sequelize')

class FinanceService {
  async addFinance(finance) {
    const res = await Finance.create(finance)
    return res.dataValues
  }

  async updateFinance(id, finance) {
    const res = await Finance.update(finance, { where: { id } })
    return res[0] > 0 ? true : false
  }

  async findFinance({ finance_code, finance_type }, pageNum, pageSize) {
    const whereOpt = {}
    const offset = (pageNum - 1) * pageSize
    finance_code && Object.assign(whereOpt, { finance_code })
    finance_type && Object.assign(whereOpt, { finance_type })
    console.log(whereOpt)

    if (whereOpt.finance_code || whereOpt.finance_type) {
      console.log('whereOpt不为空')
      console.log(whereOpt)
      const res = await Finance.findAll({
        where: {
          [Op.and]: [
            { finance_status: 0 },
            {
              [Op.or]: [
                { finance_code: whereOpt.finance_code || '' },
                { finance_type: whereOpt.finance_type || '' }
              ]
            }
          ]
        },
        order: [
          ['createdAt', 'DESC']
        ]
      })

      const { count, rows } = await Finance.findAndCountAll({
        offset: offset,
        limit: pageSize * 1,
        where: {
          [Op.and]: [
            { finance_status: 0 },
            {
              [Op.or]: [
                { finance_code: whereOpt.finance_code || '' },
                { finance_type: whereOpt.finance_type || '' }
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
      const res = await Finance.findAll({
        where: {
          finance_status: 0
        },
        order: [
          ['createdAt', 'DESC']
        ]
      })
      console.log('whereOpt为空')

      const { count, rows } = await Finance.findAndCountAll({
        offset: offset,
        limit: pageSize * 1,
        where: {
          finance_status: 0
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

  async findFinanceAll() {
    const res = await Finance.findAll({
      where: {
        finance_status: 0
      },
      order: [
        ['createdAt', 'DESC']
      ]
    })
    // console.log(res)

    return {
      list: res
    }
  }

  async removeFinance(id) {
    const res = await Finance.update({ finance_status: 1 }, { where: { id } })

    return res > 0 ? true : false
  }

  async restoreFinance(id) {
    const res = await Finance.update({ finance_status: 0 }, { where: { id } })

    return res > 0 ? true : false
  }
}

module.exports = new FinanceService()