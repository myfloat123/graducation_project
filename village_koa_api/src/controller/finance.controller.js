const fs = require('fs')
const path = require('path')
const NXLSX = require('node-xlsx')
const Mock = require('mockjs')
const ExcelJS = require('exceljs')
const xlsx = require('xlsx')
const dayjs = require('dayjs')
const { dateFormat } = require('../lib/15-dataFormat')

const { addFinanceError, invalidFinanceId } = require('../constant/err.type')

const { addFinance, updateFinance, findFinance, removeFinance, restoreFinance, findFinanceAll } = require('../service/finance.service')

class FinanceController {
  async add(ctx, next) {
    try {
      const res = await addFinance(ctx.request.body)
      ctx.body = {
        code: 0,
        message: '新增财务信息成功',
        result: res
      }
    } catch (err) {
      console.error(err)
      return ctx.app.emit('error', addFinanceError, ctx)
    }
  }

  async update(ctx, next) {
    try {
      const res = await updateFinance(ctx.params.id, ctx.request.body)
      if (res) {
        ctx.body = {
          code: 0,
          message: '修改财务信息成功',
          result: ''
        }
      } else {
        return ctx.app.emit('error', invalidFinanceId, ctx)
      }
    } catch (err) {
      console.error(err)
    }
  }

  async find(ctx, next) {
    const { finance_code, finance_type, page = 1, limit = 3 } = ctx.request.query
    // console.log(page, limit)
    const res = await findFinance({ finance_code, finance_type }, page, limit)
    if (res.list.length < 1) {
      ctx.body = {
        code: 0,
        message: '财务信息为空',
        result: res
      }
    } else {
      ctx.body = {
        code: 0,
        message: '获取财务信息成功',
        result: res
      }
    }

    return res
  }

  async remove(ctx, next) {
    const res = await removeFinance(ctx.params.id)
    if (res) {
      ctx.body = {
        code: 0,
        message: '删除财务信息成功',
        result: ''
      }
    } else {
      return ctx.app.emit('error', invalidFinanceId, ctx)
    }
  }

  async restore(ctx, next) {
    const res = await restoreFinance(ctx.params.id)
    if (res) {
      ctx.body = {
        code: 0,
        message: '恢复财务信息成功',
        result: ''
      }
    } else {
      return ctx.app.emit('error', invalidFinanceId, ctx)
    }
  }

  async batchRemove(ctx, next) {
    let Ids
    if (Object.prototype.toString.call(ctx.request.body) === '[object Array]') {
      const ids = ctx.request.body
      Ids = ids
    } else {
      const { ids } = ctx.request.body
      Ids = ids
    }
    console.log('finances', Ids)
    let flag = null
    try {
      Ids.forEach(async Id => {
        await removeFinance(Id)
      })
      ctx.body = {
        code: 0,
        message: '批量删除成功',
        result: ''
      }
    } catch (err) {
      console.error(err)
      return ctx.app.emit('error', invalidFinanceId, ctx)
    }
  }

  // async download(ctx, next) {
  //   //表头
  //   // const _headers = ['财务编号', '类型', '金额', '说明', '创建时间']
  //   const _headers = ['序号', '姓名', '年龄', '省', "市", "区"]
  //   // const res = await findFinanceAll()
  //   // console.log(res)
  //   // const _data = res.list
  //   //表格数据
  //   const _data = [...Mock.mock({
  //     "arr|30-30": [{
  //       "id|+1": 1,
  //       name: "@cname",
  //       "age|18-34": 23,
  //       "province": "@province",
  //       "city": "@city",
  //       "county": "@county"
  //     }]
  //   }).arr]
  //   let data = []
  //   for (let i = 0; i < _data.length; i++) {
  //     let arr = []
  //     for (let key in _data[i]) {
  //       arr.push(_data[i][key])
  //     }
  //     data.push(arr)
  //   }
  //   data.unshift(_headers)
  //   console.log(data)
  //   let buffer = NXLSX.build([{ name: 'sheetName', data: data }])
  //   ctx.body = buffer
  //   // ctx.body = {
  //   //   code: 0,
  //   //   message: '获取数据成功',
  //   //   result: data
  //   // }
  //   // ctx.body = {
  //   //   code: 0,
  //   //   message: '下载Excel表格成功',
  //   //   result: res
  //   // }

  // }

  // async download1(ctx, next) {
  //   try {
  //     // 0代表不查出来的字段， 1代表是查出来的字段
  //     const list = await ArticleSchema.find({}, { _id: 0, userName: 1, publishTime: 1, contentType: 1 }).exec()
  //     // 格式化数组
  //     const valuesArr = list.map(item => [item.userName, item.contentType, moment(item.publishTime).format('YYYY-MM-DD HH:mm:ss')])
  //     valuesArr.unshift(['用户名', '内容类型', '发布时间'])
  //     // 转化为二进制的buffer数据流
  //     const bufferData = nodeXlsx.build([{ name: '报表', data: valuesArr }])
  //     const lodashCount = lodash.uniqueId()
  //     ctx.body = {
  //       code: 200,
  //       message: lodashCount
  //     }
  //     // 命名不同的文件名，否则报错
  //     fs.writeFileSync(`${__dirname}/downloads/xlsx_${lodashCount}.xlsx`, bufferData)
  //   } catch (error) {
  //     ctx.body = {
  //       code: 500,
  //       message: '导出失败',
  //       error
  //     }
  //   }
  // }

  // 下载Excel表格模板
  async download(ctx, next) {
    const { fields } = ctx.query

    // 创建一个Excel工作簿
    const workbook = new ExcelJS.Workbook()
    const sheet = workbook.addWorksheet('Sheet1')

    // 设置表头
    sheet.addRow(fields.split(','))

    // 设置响应头，告知浏览器下载文件
    ctx.set('Content-disposition', 'attachment;filename=template.xlsx')
    ctx.set('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')

    // 写入Excel文件到响应中
    const buffer = await workbook.xlsx.writeBuffer()
    ctx.body = buffer
  }

  // 导出Excel表格
  async derive(ctx, next) {
    // 创建Excel工作簿
    const workbook = new ExcelJS.Workbook()
    const worksheet = workbook.addWorksheet('Sheet1')

    let res = await findFinanceAll()
    // console.log(res.list[0].finance_type)
    // 财务类型字典
    let dict_finance_type = [
      { id: 1, finance_type: '收入' },
      { id: 2, finance_type: '支出' }
    ]
    // 金额单位
    let dict_finance_money_unit = [
      { id: 1, finance_money_unit: '万' },
      { id: 2, finance_money_unit: '十万' },
      { id: 3, finance_money_unit: '百万' },
      { id: 4, finance_money_unit: '千万' },
      { id: 5, finance_money_unit: '亿' }
    ]
    res.list.forEach(item => {
      if (typeof item.finance_type !== 'string') {
        dict_finance_type.forEach(item1 => {
          if (item.finance_type === item1.id) {
            item.finance_type = item1.finance_type
            // console.log(item.finance_type)
          }
        })
      }
      if (typeof item.finance_money_unit !== 'string') {
        dict_finance_money_unit.forEach(item1 => {
          if (item.finance_money_unit === item1.id) {
            item.finance_money_unit = item1.finance_money_unit
          }
        })
      }
    })
    // console.log(res.list[0].createdAt)
    // console.log(dayjs(res.list[0].createdAt).format('YYYY-MM-DD HH:mm:ss'))
    // console.log(res.list[0].finance_type)
    // console.log(res.list[0].finance_money_unit)
    // console.log(res.list)
    // 设置Excel表头
    worksheet.columns = [
      { header: '财务编号', key: 'finance_code' },
      { header: '类型', key: 'finance_type' },
      { header: '金额', key: 'finance_money' },
      { header: '单位', key: 'finance_money_unit' },
      { header: '说明', key: 'finance_explain' },
      { header: '创建时间', key: 'createdAt' },
    ]
    // 添加数据行
    // console.log(dateFormat('2023-04-21T14:38:15.000Z'))

    res.list.forEach(item => {


      // console.log(item.createdAt)
      worksheet.addRow(item)

    })

    // 生成Excel文件
    const buffer = await workbook.xlsx.writeBuffer()

    // 设置响应头
    ctx.set('Content-Type', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    ctx.set('Content-Disposition', 'attachment; filename=example.xlsx')

    // 将Excel文件作为响应体返回给客户端
    ctx.body = buffer
  }

  // 导入Excel表格
  async lead(ctx, next) {
    const file = ctx.request.files.file
    // console.log(file)
    if (file.filepath == undefined) return
    const workbook = xlsx.read(file.filepath, { type: 'file' })
    const sheetName = workbook.SheetNames[0]
    const sheet = workbook.Sheets[sheetName]
    const data = xlsx.utils.sheet_to_json(sheet)
    // 深拷贝
    let originData = []
    originData = JSON.parse(JSON.stringify(data))
    // console.log(data)
    let fieldArr = ['finance_code', 'finance_type', 'finance_money', 'finance_money_unit', 'finance_explain', 'createdAt']
    // console.log(data)
    let count = 0
    data.forEach(item1 => {
      for (const key in item1) {
        item1[fieldArr[count]] = item1[key]
        delete item1[key]
        count = count + 1
      }
      count = 0
    })
    // console.log(data)
    // 深拷贝
    let handleData = []
    handleData = JSON.parse(JSON.stringify(data))
    // console.log(handleData)
    data.forEach(item => {
      for (const key in item) {
        if (key === 'createdAt') {
          delete item[key]
        }
      }
    })
    // console.log(data)
    // 财务类型字典
    let dict_finance_type = [
      { id: 1, finance_type: '收入' },
      { id: 2, finance_type: '支出' }
    ]
    // 金额单位
    let dict_finance_money_unit = [
      { id: 1, finance_money_unit: '万' },
      { id: 2, finance_money_unit: '十万' },
      { id: 3, finance_money_unit: '百万' },
      { id: 4, finance_money_unit: '千万' },
      { id: 5, finance_money_unit: '亿' }
    ]
    let resArr = []

    data.forEach(async item => {
      try {
        console.log(typeof item.finance_type)
        if (typeof item.finance_type === 'string') {
          dict_finance_type.forEach(item1 => {
            if (item1.finance_type == item.finance_type) {
              item.finance_type = item1.id
            }
          })
        }
        console.log(typeof item.finance_money_unit)
        if (typeof item.finance_money_unit === 'string') {
          dict_finance_money_unit.forEach(item1 => {
            if (item1.finance_money_unit == item.finance_money_unit) {
              item.finance_money_unit = item1.id
            }
          })
        }

        const res = await addFinance(item)
      } catch (err) {
        console.error(err)
        addFinanceError.result = err
        return ctx.app.emit('error', addFinanceError, ctx)
      }
    })
    // console.log(addFinanceError.result)
    if (addFinanceError.result !== '') {
      ctx.body = {
        code: -1,
        message: '财务编号重复',
        result: ''
      }
    } else {
      ctx.body = {
        code: 0,
        message: '文件上传成功',
        result: {
          originData,
          handleData,
          data
        }
      }
    }
  }
}

module.exports = new FinanceController()