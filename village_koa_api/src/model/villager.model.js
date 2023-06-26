const { DataTypes } = require('sequelize')

const seq = require('../db/seq')

const Villager = seq.define('villager', {
  villager_name: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '姓名'
  },
  villager_age: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '年龄'
  },
  villager_sex: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '性别'
  },
  villager_phone: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '手机号码'
  },
  villager_ID_number: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '身份证号'
  },
  villager_address: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '住址'
  },
  villager_birthday: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '出生日期'
  },
  villager_marriage: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    comment: '婚姻情况'
  },
  villager_picture: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: '相片'
  },
  villager_email: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: '邮箱'
  },
  villager_status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: 0,
    comment: '村民的状态，0：未删除，1：已删除'
  }
})

// Villager.sync({ force: true })

module.exports = Villager
