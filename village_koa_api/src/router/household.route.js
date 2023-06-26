const Router = require('koa-router')

const { auth, hadAdminPermission } = require('../middleware/auth.middleware')

const { validator } = require('../middleware/household.middleware')

const { add, update, findMore, findAll, remove, restore, batchRemove, findAllPoor, patchUpdate, findAllNotpoor } = require('../controller/household.controller')

const router = new Router({ prefix: '/household' })

// 新增每户信息接口
router.post('/add', auth, hadAdminPermission, validator, add)

// 修改每户信息接口
router.put('/:id', auth, hadAdminPermission, validator, update)

// 获取每户信息接口
router.get('/moreinfo', auth, findMore)

// 获取所有户口信息
router.get('/', auth, findAll)

// 逻辑删除户口信息接口
router.post('/:id/off', auth, hadAdminPermission, remove)
// 逻辑恢复户口信息接口
router.post('/:id/on', auth, hadAdminPermission, restore)
// 批量删除户口信息接口
router.post('/batchremove', auth, hadAdminPermission, batchRemove)

// 获取贫困家庭信息接口
router.get('/poor', auth, findAllPoor)
// 获取脱贫家庭信息接口
router.get('/notpoor', auth, findAllNotpoor)
// 补丁修改是否贫困接口
router.patch('/poor/:id', auth, patchUpdate)

module.exports = router
