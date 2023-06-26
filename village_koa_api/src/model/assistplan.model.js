const { DataTypes } = require('sequelize')

const seq = require('../db/seq')
const Assistinfo = require('./assistinfo.model')

const Assistplan = seq.define('assistplan', {
  assist_code: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '帮扶编号',
  },
  assist_demand: {
    type: DataTypes.TEXT,
    allowNull: false,
    comment: '帮扶需求'
  },
  assist_type: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    comment: '0：经济扶贫，1：教育扶贫，2：医疗扶贫，3：住房扶贫，4：精准扶贫，5：社会扶贫，6：就业扶贫，7：产业扶贫，8：其他'
  },
  accountability_unit: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '责任单位'
  },
  principal: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '责任人'
  },
  assistplan_status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: 0,
    comment: '帮扶计划状态，0：未删除，1：已删除'
  }
})

// Assistplan.sync({ force: true })
Assistplan.belongsTo(Assistinfo, {
  foreignKey: 'assist_code',
  as: 'assistinfo'
})

module.exports = Assistplan