const { DataTypes } = require('sequelize')

const seq = require('../db/seq')

const Hygiene = seq.define('hygiene', {
  hygiene_code: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '环境卫生编号'
  },
  hygiene_accendant: {
    type: DataTypes.STRING,
    allowNull: false,
    comment: '维护人员'
  },
  hygiene_trash_can_number: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    comment: '垃圾桶数量'
  },
  hygiene_trash_can_clean_situation: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
    comment: '垃圾桶清理情况，0：无，1：待清理，2：已清理'
  },
  hygiene_toilet_number: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    comment: '厕所数量'
  },
  hygiene_toilet_clean_situation: {
    type: DataTypes.INTEGER,
    allowNull: true,
    defaultValue: 0,
    comment: '厕所清洁情况，0：无，1：干净，2：较干净，3：很脏，4：无'
  },
  hygiene_remark: {
    type: DataTypes.TEXT,
    allowNull: true,
    comment: '备注'
  },
  hygiene_status: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: 0,
    comment: '环境卫生状态，0：未删除，1：已删除'
  }
})

// Hygiene.sync({ force: true })

module.exports = Hygiene