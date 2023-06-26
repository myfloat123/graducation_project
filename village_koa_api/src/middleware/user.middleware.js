const bcrypt = require('bcryptjs')

const User = require('../model/user.model')
const Role = require('../model/role.model')
const Permission = require('../model/permission.model')
const { getUserInfo } = require('../service/user.service')
const { userFormatError, userAlreadyExited, userRegisterError, userDoesNoExit, invalidPassword, userLoginError, idsFormatError } = require('../constant/err.type')

const userValidator = async (ctx, next) => {
  const { user_name, password } = ctx.request.body
  // console.log(user_name, password)
  // 合法性
  if (!user_name || !password) {
    console.error('用户名或密码为空', ctx.request.body)
    ctx.app.emit('error', userFormatError, ctx)
    return
  }

  await next()
}

const verifyUser = async (ctx, next) => {
  const { user_name } = ctx.request.body
  // 合理性
  try {
    const res = await getUserInfo({ user_name })

    if (res) {
      console.error('用户已经存在', { user_name })
      ctx.app.emit('error', userAlreadyExited, ctx)
      return
    }
  } catch (err) {
    console.error('获取用户信息错误', err)
    ctx.app.emit('error', userRegisterError, ctx)
    return
  }

  await next()
}

const cryptPassword = async (ctx, next) => {
  const { password } = ctx.request.body
  console.log('未加密的密码', password)

  const salt = bcrypt.genSaltSync(10)
  // hash保存的是 密文
  const hash = bcrypt.hashSync(password, salt)
  console.log('已加密的密码', hash)

  ctx.request.body.password = hash

  await next()
}

const verifyLogin = async (ctx, next) => {
  const { user_name, password } = ctx.request.body

  try {
    const res = await getUserInfo({ user_name })

    if (!res) {
      console.error('用户不存在', { user_name })
      ctx.app.emit('error', userDoesNoExit, ctx)
      return
    }

    if (!bcrypt.compareSync(password, res.password)) {
      return ctx.app.emit('error', invalidPassword, ctx)
    }
  } catch (err) {
    console.error(err)
    ctx.app.emit('error', userLoginError, ctx)
  }

  await next()
}

const checkPermission = (permissionName) => {
  return async (ctx, next) => {
    // 获取用户id
    const userId = ctx.state.user.id

    // 查询用户拥有的所有角色
    const roles = await Role.findAll({
      include: [
        {
          model: User,
          where: { id: userId },
        },
      ],
    })

    // 查询用户拥有的所有权限
    const permissions = await Permission.findAll({
      include: [
        {
          model: Role,
          where: { id: roles.map((role) => role.id) },
        },
      ],
    })

    // 检查用户是否有指定的权限
    const hasPermission = permissions.some(
      (permission) => permission.name === permissionName
    )

    // 如果有权限，调用下一个中间件
    if (hasPermission) {
      await next()
    } else {
      // 如果没有权限，返回403错误
      ctx.status = 403
      ctx.body = { code: -1, message: '您没有该操作的权限' }
      return
    }
  }
}

const validator = (rules) => {
  return async (ctx, next) => {
    console.log(ctx.request.body)
    try {
      ctx.verifyParams(rules)
    } catch (err) {
      console.error(err)
      idsFormatError.result = err
      return ctx.app.emit('error', idsFormatError, ctx)
    }

    await next()
  }
}

module.exports = {
  userValidator,
  verifyUser,
  cryptPassword,
  verifyLogin,
  checkPermission,
  validator
}
