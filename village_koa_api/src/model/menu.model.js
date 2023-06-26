const { DataTypes } = require('sequelize')

const seq = require('../db/seq')
const { verification } = require('../db/verification')

const model = {
  type: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1102,
    comment: '菜单类型：1101为目录 1102为菜单 1103为功能（按钮）',
    verification: 'number',
  },
  label: {
    allowNull: false,
    comment: '目录/菜单/功能名称',
    type: DataTypes.STRING,
    verification: 'string',
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: '前端标识(组件/路由名称)',
    verification: 'string'
  },
  parentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    comment: '父目录id',
    verification: 'number',
  },
  perm: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: '功能标识',
    verification: 'string'

  },
  apiIds: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'apis，主要是方便前端回显',
    verification: 'array',
    // get() {
    //   return this.getDataValue('apiIds').split(',').filter(item => item != "")
    // },
    // set(value) {
    //   return this.setDataValue('apiIds', value.join(','))
    // }
  },
  icon: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'icon',
    verification: 'string',
  },
  hidden: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '是否隐藏 1101隐藏 1102显示',
    verification: 'number',
  },
  sort: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    comment: '排序',
    verification: 'number',
  }
}

const verifiMenus = (data) => {
  return verification(data, model)
}

// 系统接口表
const Menu = seq.define('menu', model)

// Menu.sync({ force: true })

module.exports = {
  Menu,
  verifiMenus
}