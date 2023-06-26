const { DataTypes } = require('sequelize')

const seq = require('../db/seq')
const Household = require('./household.model')

const Relation = seq.define('relation', {
  household_number: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '户号'
  },
  name: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: '姓名'
  },
  relation: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: '关系'
  },
  relation_status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: 0,
    comment: '户主关系状态，0：未删除，1：已删除'
  }
})

// Relation.sync({ force: true })
Relation.belongsTo(Household, {
  foreignKey: 'household_number',
  as: 'household_info'
})

module.exports = Relation
