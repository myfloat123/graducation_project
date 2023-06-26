const Router = require('koa-router')

const { auth, hadAdminPermission } = require('../middleware/auth.middleware')

const { validator } = require('../middleware/infrastructure.middleware')

const { add, update, findAll, findOne, findMore, remove, restore, batchRemove, updatePatch } = require('../controller/infrastructure.controller')

const router = new Router({ prefix: '/infrastructure' })

// 新增基础设施接口
router.post('/add', auth, hadAdminPermission, validator, add)

// 获取所有基础设施接口
router.get('/', auth, findAll)

// 通过搜索字段获取基础设施接口
router.get('/moreinfo', auth, findMore)

// 更新基础设施接口
router.put('/:id', auth, hadAdminPermission, validator, update)
// 补丁更新基础设施接口
router.patch('/:id', auth, hadAdminPermission, update)

// 获取某个基础设施接口
router.get('/:id', auth, findOne)

// 逻辑删除某个基础设施接口
router.post('/:id/off', auth, hadAdminPermission, remove)
// 逻辑恢复某个基础设施接口
router.post('/:id/on', auth, hadAdminPermission, restore)
// 批量删除基础设施接口
router.post('/batchremove', auth, hadAdminPermission, batchRemove)


module.exports = router