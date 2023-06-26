const Router = require('koa-router')

const { auth, hadAdminPermission } = require('../middleware/auth.middleware')

const { validator } = require('../middleware/hygiene.middleware')

const { add, update, find, remove, restore, batchRemove } = require('../controller/hygiene.controller')

const router = new Router({ prefix: '/hygiene' })

// 新增环境卫生信息接口
router.post('/add', auth, hadAdminPermission, add)

// 修改环境卫生信息接口
router.put('/:id', auth, hadAdminPermission, validator, update)

// 获取环境卫生信息接口
router.get('/info', auth, find)

// 逻辑删除环境卫生信息接口
router.post('/info/:id/off', auth, hadAdminPermission, remove)
// 逻辑恢复环境卫生信息接口
router.post('/info/:id/on', auth, hadAdminPermission, restore)
// 批量删除环境卫生信息接口
router.post('/info/batchremove', auth, hadAdminPermission, batchRemove)


module.exports = router