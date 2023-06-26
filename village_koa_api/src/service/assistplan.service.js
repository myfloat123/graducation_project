const Assistplan = require('../model/assistplan.model')
const Assistinfo = require('../model/assistinfo.model')
const { invalidAssistplanId } = require('../constant/err.type')

class AssistplanService {
  async addAssistplan(assistplan) {
    const res = await Assistplan.create(assistplan)
    return res.dataValues
  }

  async findAssistplan(pageNum, pageSize) {
    const offset = (pageNum - 1) * pageSize
    const res = await Assistplan.findAll({ where: { assistplan_status: 0 } })
    const { count, rows } = await Assistplan.findAndCountAll({ offset: offset, limit: pageSize * 1, where: { assistplan_status: 0 }, include: { model: Assistinfo, as: 'assistinfo' } })
    return {
      page: pageNum,
      limit: pageSize,
      total: count,
      pageList: rows,
      list: res
    }
  }

  async findOneAssistplan(id) {
    try {
      const res = await Assistplan.findOne({
        where: typeof id == 'number' ? { id } : { assist_code: id },
        include: { model: Assistinfo, as: 'assistinfo' }
      })
      return res
    } catch (err) {
      console.error(err)
    }

  }

  async updateAssistplan(id, assistplan) {
    console.log(id)
    console.log(assistplan)
    const res = await Assistplan.update(assistplan, { where: { id } })

    return res[0] > 0 ? true : false
  }

  async removeAssistplan(id) {
    const res = await Assistplan.update({ assistplan_status: 1 }, { where: { id } })

    return res > 0 ? true : false
  }


  async removeAssistplanByAssistCode(assist_code) {
    console.log('assist_code', assist_code)
    const res = await Assistplan.update({ assistplan_status: 1 }, { where: { assist_code: assist_code + '' } })
    console.log('removeAssistplanByAssistCode', res)
    console.log('removeAssistplanByAssistCode', Object.prototype.toString.call(res))
    console.log('removeAssistplanByAssistCode', Object.prototype.toString.call(res[0]))

    return (Object.prototype.toString.call(res) == '[object Number]' ? res : res[0]) > 0 ? true : false
  }

  async restoreAssistplan(id) {
    const res = await Assistplan.update({ assistplan_status: 0 }, { where: { id } })

    return res > 0 ? true : false
  }

  async restoreAssistplanByAssistCode(assist_code) {
    const res = await Assistplan.update({ assistplan_status: 0 }, { where: { assist_code } })

    return res > 0 ? true : false
  }


}

module.exports = new AssistplanService()