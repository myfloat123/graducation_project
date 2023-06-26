const Router = require('koa-router')

const { userValidator, verifyUser, cryptPassword, verifyLogin, validator } = require('../middleware/user.middleware')
const { auth, hadAdminPermission } = require('../middleware/auth.middleware')

const { register, login, changePassword, getUserData, logout, updateAvatar, find, findUserById, update, remove, restore, batchRemove, doAssign, deleteUser, deleteOneUser, getRoles, getUserPermission } = require('../controller/user.controller')

const router = new Router({ prefix: '/users' })

// 注册接口
router.post('/register', userValidator, verifyUser, cryptPassword, register)

// 登录接口
router.post('/login', userValidator, verifyLogin, login)

// 修改密码接口
router.patch('/', auth, cryptPassword, changePassword)

// 获取用户信息接口
router.get('/', auth, getUserData)
// 获取所有用户信息接口
router.get('/info', auth, find)
// 根据id获取某个后台用户
router.get('/get/:id', auth, findUserById)

// 更新用户头像接口
router.post('/', auth, updateAvatar)

// 更新用户信息接口
router.put('/update', auth, update)

// 退出登录接口
router.post('/logout', auth, logout)

// 给某个用户分配角色
router.post('/doAssign', auth, hadAdminPermission, doAssign)

// 获取某个用户的所有角色
router.get('/toAssign/:id', auth, hadAdminPermission, getRoles)

// 获取某个用户的所有权限
router.get('/permission', auth, hadAdminPermission, getUserPermission)

// 物理批量删除用户信息
router.delete('/delete/batchRemove', auth, hadAdminPermission, validator({ ids: 'array' }), deleteUser)
// 物理删除某个用户信息
router.delete('/delete/:id', auth, hadAdminPermission, deleteOneUser)
// 逻辑删除用户信息
router.post('/remove/:id', auth, hadAdminPermission, remove)
// 逻辑恢复用户信息
router.post('/restore/:id', auth, hadAdminPermission, restore)
// 批量删除用户信息
router.post('/batchRemove', auth, hadAdminPermission, batchRemove)


module.exports = router
