const Router = require('koa-router')

const { auth, hadAdminPermission } = require('../middleware/auth.middleware')

const { upload, add, update, find, remove, restore, batchRemove } = require('../controller/file.controller')

const router = new Router({ prefix: '/files' })

// 上传文件接口
router.post('/upload', auth, hadAdminPermission, upload)

// 新增文件接口
router.post('/add', auth, hadAdminPermission, add)

// 修改文件接口
router.put('/:id', auth, hadAdminPermission, update)

// 获取文件接口
router.get('/info', find)

// 逻辑删除文件接口
router.post('/info/:id/off', auth, hadAdminPermission, remove)
// 逻辑恢复文件接口
router.post('/info/:id/on', auth, hadAdminPermission, restore)
// 批量删除文件接口
router.post('/info/batchremove', auth, hadAdminPermission, batchRemove)


module.exports = router