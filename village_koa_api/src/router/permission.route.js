const Router = require('koa-router')

const { auth, hadAdminPermission } = require('../middleware/auth.middleware')

const { validator, verifyPermission } = require('../middleware/permission.middleware')

const { add, find, update, doAssign, getPermissions, deleteOnePermission } = require('../controller/permission.controller')

const router = new Router({ prefix: '/permission' })

// 新增权限信息接口
router.post('/add', auth, hadAdminPermission, validator, verifyPermission, add)

// 获取权限信息接口
router.get('/info', auth, hadAdminPermission, find)

// 修改权限信息接口
router.put('/update', auth, hadAdminPermission, validator, update)

// 给某个角色授权接口
router.post('/doAssign', auth, hadAdminPermission, doAssign)

// 获取某个角色的所有权限信息接口
router.get('/toAssign/:id', auth, hadAdminPermission, getPermissions)

// 删除某个权限信息接口
router.delete('/delete/:id', auth, hadAdminPermission, deleteOnePermission)

module.exports = router