const Router = require('koa-router')

const { auth, hadAdminPermission } = require('../middleware/auth.middleware')

const { validator } = require('../middleware/resource.middleware')

const { upload, add, update, find, remove, restore, batchRemove } = require('../controller/resource.controller')

const router = new Router({ prefix: '/resource' })

// 资源图片上传接口
router.post('/upload', auth, hadAdminPermission, upload)

// 新增自然资源信息接口
router.post('/add', auth, hadAdminPermission, validator, add)

// 修改自然资源信息接口
router.put('/:id', auth, hadAdminPermission, validator, update)

// 获取自然资源信息接口
router.get('/info', auth, find)

// 逻辑删除自然资源信息接口
router.post('/info/:id/off', auth, hadAdminPermission, remove)
// 逻辑恢复自然资源信息接口
router.post('/info/:id/on', auth, hadAdminPermission, restore)
// 批量删除自然资源信息接口
router.post('/info/batchremove', auth, hadAdminPermission, batchRemove)

module.exports = router