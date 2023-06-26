const { DataTypes } = require('sequelize')

const seq = require('../db/seq')

const Land = seq.define('land', {
  land_code: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '土地流转合同编号'
  },
  land_transfer_person: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '流转人'
  },
  land_receive_person: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '接收人'
  },
  land_sign_contract_date: {
    type: DataTypes.DATE,
    allowNull: false,
    comment: '签约日期'
  },
  land_transfer_term: {
    type: DataTypes.DATE,
    allowNull: false,
    comment: '截止日期'
  },
  land_transfer_type: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
    comment: '流转类型，1：出租、2：转让、3：互换'
  },
  land_transfer_price: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '流转价格'
  },
  land_unit: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
    comment: '单位，1：万/亩、2：万/公顷、3：万/顷'
  },
  land_use: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: '用途'
  },
  land_status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: 0,
    comment: '土地流转状态，0：未删除，1：已删除'
  }

})

// Land.sync({ force: true })

module.exports = Land