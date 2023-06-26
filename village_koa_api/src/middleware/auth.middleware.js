const jwt = require('jsonwebtoken')
const Cookies = require('js-cookie')
// const Cookies = require('js-cookie')

const { JWT_SECRET } = require('../config/config.default')

const { tokenExpiredError, invalidToken, hasNotAdminPermission } = require('../constant/err.type')

const auth = async (ctx, next) => {
  // console.log(ctx)
  // console.log(ctx.request.headers)
  // console.log(ctx.request.headers === ctx.request.header) // true
  // console.log(ctx.request.header.token)
  const { authorization = '' } = ctx.request.header
  const { cookie = '' } = ctx.request.header
  // const { token = '' } = ctx.request.header
  // console.log(authorization)
  // console.log(cookie)
  const handlerCookie = (cookie) => {
    let arr = []
    arr = cookie.split('=')
    console.log(arr[arr.length - 1])
    return arr[arr.length - 1]
  }

  // let token = authorization !== '' ? authorization.replace('Bearer ', '') : cookie.replace('vue_admin_template_token=', '')
  let token = authorization !== '' ? authorization.replace('Bearer ', '') : handlerCookie(cookie)
  // let token = authorization.replace('Bearer ', '')
  if (token.indexOf('sidebarStatus=0; ') !== -1) {
    token = token.replace('sidebarStatus=0; ', '')
  }
  if (token.indexOf('; sidebarStatus=0' !== -1)) {
    token = token.replace('; sidebarStatus=0', '')
  }
  if (token.indexOf('sidebarStatus=1; ' !== -1)) {
    token = token.replace('sidebarStatus=1; ', '')
  }
  if (token.indexOf('; sidebarStatus=1' !== -1)) {
    token = token.replace('; sidebarStatus=1', '')
  }
  // console.log(token)

  try {
    const user = jwt.verify(token, JWT_SECRET)
    ctx.state.user = user
    // console.log(user)
  } catch (err) {
    switch (err.name) {
      case 'TokenExpiredError':
        console.error('token已过期', err)
        return ctx.app.emit('error', tokenExpiredError, ctx)
      case 'JsonWebTokenError':
        console.error('无效的token', err)
        return ctx.app.emit('error', invalidToken, ctx)
    }
  }

  await next()
}

const hadAdminPermission = async (ctx, next) => {
  const { state } = ctx.state.user

  if (state !== 0) {
    console.error('该用户没有管理员权限', ctx.state.user)
    return ctx.app.emit('error', hasNotAdminPermission, ctx)
  }

  await next()
}

module.exports = {
  auth,
  hadAdminPermission
}
