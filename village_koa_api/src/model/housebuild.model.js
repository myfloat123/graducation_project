const { DataTypes } = require('sequelize')

const seq = require('../db/seq')

const Housebuild = seq.define('housebuild', {
  housebuild_code: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '房屋建筑编号'
  },
  villager_name: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '村民姓名'
  },
  have_or_not_safety_danger: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '有无安全隐患，1：有，2：无'
  },
  have_or_not_violate_build: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '有无违规建筑，1：有，2：无'
  },
  housebuild_status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: 0,
    comment: '房屋建筑状态，0：未删除，1：已删除'
  }
})

// Housebuild.sync({ force: true })

module.exports = Housebuild