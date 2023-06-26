const { DataTypes } = require('sequelize')

const seq = require('../db/seq')

const Role = require('./role.model')

// 创建模型(Model user -> users)
const User = seq.define('user', {
  // id 会被sequelize自动创建，管理
  user_name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    comment: '用户名，唯一'
  },
  password: {
    type: DataTypes.CHAR(64),
    allowNull: false,
    comment: '密码'
  },
  avatar: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: '头像'
  },
  role_name: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: '角色名称'
  },
  state: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    comment: '0：管理员，1：行政村领导，2：办事员，3：会计'
  },
  user_status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: 0,
    comment: '0：未删除，1：已删除'
  },
  role_name: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: '角色名称'
  }
})

// 强制同步数据库(创建数据表)
// User.sync({ force: true })

// 定义User和Role的多对多关联，通过UserRole表
User.belongsToMany(Role, { through: 'UserRole' })
Role.belongsToMany(User, { through: 'UserRole' })

module.exports = User
