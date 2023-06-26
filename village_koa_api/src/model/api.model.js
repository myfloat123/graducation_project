const { DataTypes } = require('sequelize')

const seq = require('../db/seq')

// 系统接口表
const Api = seq.define('api', {
  jwtUnless: {
    type: DataTypes.BOOLEAN,
    default: true,
    allowNull: true,
    comment: '是否需要token'
  },
  type: {
    type: DataTypes.INTEGER,
    allowNull: false,
    default: 1102,
    comment: 'api类型：1101为目录和菜单 1102为api接口'
  },
  parentId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    default: 0,
    comment: '父目录id'
  },
  url: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: 'api路径'
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: 'api名称'
  },
  method: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: '请求方法'
  }
})

// Api.sync({ force: true })


module.exports = {
  Api
}
