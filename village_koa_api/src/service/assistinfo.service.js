const Assistinfo = require('../model/assistinfo.model')
const { Op } = require('sequelize')

class AssistinfoService {
  async addAssistinfo(assistinfo) {
    const res = await Assistinfo.create(assistinfo)
    return res.dataValues
  }

  async findAssistinfo(pageNum, pageSize) {
    const offset = (pageNum - 1) * pageSize
    const res = await Assistinfo.findAll({ where: { assistinfo_status: 0 } })
    const { count, rows } = await Assistinfo.findAndCountAll({ offset: offset, limit: pageSize * 1, where: { assistinfo_status: 0 }, order: [['createdAt', 'DESC']] })
    return {
      page: pageNum,
      limit: pageSize,
      total: count,
      pageList: rows,
      list: res
    }
  }

  async findMoreAssistinfo({ recipient, executive_condition }, pageNum, pageSize) {
    const whereOpt = {}
    const offset = (pageNum - 1) * pageSize

    recipient && Object.assign(whereOpt, { recipient })
    executive_condition && Object.assign(whereOpt, { executive_condition })
    console.log(whereOpt.recipient, whereOpt.executive_condition)

    // 定义处理[Op.and]的查询条件数组函数
    function OpAndHandler(assistinfo_status, recipient, executive_condition) {
      let OpAnd = [
        { assistinfo_status },
        { recipient },
        { executive_condition }
      ]
      let arr = []
      arr = OpAnd.map(item => {
        for (const key in item) {
          return item[key]
        }
      })
      if (arr.indexOf(undefined) !== -1) {
        OpAnd.splice(arr.indexOf(undefined), 1)
      }
      return OpAnd
    }

    const res = await Assistinfo.findAll({
      where: {
        [Op.and]: OpAndHandler(0, whereOpt.recipient, whereOpt.executive_condition)
      },
      order: [
        ['createdAt', 'DESC']
      ]
    })

    const { count, rows } = await Assistinfo.findAndCountAll({
      offset: offset,
      limit: pageSize * 1,
      where: {
        [Op.and]: OpAndHandler(0, whereOpt.recipient, whereOpt.executive_condition)
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

  async findOneAssistinfo(id) {
    const res = await Assistinfo.findOne({
      where: { id }
    })
    console.log('findOneAssistinfo', res)
    return res
  }

  async updateAssistinfo(id, assistinfo) {
    console.log(id)
    console.log(assistinfo)
    const res = await Assistinfo.update(assistinfo, { where: { id } })

    return res[0] > 0 ? true : false
  }

  async removeAssistinfo(id) {
    const res = await Assistinfo.update({ assistinfo_status: 1 }, { where: { id } })

    return res > 0 ? true : false
  }

  async restoreAssistinfo(id) {
    const res = await Assistinfo.update({ assistinfo_status: 0 }, { where: { id } })

    return res > 0 ? true : false
  }


}

module.exports = new AssistinfoService()