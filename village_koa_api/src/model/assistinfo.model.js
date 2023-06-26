const { DataTypes } = require('sequelize')

const seq = require('../db/seq')

// const Household = require('./household.model')

const Assistinfo = seq.define('assistinfo', {
  assist_code: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '帮扶编号'
  },
  recipient: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '受助户主'
  },
  assist_content: {
    type: DataTypes.TEXT,
    allowNull: false,
    comment: '帮扶内容'
  },
  executive_condition: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: 0,
    comment: '执行情况，0：未执行，1：已执行'
  },
  assistinfo_status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: 0,
    comment: '帮扶信息状态，0：未删除，1：已删除'
  }
})

// Assistinfo.sync({ force: true })
// Assistinfo.belongsTo(Household, {
//   foreignKey: 'household_number',
//   as: 'household_info'
// })

module.exports = Assistinfo