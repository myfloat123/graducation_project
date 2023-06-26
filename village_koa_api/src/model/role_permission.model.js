const { DataTypes } = require('sequelize')

const seq = require('../db/seq')

const Role = require('./role.model')
const Permission = require('./permission.model')

const RolePermission = seq.define('rolepermission', {
  roleId: {
    type: DataTypes.INTEGER,
    references: {
      model: Role,
      key: 'id'
    }
  },
  permissionId: {
    type: DataTypes.INTEGER,
    references: {
      model: Permission,
      key: 'id'
    }
  }
},
  {
    tableName: 'rolepermission'
  }
)

// RolePermission.sync({ force: true })

module.exports = RolePermission