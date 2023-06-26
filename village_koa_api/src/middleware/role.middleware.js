const { getRoleInfo } = require('../service/role.service')

const { roleFormatError, roleAlreadyExited, roleAddError, idsFormatError } = require('../constant/err.type')

const validator = async (ctx, next) => {
  try {
    ctx.verifyParams({
      role_name: { type: 'string', required: true },
      role_remark: { type: 'string', required: false }
    })
  } catch (err) {
    console.error(err)
    roleFormatError.result = err
    return ctx.app.emit('error', roleFormatError, ctx)
  }

  await next()
}

const validatorIds = (rules) => {
  return async (ctx, next) => {
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

const verifyRole = async (ctx, next) => {
  const { role_name } = ctx.request.body
  try {
    const res = await getRoleInfo({ role_name })
    console.log(res)

    if (res.list.length > 1) {
      console.error('角色已经存在', { role_name })
      ctx.app.emit('error', roleAlreadyExited, ctx)
      return
    }
  } catch (err) {
    console.error('获取角色信息错误', err)
    ctx.app.emit('error', roleAddError, ctx)
    return
  }

  await next()
}

module.exports = {
  validator,
  verifyRole,
  validatorIds
}