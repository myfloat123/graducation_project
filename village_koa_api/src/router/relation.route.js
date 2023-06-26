const Router = require('koa-router')

const { auth, hadAdminPermission } = require('../middleware/auth.middleware')

const { validator } = require('../middleware/relation.middleware')

const { add, findAll, update, remove, restore, findMore, batchRemove } = require('../controller/relation.controller')
// const { batchRemove } = require('../controller/household.controller')

const router = new Router({ prefix: '/relation' })

// 新增户主关系信息接口
router.post('/add', auth, hadAdminPermission, validator, add)

// 获取户主关系信息接口
router.get('/', auth, findAll)
// 获取每户主关系信息接口
router.get('/moreinfo', auth, findMore)

// 修改户主关系信息接口
router.put('/:id', auth, hadAdminPermission, validator, update)

// 逻辑删除每个户主信息信息接口
router.post('/:id/off', auth, hadAdminPermission, remove)
// 逻辑恢复户主关系信息接口
router.post('/:id/on', auth, hadAdminPermission, restore)
// 批量删除户主关系信息接口
router.post('/batchremove', auth, hadAdminPermission, batchRemove)

module.exports = router
