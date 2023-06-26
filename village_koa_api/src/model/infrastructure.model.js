const { DataTypes } = require('sequelize')

const seq = require('../db/seq')

const Infrastructure = seq.define('infrastructure', {
  infra_code: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '基础设施编号'
  },
  infra_name: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '基础设施名称'
  },
  infra_type: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1,
    comment: '基础设施类型，1：生产性基础设施，2：生活性基础设施，3：人文性基础设施，4：流通性基础设施'
  },
  location: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '位置'
  },
  construction_date: {
    type: DataTypes.DATE,
    allowNull: true,
    comment: '建设日期'
  },
  construction_unit: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '建设单位'
  },
  construction_capital: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: '建设资金'
  },
  use_condition: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 1,
    comment: '使用情况，1：正常，2：闲置，3：废弃'
  },
  operation_condition: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 1,
    comment: '运行状况，1：良好，2：已维修，3：待维修'
  },
  maintain_condition: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 1,
    comment: '维修情况，1：无需维修，2：已维修，3：待维修'
  },
  infra_status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: 0,
    comment: '基础信息状态，0：未删除，1：已删除'
  },
  exist_issue: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: '存在问题'
  },
  improvement_measure: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: '改进措施'
  }
})

// Infrastructure.sync({ force: true })

module.exports = Infrastructure