const { DataTypes } = require('sequelize')

const seq = require('../db/seq')

// 系统接口与菜单关联表
const MenuApi = seq.define('menuapi', {
  menuId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: '关联菜单'
  },
  apiId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    comment: '关联api'
  },
},
  {
    tableName: 'menuapi'
  }
)

// MenuApi.sync({ force: true })

module.exports = {
  MenuApi
}
