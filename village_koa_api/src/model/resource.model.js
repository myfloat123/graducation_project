const { DataTypes } = require('sequelize')

const seq = require('../db/seq')

const Resource = seq.define('resource', {
  resource_code: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '资源编号'
  },
  resource_name: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '资源名称'
  },
  resource_picture: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: '资源图片'
  },
  resource_kind: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 1,
    comment: '资源种类，1：矿产资源，2：水资源，3：森林资源，4：土地资源，5：生物资源，6：农业资源，7：其他资源'
  },
  resource_reserves: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '资源储量'
  },
  resource_reserves_unit: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 1,
    comment: '储量单位，1：吨，2：升，3：亩，4：只，5：个，6：平方千米'
  },
  resource_location: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '资源位置'
  },
  resource_use: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: '资源用途'
  },
  resource_status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: 0,
    comment: '自然资源状态，0：未删除，1：已删除'
  }
})

// Resource.sync({ force: true })

module.exports = Resource