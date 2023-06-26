const Router = require('koa-router')

const { auth, hadAdminPermission } = require('../middleware/auth.middleware')

const { validator } = require('../middleware/assistplan.middleware')

const { add, findAll, findOne, update, remove, restore, batchRemove, removeByAssistCode, restoreByAssistCode, batchRemoveByAssistCode } = require('../controller/assistplan.controller')

const router = new Router({ prefix: '/assistplan' })

// 新增帮扶计划接口
router.post('/add', auth, hadAdminPermission, validator, add)

// 获取帮扶计划接口
router.get('/', auth, findAll)

// 获取某个帮扶计划接口
router.get('/:id', auth, findOne)
router.get('/get/:assist_code', auth, findOne)

// 通过帮扶编号获取某个帮扶计划
router.get('/get/:assist_code', auth, findOne)

// 修改帮扶计划接口
router.put('/:id', auth, hadAdminPermission, validator, update)

// 逻辑删除帮扶计划接口
router.post('/:id/off', auth, hadAdminPermission, remove)
// 逻辑恢复帮扶计划接口
router.post('/:id/on', auth, hadAdminPermission, restore)
// 批量删除帮扶计划接口
router.post('/batchremove', auth, hadAdminPermission, batchRemove)
// 逻辑删除帮扶计划接口（帮扶编号）
router.post('/remove/:assist_code/off', auth, hadAdminPermission, removeByAssistCode)
// 逻辑恢复帮扶计划接口（帮扶编号）
router.post('/restore/:assist_code/on', auth, hadAdminPermission, restoreByAssistCode)
// 批量删除帮扶计划接口
router.post('/batchremoves/assist_code/off', auth, hadAdminPermission, batchRemoveByAssistCode)

module.exports = router