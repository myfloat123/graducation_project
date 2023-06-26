const Router = require('koa-router')

const { auth, hadAdminPermission } = require('../middleware/auth.middleware')

const { validator } = require('../middleware/housebuild.middleware')

const { add, update, find, remove, restore, batchRemove } = require('../controller/housebuild.controller')

const router = new Router({ prefix: '/housebuild' })

// 新增房屋建筑信息
router.post('/add', auth, hadAdminPermission, validator, add)

// 修改房屋建筑信息
router.put('/:id', auth, hadAdminPermission, validator, update)

// 获取房屋建筑信息接口
router.get('/info', auth, find)

// 逻辑删除房屋建筑信息接口
router.post('/info/:id/off', auth, hadAdminPermission, remove)
// 逻辑恢复房屋建筑信息接口
router.post('/info/:id/on', auth, hadAdminPermission, restore)
// 批量删除房屋建筑信息接口
router.post('/info/batchremove', auth, hadAdminPermission, batchRemove)

module.exports = router