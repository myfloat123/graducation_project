const { DataTypes } = require('sequelize')

const seq = require('../db/seq')

const Permission = require('./permission.model')

// 创建模型
const Role = seq.define('role', {
  // id 会被sequelize自动创建，管理
  role_name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    comment: '角色名称，唯一'
  },
  role_remark: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: '备注'
  },
  role_status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: 0,
    comment: '0：未删除，1：已删除'
  }
})


// 强制同步数据库(创建数据表)
// Role.sync({ force: true })

// 定义Role和Permission的多对多关联，通过RolePermission表
Role.belongsToMany(Permission, { through: 'RolePermission' })
Permission.belongsToMany(Role, { through: 'RolePermission' })

module.exports = Role
