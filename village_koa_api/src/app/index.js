const path = require('path')

const Koa = require('koa')
const { koaBody } = require('koa-body')
// const Bodyparser = require('koa-bodyparser')
// const Formidable = require('koa2-formidable')
// const koaStaticCache = require('koa-static-cache')
const KoaStatic = require('koa-static')
const parameter = require('koa-parameter')

const errHandler = require('./errHandler')
const app = new Koa()

const cors = require('@koa/cors')
app.use(cors())

const router = require('../router')

// // 解析post
// app.use(Bodyparser())

// // 解析formdata数据，否则ctx.request.body为空
// app.use(Formidable())
// app.use(koaStaticCache(path.join(__dirname, '../public'), {
//   prefix: '/public',
//   gzip: true
// }))

app.use(
  koaBody({
    multipart: true,
    formidable: {
      // 在配置选项option里，不推荐使用相对路径
      // 在option里的相对路径，不是相对的当前文件，相对process.cwd()  也就是D:\Code\Node.js\koa_api
      // uploadDir: './src/uploads',
      uploadDir: path.join(__dirname, '../uploads'),
      keepExtensions: true
    },
    parsedMethods: ['POST', 'PUT', 'PATCH', 'DELETE']
  })
)

app.use(KoaStatic(path.join(__dirname, '../uploads')))
app.use(parameter(app))

app.use(router.routes()).use(router.allowedMethods())

app.on('error', errHandler)
module.exports = app
