const { DataTypes } = require('sequelize')

const seq = require('../db/seq')

const User = require('./user.model')
const Role = require('./role.model')

const UserRole = seq.define('userrole', {
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id'
    }
  },
  roleId: {
    type: DataTypes.INTEGER,
    references: {
      model: Role,
      key: 'id'
    }
  }
},
  {
    tableName: 'userrole'
  }
)

// UserRole.sync({ force: true })

module.exports = UserRole