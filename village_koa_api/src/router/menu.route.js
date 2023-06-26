const Router = require('koa-router')

const { auth, hadAdminPermission } = require('../middleware/auth.middleware')

const { add, getAll } = require('../controller/menu.controller')

const router = new Router({ prefix: '/api/admin/system/menu' })

// 添加菜单
router.post('/add', auth, hadAdminPermission, add)

// 获取所有菜单
router.get('/list', auth, hadAdminPermission, getAll)

module.exports = router