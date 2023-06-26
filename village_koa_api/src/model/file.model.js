const { DataTypes } = require('sequelize')

const seq = require('../db/seq')

const File = seq.define('file', {
  file_originalFilename: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: '文件原名'
  },
  file_basename: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: '文件名'
  },
  file_mimetype: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: '文件类型'
  },
  file_status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: 0,
    comment: '文件状态，0：未删除，1：已删除'
  }
})

// File.sync({ force: true })

module.exports = File