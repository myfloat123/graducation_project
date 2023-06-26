const Router = require('koa-router')

const { auth, hadAdminPermission } = require('../middleware/auth.middleware')

const { validator } = require('../middleware/assistinfo.middleware')

const { add, findAll, findOne, update, remove, restore, batchRemove, findMore } = require('../controller/assistinfo.controller')

const router = new Router({ prefix: '/assistinfo' })

// 新增帮扶信息接口
router.post('/add', auth, hadAdminPermission, validator, add)

// 获取帮扶信息接口
router.get('/', auth, findAll)

// 获取任意帮扶信息接口
router.get('/moreinfo', auth, findMore)

// 获取某个帮扶信息接口
router.get('/:id', auth, findOne)



// 修改帮扶信息接口
router.put('/:id', auth, hadAdminPermission, validator, update)

// 逻辑删除帮扶信息接口
router.post('/:id/off', auth, hadAdminPermission, remove)
// 逻辑恢复帮扶信息接口
router.post('/:id/on', auth, hadAdminPermission, restore)
// 批量删除帮扶信息接口
router.post('/batchremove', auth, hadAdminPermission, batchRemove)

module.exports = router