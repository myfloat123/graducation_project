const { DataTypes } = require('sequelize')

const seq = require('../db/seq')

const Finance = seq.define('finance', {
  finance_code: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '财务编号'
  },
  finance_type: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
    comment: '财务类型，1：收入，2：支出'
  },
  finance_money: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '金额'
  },
  finance_money_unit: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
    comment: '单位，1：万，2：十万，3：百万，4：千万，5：亿'
  },
  finance_explain: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: '说明'
  },
  finance_status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: 0,
    comment: '财务状态，0：未删除，1：已删除'
  }
})

// Finance.sync({ force: true })

module.exports = Finance
