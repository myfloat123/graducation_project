const Router = require('koa-router')

const { auth, hadAdminPermission } = require('../middleware/auth.middleware')

const { Controller, Get, Post, ApiInfo, JwtUnless, ApiNoAuthRequired } = require('../libs/koa-action-decorator/index')

const { syncApi } = require('../controller/api.controller')

const router = new Router({ prefix: '/api/admin/system/apis' })

// 同步系统api
router.post('/syncApi', auth, hadAdminPermission, JwtUnless, syncApi)

module.exports = router