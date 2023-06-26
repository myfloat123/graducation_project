const File = require('../model/file.model')
const { Op } = require('sequelize')

class FileService {
  async addFile(file) {
    const res = await File.create(file)
    return res.dataValues
  }

  async updateFile(id, file) {
    const res = await File.update(file, { where: { id } })
    return res[0] > 0 ? true : false
  }

  async findFile({ file_originalFilename }, pageNum, pageSize) {
    const whereOpt = {}
    const offset = (pageNum - 1) * pageSize
    file_originalFilename && Object.assign(whereOpt, { file_originalFilename })

    if (whereOpt.file_originalFilename) {
      const res = await File.findAll({
        where: {
          [Op.and]: [
            { file_status: 0 },
          ],
          file_originalFilename: {
            [Op.substring]: whereOpt.file_originalFilename
          }
        },
        order: [
          ['createdAt', 'DESC']
        ]
      })

      const { count, rows } = await File.findAndCountAll({
        offset: offset,
        limit: pageSize * 1,
        where: {
          [Op.and]: [
            { file_status: 0 },

          ],
          file_originalFilename: {
            [Op.substring]: whereOpt.file_originalFilename
          }
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
      const res = await File.findAll({
        where: {
          file_status: 0
        },
        order: [
          ['createdAt', 'DESC']
        ]
      })

      const { count, rows } = await File.findAndCountAll({
        offset: offset,
        limit: pageSize * 1,
        where: {
          file_status: 0
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

  async removeFile(id) {
    const res = await File.update({ file_status: 1 }, { where: { id } })

    return res > 0 ? true : false
  }

  async restoreFile(id) {
    const res = await File.update({ file_status: 0 }, { where: { id } })

    return res > 0 ? true : false
  }
}

module.exports = new FileService()