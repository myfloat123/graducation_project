const Router = require('koa-router')

const { auth, hadAdminPermission } = require('../middleware/auth.middleware')

const { validator } = require('../middleware/finance.middleware')

const { add, update, find, remove, restore, batchRemove, derive, lead, download } = require('../controller/finance.controller')

const router = new Router({ prefix: '/finance' })

// 新增财务信息接口
router.post('/add', auth, hadAdminPermission, validator, add)

// 修改财务信息接口
router.put('/:id', auth, hadAdminPermission, validator, update)

// 获取自然资源信息接口
router.get('/info', auth, find)

// 逻辑删除财务信息接口
router.post('/info/:id/off', auth, hadAdminPermission, remove)
// 逻辑恢复财务信息接口
router.post('/info/:id/on', auth, hadAdminPermission, restore)
// 批量删除财务信息接口
router.post('/info/batchremove', auth, hadAdminPermission, batchRemove)

// 下载财务信息Excel表格模板
router.get('/download', download)
// 导出财务信息接口
router.get('/derive', derive)
// 导入财务信息接口
router.post('/lead', lead)

module.exports = router