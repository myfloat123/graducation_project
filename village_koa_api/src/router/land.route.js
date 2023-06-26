const Router = require('koa-router')

const { auth, hadAdminPermission } = require('../middleware/auth.middleware')

const { validator } = require('../middleware/land.middleware')

const { add, update, find, remove, restore, batchRemove } = require('../controller/land.controller')

const router = new Router({ prefix: '/land' })

// 新增土地流转信息接口
router.post('/add', auth, hadAdminPermission, validator, add)

// 修改土地流转信息接口
router.put('/:id', auth, hadAdminPermission, validator, update)

// 获取土地流转信息接口
router.get('/info', auth, find)

// 逻辑删除土地流转信息接口
router.post('/info/:id/off', auth, hadAdminPermission, remove)
// 逻辑恢复土地流转信息接口
router.post('/info/:id/on', auth, hadAdminPermission, restore)
// 批量删除土地流转信息接口
router.post('/info/batchremove', auth, hadAdminPermission, batchRemove)

module.exports = router