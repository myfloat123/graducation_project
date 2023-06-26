const { DataTypes } = require('sequelize')

const seq = require('../db/seq')


// 创建模型
const Permission = seq.define('permission', {
  // id 会被sequelize自动创建，管理
  permission_name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    comment: '权限名称，唯一'
  },
  permission_url: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: '路由'
  },
  permission_status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: 0,
    comment: '0：未删除，1：已删除'
  }
})

// 强制同步数据库(创建数据表)
// Permission.sync({ force: true })

module.exports = Permission
