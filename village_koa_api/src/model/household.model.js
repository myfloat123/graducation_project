const { DataTypes } = require('sequelize')

const seq = require('../db/seq')

const Household = seq.define('household', {
  household_number: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '户号'
  },
  household_name: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '户主姓名'
  },
  household_sex: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '性别'
  },
  household_ID: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '户主身份证号'
  },
  household_birthday: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: '户主出生日期'
  },
  household_phone: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: '户主联系方式'
  },
  is_poor_household: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: 0,
    comment: '是否贫困家庭，0：否，1：是'
  },
  household_status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: 0,
    comment: '每户的状态，0：未删除，1：已删除'
  }
})

// Household.sync({ force: true })

module.exports = Household
