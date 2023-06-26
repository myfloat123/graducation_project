const Router = require('koa-router')

const { auth, hadAdminPermission } = require('../middleware/auth.middleware')

const { validator, verifyRole, validatorIds } = require('../middleware/role.middleware')

const { add, find, findRoleById, update, remove, restore, batchRemove, deleteRole, deleteOneRole, getRolePermission } = require('../controller/role.controller')

const router = new Router({ prefix: '/role' })

// 新增角色信息接口
router.post('/add', auth, hadAdminPermission, validator, verifyRole, add)

// 获取角色信息接口
router.get('/info', auth, hadAdminPermission, find)

// 通过id获取某个角色信息接口
router.get('/get/:id', auth, hadAdminPermission, findRoleById)

// 通过id获取某个角色所有权限信息接口
router.get('/toAssign/:id', auth, hadAdminPermission, getRolePermission)

// 修改角色信息接口
router.put('/update', auth, hadAdminPermission, validator, update)

// 逻辑删除角色信息接口
router.post('/remove/:id', auth, hadAdminPermission, remove)
// 逻辑删除角色信息接口
router.post('/restore/:id', auth, hadAdminPermission, restore)
// 逻辑批量删除角色信息接口
router.post('/batchRemove', auth, hadAdminPermission, batchRemove)
// 物理批量删除角色信息接口
router.delete('/delete/batchRemove', auth, hadAdminPermission, validatorIds({ ids: 'array' }), deleteRole)
// 物理删除角色信息接口
router.delete('/delete/:id', auth, hadAdminPermission, deleteOneRole)

module.exports = router