const Router = require('koa-router')

const { auth, hadAdminPermission } = require('../middleware/auth.middleware')

const { validator } = require('../middleware/villager.middleware')

const { add, upload, update, findAll, remove, restore, findOne, batchRemove, findMore } = require('../controller/villager.controller')

const router = new Router({ prefix: '/villagers' })

// 村民相片上传接口
router.post('/upload', auth, hadAdminPermission, upload)

// 新增村民信息接口
router.post('/add', auth, hadAdminPermission, validator, add)

// 修改村民信息接口
router.put('/:id', auth, hadAdminPermission, validator, update)

// 获取村民信息接口
router.get('/', auth, findAll)

// 获取单条村民信息接口
router.get('/info', auth, findOne)
// 获取多条村民信息接口
router.get('/moreinfo', auth, findMore)

// 逻辑删除村民信息接口
router.post('/:id/off', auth, hadAdminPermission, remove)
// 逻辑恢复村民信息接口
router.post('/:id/on', auth, hadAdminPermission, restore)
// 批量删除村民信息接口
router.post('/batchremove', auth, hadAdminPermission, batchRemove)
module.exports = router
